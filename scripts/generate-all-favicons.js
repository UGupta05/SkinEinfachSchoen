import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let j = 0; j < 8; j++) {
      c = (c >>> 1) ^ (c & 1 ? 0xedb88320 : 0);
    }
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, dataBuf) {
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(dataBuf.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcInput = Buffer.concat([typeBuf, dataBuf]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(crcInput), 0);
  return Buffer.concat([lenBuf, typeBuf, dataBuf, crcBuf]);
}

function createPng(width, height, rgbaBuffer) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  
  const ihdrChunk = makeChunk('IHDR', ihdr);
  const stride = width * 4;
  const rawRows = Buffer.alloc(height * (stride + 1));
  for (let y = 0; y < height; y++) {
    rawRows[y * (stride + 1)] = 0;
    rgbaBuffer.copy(rawRows, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  
  const idatChunk = makeChunk('IDAT', zlib.deflateSync(rawRows));
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));
  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

function createIcoFromPng(pngBuffer, size = 32) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  
  const dir = Buffer.alloc(16);
  dir[0] = size >= 256 ? 0 : size;
  dir[1] = size >= 256 ? 0 : size;
  dir[2] = 0;
  dir[3] = 0;
  dir.writeUInt16LE(1, 4);
  dir.writeUInt16LE(32, 6);
  dir.writeUInt32LE(pngBuffer.length, 8);
  dir.writeUInt32LE(22, 12);
  
  return Buffer.concat([header, dir, pngBuffer]);
}

// Read logo.png
const logoPath = path.join(rootDir, 'public', 'images', 'home', 'logo.png');
const buf = fs.readFileSync(logoPath);

let pos = 8;
const idats = [];
let srcW = 0, srcH = 0;
while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IHDR') {
    srcW = buf.readUInt32BE(pos + 8);
    srcH = buf.readUInt32BE(pos + 12);
  } else if (type === 'IDAT') {
    idats.push(buf.slice(pos + 8, pos + 8 + len));
  }
  pos += 12 + len;
}

const srcDecompressed = zlib.inflateSync(Buffer.concat(idats));
const srcStride = 1 + srcW * 4;

function getSrcPixel(x, y) {
  if (x < 0 || x >= srcW || y < 0 || y >= srcH) return [0, 0, 0, 0];
  const idx = y * srcStride + 1 + x * 4;
  return [
    srcDecompressed[idx],
    srcDecompressed[idx + 1],
    srcDecompressed[idx + 2],
    srcDecompressed[idx + 3]
  ];
}

let minX = srcW, maxX = 0, minY = srcH, maxY = 0;
for (let y = 0; y < srcH; y++) {
  for (let x = 0; x < srcW; x++) {
    if (getSrcPixel(x, y)[3] > 10) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const cropW = maxX - minX + 1;
const cropH = maxY - minY + 1;

function sampleCroppedLogo(u, v) {
  const srcX = minX + u * (cropW - 1);
  const srcY = minY + v * (cropH - 1);
  const x0 = Math.floor(srcX), x1 = Math.min(x0 + 1, maxX);
  const y0 = Math.floor(srcY), y1 = Math.min(y0 + 1, maxY);
  const dx = srcX - x0, dy = srcY - y0;
  
  const p00 = getSrcPixel(x0, y0);
  const p10 = getSrcPixel(x1, y0);
  const p01 = getSrcPixel(x0, y1);
  const p11 = getSrcPixel(x1, y1);
  
  const res = [0, 0, 0, 0];
  for (let i = 0; i < 4; i++) {
    const top = p00[i] * (1 - dx) + p10[i] * dx;
    const bot = p01[i] * (1 - dx) + p11[i] * dx;
    res[i] = Math.round(top * (1 - dy) + bot * dy);
  }
  return res;
}

function generateSquareFavicon(canvasSize, paddingRatio = 0.12) {
  const rgba = Buffer.alloc(canvasSize * canvasSize * 4);
  const padding = Math.round(canvasSize * paddingRatio);
  const maxW = canvasSize - 2 * padding;
  const scale = maxW / cropW;
  const targetW = maxW;
  const targetH = Math.round(cropH * scale);
  const targetX = Math.round((canvasSize - targetW) / 2);
  const targetY = Math.round((canvasSize - targetH) / 2);

  const bgR = 65, bgG = 99, bgB = 115; // #416373 Primary Slate-Teal
  const borderRadius = Math.round(canvasSize * 0.2); // Rounded square badge
  const logoR = 255, logoG = 255, logoB = 255;

  for (let y = 0; y < canvasSize; y++) {
    for (let x = 0; x < canvasSize; x++) {
      const idx = (y * canvasSize + x) * 4;
      
      let inside = true;
      let dist = 0;
      const rx = Math.max(borderRadius - x, 0, x - (canvasSize - 1 - borderRadius));
      const ry = Math.max(borderRadius - y, 0, y - (canvasSize - 1 - borderRadius));
      if (rx > 0 && ry > 0) {
        dist = Math.sqrt(rx * rx + ry * ry);
        if (dist > borderRadius) inside = false;
      }
      
      if (!inside) {
        rgba[idx] = 0; rgba[idx + 1] = 0; rgba[idx + 2] = 0; rgba[idx + 3] = 0;
        continue;
      }
      
      let edgeAlpha = 1;
      if (dist > borderRadius - 1.5) {
        edgeAlpha = Math.max(0, Math.min(1, (borderRadius - dist) / 1.5 + 0.5));
      }
      
      let r = bgR, g = bgG, b = bgB, a = Math.round(255 * edgeAlpha);
      
      if (x >= targetX && x < targetX + targetW && y >= targetY && y < targetY + targetH) {
        const u = (x - targetX) / targetW;
        const v = (y - targetY) / targetH;
        const logoPixel = sampleCroppedLogo(u, v);
        const logoAlpha = logoPixel[3] / 255;
        
        r = Math.round(r * (1 - logoAlpha) + logoR * logoAlpha);
        g = Math.round(g * (1 - logoAlpha) + logoG * logoAlpha);
        b = Math.round(b * (1 - logoAlpha) + logoB * logoAlpha);
      }
      
      rgba[idx] = r; rgba[idx + 1] = g; rgba[idx + 2] = b; rgba[idx + 3] = a;
    }
  }
  return createPng(canvasSize, canvasSize, rgba);
}

// Generate 512x512 and 32x32 PNGs
const png512 = generateSquareFavicon(512, 0.12);
const png32 = generateSquareFavicon(32, 0.10);
const ico32 = createIcoFromPng(png32, 32);

// Write files to public and src/app
fs.writeFileSync(path.join(rootDir, 'public', 'favicon.png'), png512);
fs.writeFileSync(path.join(rootDir, 'public', 'favicon.ico'), ico32);
fs.writeFileSync(path.join(rootDir, 'src', 'app', 'favicon.ico'), ico32);
fs.writeFileSync(path.join(rootDir, 'src', 'app', 'icon.png'), png512);
fs.writeFileSync(path.join(rootDir, 'src', 'app', 'apple-icon.png'), png512);

// Write vector SVG containing base64 PNG
const b64 = png512.toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,${b64}" x="0" y="0" width="512" height="512"/>
</svg>`;

fs.writeFileSync(path.join(rootDir, 'public', 'favicon.svg'), svg, 'utf-8');
fs.writeFileSync(path.join(rootDir, 'src', 'app', 'icon.svg'), svg, 'utf-8');

console.log('All favicon files (PNG, ICO, SVG, Apple Touch Icon) generated successfully!');
