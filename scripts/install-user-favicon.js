import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const userImgPath = 'C:\\Users\\utkar\\.gemini\\antigravity-ide\\brain\\f5ebf39e-d373-4246-a081-b5ec9109a424\\media__1784993454832.png';

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

// Read original 72x72 user image
const userBuf = fs.readFileSync(userImgPath);
let pos = 8;
const idats = [];
let srcW = 0, srcH = 0;
while (pos < userBuf.length) {
  const len = userBuf.readUInt32BE(pos);
  const type = userBuf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IHDR') {
    srcW = userBuf.readUInt32BE(pos + 8);
    srcH = userBuf.readUInt32BE(pos + 12);
  } else if (type === 'IDAT') {
    idats.push(userBuf.slice(pos + 8, pos + 8 + len));
  }
  pos += 12 + len;
}

const srcDecompressed = zlib.inflateSync(Buffer.concat(idats));
const srcStride = 1 + srcW * 4;

function sampleSrcPixel(u, v) {
  const srcX = u * (srcW - 1);
  const srcY = v * (srcH - 1);
  const x0 = Math.floor(srcX), x1 = Math.min(x0 + 1, srcW - 1);
  const y0 = Math.floor(srcY), y1 = Math.min(y0 + 1, srcH - 1);
  const dx = srcX - x0, dy = srcY - y0;
  
  const getP = (x, y) => {
    const idx = y * srcStride + 1 + x * 4;
    return [
      srcDecompressed[idx],
      srcDecompressed[idx + 1],
      srcDecompressed[idx + 2],
      srcDecompressed[idx + 3]
    ];
  };
  
  const p00 = getP(x0, y0), p10 = getP(x1, y0);
  const p01 = getP(x0, y1), p11 = getP(x1, y1);
  
  const res = [0, 0, 0, 0];
  for (let i = 0; i < 4; i++) {
    const top = p00[i] * (1 - dx) + p10[i] * dx;
    const bot = p01[i] * (1 - dx) + p11[i] * dx;
    res[i] = Math.round(top * (1 - dy) + bot * dy);
  }
  return res;
}

function resizeImage(outSize) {
  const rgba = Buffer.alloc(outSize * outSize * 4);
  for (let y = 0; y < outSize; y++) {
    for (let x = 0; x < outSize; x++) {
      const u = x / (outSize - 1);
      const v = y / (outSize - 1);
      const p = sampleSrcPixel(u, v);
      const idx = (y * outSize + x) * 4;
      rgba[idx] = p[0];
      rgba[idx + 1] = p[1];
      rgba[idx + 2] = p[2];
      rgba[idx + 3] = p[3];
    }
  }
  return createPng(outSize, outSize, rgba);
}

const png512 = resizeImage(512);
const png32 = resizeImage(32);
const ico32 = createIcoFromPng(png32, 32);

// Save PNGs and ICOs
fs.writeFileSync(path.join(rootDir, 'public', 'favicon.png'), png512);
fs.writeFileSync(path.join(rootDir, 'public', 'favicon.ico'), ico32);
fs.writeFileSync(path.join(rootDir, 'src', 'app', 'favicon.ico'), ico32);
fs.writeFileSync(path.join(rootDir, 'src', 'app', 'icon.png'), png512);
fs.writeFileSync(path.join(rootDir, 'src', 'app', 'apple-icon.png'), png512);

// Save SVG wrapping PNG
const b64 = png512.toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,${b64}" x="0" y="0" width="512" height="512"/>
</svg>`;

fs.writeFileSync(path.join(rootDir, 'public', 'favicon.svg'), svg, 'utf-8');
fs.writeFileSync(path.join(rootDir, 'src', 'app', 'icon.svg'), svg, 'utf-8');

console.log('Installed user icon to all favicon locations successfully!');
