$ErrorActionPreference = 'Stop'
$taskRoot = Split-Path -Parent $PSScriptRoot
$taskSpecs = Get-Content -LiteralPath (Join-Path $taskRoot 'tmp/resumes/resume-data.json') -Raw -Encoding utf8 | ConvertFrom-Json
Add-Type @'
using System.Runtime.InteropServices;
public static class ResumeFonts {
    [DllImport("gdi32.dll", CharSet = CharSet.Unicode)]
    public static extern int AddFontResourceEx(string file, uint flags, System.IntPtr reserved);
    [DllImport("gdi32.dll", CharSet = CharSet.Unicode)]
    public static extern bool RemoveFontResourceEx(string file, uint flags, System.IntPtr reserved);
}
'@
$taskFonts = Get-ChildItem -LiteralPath (Join-Path $PSScriptRoot 'resume-fonts') -Filter '*.ttf'
$taskRegistered = @()
$word = $null
$document = $null
try {
    foreach ($font in $taskFonts) {
        if ([ResumeFonts]::AddFontResourceEx($font.FullName, 0, [IntPtr]::Zero) -eq 0) { throw ('Cannot load font: ' + $font.Name) }
        $taskRegistered += $font.FullName
    }
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $word.DisplayAlerts = 0
    foreach ($spec in $taskSpecs) {
        $taskInput = Join-Path $taskRoot ('public/resumes/' + $spec.filename + '.docx')
        $taskPdf = Join-Path $taskRoot ('public/resumes/' + $spec.filename + '.pdf')
        $document = $word.Documents.Open($taskInput, $false, $false)
        $document.EmbedTrueTypeFonts = $true
        $document.SaveSubsetFonts = $false
        $document.DoNotEmbedSystemFonts = $true
        if ($spec.lang -eq 'fa') {
            # Persian paragraphs share one alignment. Latin text keeps its own LTR runs.
            foreach ($paragraph in $document.Paragraphs) {
                $paragraph.Format.ReadingOrder = 0
                $paragraph.Format.Alignment = 2
            }
        }
        $document.Repaginate()
        $document.Save()
        $taskPages = $document.ComputeStatistics(2)
        # Preserve the paragraph and run direction authored in the DOCX.
        $document.ExportAsFixedFormat($taskPdf, 17)
        $document.Close(0)
        [void][Runtime.InteropServices.Marshal]::FinalReleaseComObject($document)
        $document = $null
        Write-Output ($spec.filename + ': ' + $taskPages + ' pages')
    }
} finally {
    if ($null -ne $document) { $document.Close(0); [void][Runtime.InteropServices.Marshal]::FinalReleaseComObject($document) }
    if ($null -ne $word) { $word.Quit(); [void][Runtime.InteropServices.Marshal]::FinalReleaseComObject($word) }
    foreach ($font in $taskRegistered) { [void][ResumeFonts]::RemoveFontResourceEx($font, 0, [IntPtr]::Zero) }
}
