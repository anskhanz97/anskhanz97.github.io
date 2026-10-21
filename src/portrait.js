const portrait = document.querySelector('.portrait-composition');
const stage = portrait.querySelector('.portrait-stage');
const frame = portrait.querySelector('.portrait-frame');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const pointer = matchMedia('(hover: hover) and (pointer: fine)');
const detail = portrait.querySelector('.portrait-detail');
const practices = {
  web: 'Laravel APIs, business workflows and web interfaces.',
  desktop: 'Collaboration with C# teams on till/cloud sync, accounting and recovery.',
  mobile: 'Backend integration with Flutter teams: driver APIs, offline flows and FCM/APNs.',
};

portrait.querySelector('.portrait-practice').hidden = false;
portrait.querySelectorAll('[data-practice]').forEach(button => {
  button.addEventListener('click', () => {
    portrait.querySelectorAll('[data-practice]').forEach(item => {
      item.setAttribute('aria-pressed', String(item === button));
    });
    portrait.dataset.practice = button.dataset.practice;
    detail.textContent = practices[button.dataset.practice];
  });
});

let update;
const reset = () => {
  cancelAnimationFrame(update);
  frame.style.removeProperty('--portrait-rx');
  frame.style.removeProperty('--portrait-ry');
  frame.style.removeProperty('--light-x');
  frame.style.removeProperty('--light-y');
  portrait.classList.remove('is-tracking');
};
stage.addEventListener('pointermove', event => {
  if (motion.matches || !pointer.matches || event.pointerType === 'touch') return;
  const bounds = stage.getBoundingClientRect();
  const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
  const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
  cancelAnimationFrame(update);
  update = requestAnimationFrame(() => {
    frame.style.setProperty('--portrait-rx', `${(0.5 - y) * 8}deg`);
    frame.style.setProperty('--portrait-ry', `${(x - 0.5) * 10}deg`);
    frame.style.setProperty('--light-x', `${x * 100}%`);
    frame.style.setProperty('--light-y', `${y * 100}%`);
    portrait.classList.add('is-tracking');
  });
});
stage.addEventListener('pointerleave', reset);
stage.addEventListener('pointercancel', reset);
motion.addEventListener('change', reset);
pointer.addEventListener('change', reset);
window.addEventListener('blur', reset);
