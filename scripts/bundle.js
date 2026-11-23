const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const projectDir = path.resolve(rootDir, '..');

const indexPath = path.join(projectDir, 'index.html');
const cssPath = path.join(projectDir, 'src', 'styles', 'main.css');
const jsPath = path.join(projectDir, 'src', 'scripts', 'app.js');
const exp2Path = path.join(projectDir, 'lab', 'exp02-scroll-cinematic.html');
const publicPath = path.join(projectDir, 'public', 'index.html');

let html = fs.readFileSync(indexPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

// Replace link tag with inlined style
html = html.replace(
  /<link rel="stylesheet" href="src\/styles\/main\.css">/g,
  '<style>\n' + css + '\n</style>'
);

// Replace script tag with inlined script
html = html.replace(
  /<script src="src\/scripts\/app\.js"><\/script>/g,
  '<script>\n' + js + '\n</script>'
);

// Write to all 3 destinations:
// 1. Root index.html
fs.writeFileSync(indexPath, html, 'utf8');
console.log('Updated index.html (self-contained)');

// 2. lab/exp02-scroll-cinematic.html
fs.writeFileSync(exp2Path, html, 'utf8');
console.log('Updated lab/exp02-scroll-cinematic.html (synced with cinematic-ui)');

// 3. public/index.html
fs.writeFileSync(publicPath, html, 'utf8');
console.log('Updated public/index.html (mirror)');

console.log('All endpoints bundled successfully!');
