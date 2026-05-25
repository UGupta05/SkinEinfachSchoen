import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Montserrat:wght@600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap';

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const PUBLIC_FONTS_DIR = path.resolve('public/fonts');
const OUTPUT_CSS_PATH = path.resolve('src/fonts.css');

// Ensure directories exist
if (!fs.existsSync(PUBLIC_FONTS_DIR)) {
  fs.mkdirSync(PUBLIC_FONTS_DIR, { recursive: true });
}

function fetchUrl(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        fetchUrl(res.headers.location, headers).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch ${url}: Status Code ${res.statusCode}`));
        return;
      }
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', reject);
  });
}

function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        downloadFile(res.headers.location, outputPath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: Status Code ${res.statusCode}`));
        return;
      }
      const fileStream = fs.createWriteStream(outputPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function start() {
  try {
    console.log('Fetching Google Fonts CSS...');
    const css = await fetchUrl(FONTS_URL, { 'User-Agent': USER_AGENT });
    console.log('Fetched CSS. Parsing font urls...');

    // Regex to find all url(...) in the CSS
    const urlRegex = /url\((https:\/\/[^)]+)\)/g;
    let match;
    const urls = new Set();
    while ((match = urlRegex.exec(css)) !== null) {
      urls.add(match[1]);
    }

    console.log(`Found ${urls.size} unique font files to download.`);

    const urlMap = new Map();
    let count = 0;

    for (const url of urls) {
      count++;
      // Create a unique filename based on the remote URL
      const parsedUrl = new URL(url);
      const pathname = parsedUrl.pathname;
      const basename = path.basename(pathname);
      const ext = path.extname(basename) || '.woff2';
      
      // We prefix with a hash/counter to prevent any collisions
      const localFilename = `${count}_${basename}`;
      const localPath = path.join(PUBLIC_FONTS_DIR, localFilename);

      console.log(`[${count}/${urls.size}] Downloading ${url} -> ${localFilename}...`);
      await downloadFile(url, localPath);
      
      // Serve locally from /fonts/
      urlMap.set(url, `/fonts/${localFilename}`);
    }

    console.log('All fonts downloaded. Generating local src/fonts.css...');

    // Replace the remote URLs in the CSS with local paths
    let localCss = css;
    for (const [remoteUrl, localPath] of urlMap.entries()) {
      localCss = localCss.split(remoteUrl).join(localPath);
    }

    fs.writeFileSync(OUTPUT_CSS_PATH, localCss, 'utf8');
    console.log(`✅ Success! Local CSS written to ${OUTPUT_CSS_PATH}`);

  } catch (error) {
    console.error('Error during font downloading:', error);
    process.exit(1);
  }
}

start();
