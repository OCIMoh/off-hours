const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const projectDir = path.resolve(rootDir, '..');

const indexPath = path.join(projectDir, 'index.html');
const cssPath = path.join(projectDir, 'src', 'styles', 'main.css');
const jsPath = path.join(projectDir, 'src', 'scripts', 'app.js');

let html = fs.readFileSync(indexPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

// Replace style tag if exists, otherwise replace link tag
if (html.includes('<style>')) {
  html = html.replace(/<style>[\s\S]*?<\/style>/, '<style>\n' + css + '\n</style>');
} else {
  html = html.replace(/<link rel="stylesheet" href="src\/styles\/main\.css">/g, '<style>\n' + css + '\n</style>');
}

// Replace bottom script tag if exists, otherwise replace script src tag
if (html.includes('<script src="src/scripts/app.js"></script>')) {
  html = html.replace(/<script src="src\/scripts\/app\.js"><\/script>/g, '<script>\n' + js + '\n</script>');
} else {
  const lastScriptIdx = html.lastIndexOf('<script>');
  const lastScriptEndIdx = html.lastIndexOf('</script>');
  if (lastScriptIdx !== -1 && lastScriptEndIdx !== -1 && lastScriptIdx < lastScriptEndIdx) {
    html = html.substring(0, lastScriptIdx) + '<script>\n' + js + '\n</script>' + html.substring(lastScriptEndIdx + 9);
  }
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully bundled index.html!');
