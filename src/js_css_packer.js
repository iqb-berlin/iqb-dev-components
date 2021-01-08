/*
This script packs Javascript and CSS files found in the target directory
into one single file.

Usage:
node js_css_packer.js <directory containing files>

Author:
- Martin Mechtel (mechtel@iqb.hu-berlin.de)
- Richard Henck (richard.henck@iqb.hu-berlin.de)
*/
const fs = require('fs');

const sourceFolder = process.argv[2];
const projectName = process.argv[3];

const targetFileNameJs = `src/app/${projectName}/${projectName}.js`;
const targetFileNameCss = `src/app/${projectName}/${projectName}.css`;

let fileContentJs = '';
let fileContentCss = '';

fs.readdirSync(`${sourceFolder}/${projectName}`).forEach(file => {
  const i = file.lastIndexOf('.');
  if (i > 0) {
    const fileExtension = file.substr(i + 1);
    if (fileExtension.toLowerCase() === 'css') {
      const fileContent = fs.readFileSync(`${sourceFolder}/${projectName}/${file}`, 'utf8').toString();
      console.log(`reading ${file}`);
      fileContentCss += fileContent;
    } else if (fileExtension.toLowerCase() === 'js') {
      const fileContent = fs.readFileSync(`${sourceFolder}/${projectName}/${file}`, 'utf8').toString();
      console.log(`reading ${file}`);
      fileContentJs += fileContent;
    }
  }
});

if (fileContentCss) {
  fs.writeFileSync(targetFileNameCss, fileContentCss, 'utf8');
  console.log(`writing ${targetFileNameCss}`);
}
if (fileContentJs) {
  fs.writeFileSync(targetFileNameJs, fileContentJs, 'utf8');
  console.log(`writing ${targetFileNameJs}`);
}
console.log('finished');
