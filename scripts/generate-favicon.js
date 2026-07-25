import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pngPath = path.join(__dirname, '..', 'public', 'favicon.png');
const svgPath = path.join(__dirname, '..', 'public', 'favicon.svg');

const b64 = fs.readFileSync(pngPath).toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,${b64}" x="0" y="0" width="512" height="512"/>
</svg>`;

fs.writeFileSync(svgPath, svg, 'utf-8');
console.log('Successfully updated public/favicon.svg');
