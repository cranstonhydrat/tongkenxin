(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 24), { passive: true });
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if (a.dataset.page === current || (current === '' && a.dataset.page === 'index.html')) a.classList.add('active');
  });
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
  }), { threshold: .1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const canvas = document.querySelector('#network-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d'); let points = []; let raf;
    const resize = () => { canvas.width = canvas.offsetWidth * devicePixelRatio; canvas.height = canvas.offsetHeight * devicePixelRatio; ctx.scale(devicePixelRatio, devicePixelRatio); points = Array.from({length: 34}, () => ({ x: Math.random()*canvas.offsetWidth, y: Math.random()*canvas.offsetHeight, vx:(Math.random()-.5)*.24, vy:(Math.random()-.5)*.24 })); };
    const draw = () => { const w=canvas.offsetWidth,h=canvas.offsetHeight; ctx.clearRect(0,0,w,h); points.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;});
      points.forEach((a,i)=>points.slice(i+1).forEach(b=>{const d=Math.hypot(a.x-b.x,a.y-b.y);if(d<150){ctx.strokeStyle=`rgba(143,255,208,${.14*(1-d/150)})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}));
      points.forEach(p=>{ctx.fillStyle='rgba(143,255,208,.75)';ctx.beginPath();ctx.arc(p.x,p.y,1.5,0,Math.PI*2);ctx.fill();}); raf=requestAnimationFrame(draw); };
    resize(); draw(); window.addEventListener('resize', resize); window.addEventListener('pagehide',()=>cancelAnimationFrame(raf));
  }
  const consent = document.querySelector('.consent');
  if (consent && !localStorage.getItem('tkx-consent')) consent.classList.add('show');
  document.querySelectorAll('[data-consent]').forEach(btn => btn.addEventListener('click', () => { localStorage.setItem('tkx-consent', btn.dataset.consent); consent?.classList.remove('show'); }));
  const form = document.querySelector('#contact-form');
  if (form) form.addEventListener('submit', e => { e.preventDefault(); const status=form.querySelector('.form-status'); status.textContent='Message prepared. Please send your email client message to contact@tongkenxin.com.'; status.classList.add('visible'); form.reset(); });
})();
