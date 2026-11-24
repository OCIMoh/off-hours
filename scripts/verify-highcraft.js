const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
const content = fs.readFileSync(indexPath, 'utf8');

const checks = [
  { name: 'Inline SVG Favicon', pass: content.includes('data:image/svg+xml') },
  { name: 'Theme Color & Viewport Meta', pass: content.includes('theme-color') && content.includes('color-scheme') },
  { name: 'Social OpenGraph & Twitter Tags', pass: content.includes('og:title') && content.includes('twitter:card') },
  { name: 'Minimalized Atlas HUD (Left/Right Swiss Split)', pass: content.includes('01 / NOCTURNAL ATLAS') && content.includes('01 DEPOT') },
  { name: 'Living Radar Sonar Rings (SVG Elements)', pass: content.includes('radar-sonar sonar-ring-1') && content.includes('radar-sonar sonar-ring-2') },
  { name: 'Sonar Wave Keyframes CSS', pass: content.includes('@keyframes sonarWave') && content.includes('transform-box: fill-box') },
  { name: 'Punchy 3D Card Physics (15 deg tilt, 900 perspective)', pass: content.includes('const maxTilt = 15') && content.includes('transformPerspective: 900') },
  { name: 'Card Specular Lighting CSS & Pointer Tracking', pass: content.includes('--pointer-x') && content.includes('circle 320px at var(--pointer-x') },
  { name: 'Amplified 16% Chamber Parallax', pass: content.includes('xPercent: 16') && content.includes('xPercent: -16') },
  { name: 'Dynamic Scroll Velocity Skew (ScrollTrigger getVelocity)', pass: content.includes('self.getVelocity()') && content.includes('skewTargets') && content.includes('skewY') },
  { name: 'Interactive Digital Receipt Confirmation', pass: content.includes('checkoutSuccessState') && content.includes('OH-2026-') }
];

console.log('=== HIGH-CRAFT & PRODUCTION VERIFICATION ===');
let allPassed = true;
checks.forEach(c => {
  const status = c.pass ? '✓ PASS' : '✗ FAIL';
  if (!c.pass) allPassed = false;
  console.log(`${status.padEnd(8)} | ${c.name}`);
});

if (allPassed) {
  console.log('\n>>> ALL 11 HIGH-CRAFT & PRODUCTION CHECKS PASSED PERFECTLY! <<<');
  process.exit(0);
} else {
  console.error('\n>>> SOME CHECKS FAILED! <<<');
  process.exit(1);
}
