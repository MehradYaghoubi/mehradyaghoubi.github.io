import * as THREE from 'three';
import './style.css';

const translations = {
  fa: {
    skip: 'رفتن به محتوای اصلی', navResearch: 'پژوهش', navWork: 'پروژه‌ها', navAbout: 'درباره من', navContact: 'در تماس باشیم',
    kicker: 'پژوهشگر هوش مصنوعی · بازشناسی گفتار دیداری', heroTitle: 'گفتار را<br />قابل دیدن می‌کنم.',
    heroIntro: 'من مهراد یعقوبی هستم. در مرز بینایی ماشین و یادگیری ماشین کار می‌کنم و بررسی می‌کنم ماشین‌ها چطور از نشانه‌های دیداری، گفتار را درک می‌کنند.',
    exploreWork: 'دیدن پروژه‌ها', contactLink: 'ارتباط با من', heroMeta: 'ایران · آماده‌ی همکاری پژوهشی', visualCaption: 'ردّی دیداری از زبان گفتار', scroll: 'برای ادامه اسکرول کنید',
    researchKicker: 'پرسشی که دنبال می‌کنم', researchTitle: 'چهره چه چیزی درباره‌ی<br class="desktop-break" /> صدا به ما می‌گوید؟',
    researchBody: 'بازشناسی گفتار دیداری با بررسی حرکت صورت، به‌ویژه لب‌ها، واژه‌های گفته‌شده را تشخیص می‌دهد. پژوهش من بر روش‌های یادگیری عمیق برای لب‌خوانی تمرکز دارد؛ جایی که حرکت‌های ظریف، زمان‌بندی و بافت اهمیت دارند.',
    workKicker: 'ساخته‌شده با هدف', workTitle: 'پروژه‌های منتخب', workIntro: 'ابزارها و آزمایش‌هایی برای کاربردی‌ترکردن پژوهش گفتار دیداری.',
    extractorType: 'متن‌باز · پایتون', extractorDescription: 'ابزاری قابل تنظیم برای استخراج دقیق ناحیه‌ی لب از ویدئو با استفاده از MediaPipe Face Mesh.',
    researchType: 'پژوهش · یادگیری عمیق', researchProject: 'بازشناسی گفتار دیداری', researchProjectDescription: 'بررسی نشانه‌های زمانی و دیداری در لب‌خوانی با معماری‌های یادگیری عمیق.', allProjects: 'همه‌ی مخازن گیت‌هاب',
    aboutKicker: 'کمی درباره‌ی من', aboutTitle: 'کنجکاوی، همراه<br />با نگاه فنی.',
    aboutBody: 'من پژوهشگر و توسعه‌دهنده‌ی هوش مصنوعی هستم و به نقطه‌ی تلاقی ادراک و زبان علاقه دارم. کارم بینایی ماشین، یادگیری ماشین و ساخت ابزارهای کاربردی را کنار هم می‌گذارد تا پرسش‌های پژوهشی به راهکارهای قابل استفاده تبدیل شوند.',
    aboutNote: 'تمرکز فعلی: بازشناسی گفتار دیداری و لب‌خوانی.', skillVision: 'بینایی ماشین', skillMachineLearning: 'یادگیری ماشین', contactKicker: 'ایده یا پرسشی دارید؟', contactTitle: 'بیایید چیزی<br />معنادار بسازیم.', emailMe: 'ایمیل بزنید', footerText: 'پژوهش درباره‌ی دیدن گفتار توسط ماشین.'
  }
};

const languageButton = document.querySelector('#language-toggle');
const menuButton = document.querySelector('#menu-toggle');
const nav = document.querySelector('#main-nav');

languageButton.addEventListener('click', () => {
  const isPersian = document.documentElement.lang === 'fa';
  document.documentElement.lang = isPersian ? 'en' : 'fa';
  document.documentElement.dir = isPersian ? 'ltr' : 'rtl';
  document.title = isPersian ? 'Mehrad Yaghoubi — AI Researcher in Visual Speech Recognition' : 'مهراد یعقوبی — پژوهشگر هوش مصنوعی و بازشناسی گفتار دیداری';
  languageButton.textContent = isPersian ? 'فا' : 'EN';
  languageButton.setAttribute('aria-label', isPersian ? 'Switch to Persian' : 'تغییر زبان به انگلیسی');
  menuButton.setAttribute('aria-label', isPersian ? 'Open menu' : 'باز کردن منو');
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (!element.dataset.english) element.dataset.english = element.innerHTML;
    element.innerHTML = isPersian ? element.dataset.english : translations.fa[key] || element.dataset.english;
  });
  document.querySelectorAll('.research-tags span').forEach((element, index) => {
    if (!element.dataset.english) element.dataset.english = element.textContent;
    element.textContent = isPersian ? element.dataset.english : ['بازشناسی گفتار دیداری', 'لب‌خوانی', 'بینایی ماشین', 'یادگیری عمیق'][index];
  });
  document.querySelectorAll('.project-footer span').forEach((element) => {
    if (!element.dataset.english) element.dataset.english = element.textContent;
    const persian = { 'Computer vision': 'بینایی ماشین', 'Video processing': 'پردازش ویدئو', 'Lip-reading': 'لب‌خوانی' };
    element.textContent = isPersian ? element.dataset.english : persian[element.dataset.english] || element.dataset.english;
  });
});

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  const isPersian = document.documentElement.lang === 'fa';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isPersian ? (isOpen ? 'باز کردن منو' : 'بستن منو') : (isOpen ? 'Open menu' : 'Close menu'));
  nav.classList.toggle('is-open', !isOpen);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelector('#year').textContent = new Date().getFullYear();

const canvas = document.querySelector('#voice-canvas');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let renderer;

try {
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
} catch {
  canvas.parentElement.classList.add('webgl-unavailable');
}

if (renderer) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
  camera.position.set(0, 0, 7.6);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  scene.add(new THREE.AmbientLight(0x9da9ff, 1.65));
  const keyLight = new THREE.PointLight(0x8f81ff, 42, 12);
  keyLight.position.set(2.8, 2.2, 3.5);
  scene.add(keyLight);
  const rimLight = new THREE.PointLight(0x65e9d0, 25, 10);
  rimLight.position.set(-3, -1, -1.5);
  scene.add(rimLight);

  const sculpture = new THREE.Group();
  sculpture.rotation.set(0.32, -0.42, -0.18);
  scene.add(sculpture);

  const knotMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x9688ff, metalness: 0.28, roughness: 0.2, clearcoat: 0.94, clearcoatRoughness: 0.14,
    emissive: 0x261c70, emissiveIntensity: 0.42
  });
  const pulseUniforms = { uTime: { value: 0 } };
  knotMaterial.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = pulseUniforms.uTime;
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nuniform float uTime;');
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
      float waveA = sin(position.x * 4.1 + position.y * 3.2 + uTime * 0.8) * 0.055;
      float waveB = sin(position.z * 6.0 - uTime * 0.55) * 0.022;
      transformed += normal * (waveA + waveB);`);
  };
  const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.18, 0.26, 240, 32, 2, 5), knotMaterial);
  sculpture.add(knot);

  const innerMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x65e9d0, metalness: 0.48, roughness: 0.22, clearcoat: 1, emissive: 0x0f4749, emissiveIntensity: 0.38
  });
  const innerLoop = new THREE.Mesh(new THREE.TorusGeometry(1.04, 0.027, 12, 200), innerMaterial);
  innerLoop.rotation.set(1.3, 0.42, 0.22);
  innerLoop.scale.set(1.34, 0.8, 1);
  sculpture.add(innerLoop);

  const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xb9b4ff, transparent: true, opacity: 0.2 });
  const orbit = new THREE.Mesh(new THREE.TorusGeometry(2.12, 0.006, 6, 220), orbitMaterial);
  orbit.rotation.set(1.1, 0.4, 0.7);
  sculpture.add(orbit);
  const orbitTwo = orbit.clone();
  orbitTwo.scale.set(0.82, 1.13, 1);
  orbitTwo.rotation.set(0.12, 1.0, 0.8);
  orbitTwo.material = new THREE.MeshBasicMaterial({ color: 0x6de2cb, transparent: true, opacity: 0.22 });
  sculpture.add(orbitTwo);

  const signalGroup = new THREE.Group();
  sculpture.add(signalGroup);
  const signalColors = [0x83f0d4, 0xd1cbff, 0xf2c99b];
  for (let band = 0; band < signalColors.length; band += 1) {
    const points = [];
    for (let i = 0; i <= 180; i += 1) {
      const t = (i / 180) * Math.PI * 2;
      const radius = 1.5 + Math.sin(t * 4 + band * 1.25) * 0.12 + Math.cos(t * 7 - band) * 0.045;
      points.push(new THREE.Vector3(
        Math.cos(t + band * 0.28) * radius,
        Math.sin(t * 1.7 + band * 0.45) * 0.38,
        Math.sin(t + band * 0.28) * radius * 0.7
      ));
    }
    const curve = new THREE.CatmullRomCurve3(points, true, 'centripetal');
    const line = new THREE.Mesh(new THREE.TubeGeometry(curve, 420, band === 1 ? 0.012 : 0.008, 6, true),
      new THREE.MeshBasicMaterial({ color: signalColors[band], transparent: true, opacity: band === 1 ? 0.62 : 0.42 }));
    signalGroup.add(line);
  }

  const particleCount = window.innerWidth < 680 ? 420 : 940;
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);
  const palette = [new THREE.Color(0x8d82ff), new THREE.Color(0x65e9d0), new THREE.Color(0xdac7ad)];
  for (let i = 0; i < particleCount; i += 1) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 2.05 + Math.random() * 1.3;
    particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    const color = palette[i % palette.length];
    particleColors[i * 3] = color.r;
    particleColors[i * 3 + 1] = color.g;
    particleColors[i * 3 + 2] = color.b;
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
  const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ size: 0.018, vertexColors: true, transparent: true, opacity: 0.72, sizeAttenuation: true }));
  scene.add(particles);

  const pointer = new THREE.Vector2();
  const target = new THREE.Vector2();
  canvas.addEventListener('pointermove', (event) => {
    const bounds = canvas.getBoundingClientRect();
    target.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.34;
    target.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -0.24;
  });
  canvas.addEventListener('pointerleave', () => target.set(0, 0));

  const resize = () => {
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    renderer.setSize(bounds.width, bounds.height, false);
    camera.aspect = bounds.width / bounds.height;
    camera.position.z = bounds.width < 680 ? 8.6 : 7.6;
    camera.updateProjectionMatrix();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();

  const timer = new THREE.Timer();
  timer.connect(document);
  let frameId;
  const render = () => {
    if (!reduceMotion) frameId = requestAnimationFrame(render);
    timer.update();
    const elapsed = reduceMotion ? 0 : timer.getElapsed();
    pulseUniforms.uTime.value = elapsed;
    if (!reduceMotion) {
      sculpture.rotation.y += 0.0016;
      sculpture.rotation.z = -0.18 + Math.sin(elapsed * 0.22) * 0.04;
      signalGroup.rotation.y = elapsed * 0.045;
      particles.rotation.y = -elapsed * 0.018;
      particles.rotation.x = Math.sin(elapsed * 0.12) * 0.035;
      pointer.lerp(target, 0.035);
      camera.position.x += (pointer.x - camera.position.x) * 0.025;
      camera.position.y += (pointer.y - camera.position.y) * 0.025;
      camera.lookAt(0, 0, 0);
    }
    renderer.render(scene, camera);
  };
  render();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(frameId);
    else render();
  });
  window.addEventListener('pagehide', () => {
    cancelAnimationFrame(frameId);
    resizeObserver.disconnect();
    timer.dispose();
    renderer.dispose();
  }, { once: true });
}
