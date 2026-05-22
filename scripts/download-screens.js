import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

// The screens fetched from list_screens
const screens = [
  {
    name: "projects/17203910358013848429/screens/99dc62a2127f42568d7a0c63d5ca7c6f",
    title: "Apparative Kosmetik",
    htmlUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1MjU3NzhjNDRmM2UwNWYxMzJiZDRkMGYzNjQzEgoSBhCZj5TtBRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjAzOTEwMzU4MDEzODQ4NDI5&filename=&opi=89354086"
  },
  {
    name: "projects/17203910358013848429/screens/43964b5ebeca41c38d625fc1ceafba39",
    title: "Online-Shop",
    htmlUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1MjU3NzRiMWQyZWQwMjNiZDc0NWM1MjhkYzQ5EgoSBhCZj5TtBRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjAzOTEwMzU4MDEzODQ4NDI5&filename=&opi=89354086"
  },
  {
    name: "projects/17203910358013848429/screens/7861bdf35100459c8e038cf67bb8fb44",
    title: "Terminbuchung (Aktualisiert)",
    htmlUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1MjU3NzQ1NWExNDEwMjNiZTY4ZTdmMzM3MTkzEgoSBhCZj5TtBRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjAzOTEwMzU4MDEzODQ4NDI5&filename=&opi=89354086"
  },
  {
    name: "projects/17203910358013848429/screens/b5a5b67acdc544e0aaaad0fbbb8a2428",
    title: "Leistungen Übersicht",
    htmlUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzk4NTA0NGIwMjMyOTQ0MDRhZDY5N2FiZGRiZDBjNDg3EgoSBhCZj5TtBRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjAzOTEwMzU4MDEzODQ4NDI5&filename=&opi=89354086"
  },
  {
    name: "projects/17203910358013848429/screens/92199a465c564c639b7b2306baf02860",
    title: "Home Redesign",
    htmlUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1MjU3Nzg3YjM5NDcwNWYxM2JjY2VmMTViNTRjEgoSBhCZj5TtBRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjAzOTEwMzU4MDEzODQ4NDI5&filename=&opi=89354086"
  },
  {
    name: "projects/17203910358013848429/screens/a4c6d72c78b248a7871bc44a64fc3147",
    title: "Home",
    htmlUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1MjU3NzhjNDRmM2UwNWYxMzJiZDRkMGYzNjQzEgoSBhCZj5TtBRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjAzOTEwMzU4MDEzODQ4NDI5&filename=&opi=89354086"
  },
  {
    name: "projects/17203910358013848429/screens/0e3b9a9888204b109af9322026038ad9",
    title: "JetPeel",
    htmlUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzk3MDMwMDE2ZmE3YjQ4ZjdhMzg5YWMwZjU2ODYxZmNkEgoSBhCZj5TtBRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjAzOTEwMzU4MDEzODQ4NDI5&filename=&opi=89354086"
  },
  {
    name: "projects/17203910358013848429/screens/bfd550cbfbc74e4888e4c50f69904e12",
    title: "Terminbuchung",
    htmlUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1MjU3NzQ2ZTczZTAwNDRmNGE2NWZhMTU1YmY1EgoSBhCZj5TtBRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjAzOTEwMzU4MDEzODQ4NDI5&filename=&opi=89354086"
  },
  {
    name: "projects/17203910358013848429/screens/e1efd272659243ccb5cddcdbd3934608",
    title: "IPL Haarentfernung",
    htmlUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzExZDc5N2RhN2FhYzRhZmY4NjM5YTUzZDI2NDdlM2YwEgoSBhCZj5TtBRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjAzOTEwMzU4MDEzODQ4NDI5&filename=&opi=89354086"
  },
  {
    name: "projects/17203910358013848429/screens/cbeeac58f7e3460a92e109ae8754a18f",
    title: "Kontakt",
    htmlUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1MjU3NzcyYmEzZDQwNGE0NTdhOWNhMWE3NmE4EgoSBhCZj5TtBRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjAzOTEwMzU4MDEzODQ4NDI5&filename=&opi=89354086"
  },
  {
    name: "projects/17203910358013848429/screens/3697400cb86845448e83b25fb0863a9a",
    title: "Meso BB Glow",
    htmlUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2U5MTI0NDZjMzFkMTRkNDhhNTJiNTA0YzY5YjNjNWNlEgoSBhCZj5TtBRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjAzOTEwMzU4MDEzODQ4NDI5&filename=&opi=89354086"
  },
  {
    name: "projects/17203910358013848429/screens/1478453a67f54ddea98e06d5e4ae8b8c",
    title: "Medical Kosmetik ZO",
    htmlUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1MjU3NzhhYjg4NDUwODUzYzk1ZmFhMTlhY2RlEgoSBhCZj5TtBRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjAzOTEwMzU4MDEzODQ4NDI5&filename=&opi=89354086"
  },
  {
    name: "projects/17203910358013848429/screens/e2b4af538c754191be6e1987cda7b29c",
    title: "Brow Lift",
    htmlUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzM4MzFkNTViMTcxMDQxMWQ4NDY3NzljMjY2ZWIyNzhhEgoSBhCZj5TtBRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjAzOTEwMzU4MDEzODQ4NDI5&filename=&opi=89354086"
  },
  {
    name: "projects/17203910358013848429/screens/0cc232577ec044a8a18f7c4626f06374",
    title: "Microneedling",
    htmlUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzdjMjVkZjFjMTQ1ZTRhZjRiODYwNzBhYzVjYTI5ZWMwEgoSBhCZj5TtBRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjAzOTEwMzU4MDEzODQ4NDI5&filename=&opi=89354086"
  },
  {
    name: "projects/17203910358013848429/screens/c674077c12f147128f17a459e84d9beb",
    title: "Team",
    htmlUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1MjU3Nzg2MmExNzgwMjNiZWY3NjNmMjNjNzNjEgoSBhCZj5TtBRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjAzOTEwMzU4MDEzODQ4NDI5&filename=&opi=89354086"
  },
  {
    name: "projects/17203910358013848429/screens/5975288658a64bbf8e764c39fc9c9322",
    title: "Klassische Kosmetik",
    htmlUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzMxNGNmNjMwZmNiOTRhYWY5NDRkNDI5NTUzNWI0Y2E4EgoSBhCZj5TtBRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjAzOTEwMzU4MDEzODQ4NDI5&filename=&opi=89354086"
  },
  {
    name: "projects/17203910358013848429/screens/0da4ebc19ac849a6a08cdb6aa842c0e6",
    title: "Wimpernlifting",
    htmlUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAxYTQ0NzA3Yzg2ZjQxODBhYTNmY2QxOTMwZmFkNWVkEgoSBhCZj5TtBRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjAzOTEwMzU4MDEzODQ4NDI5&filename=&opi=89354086"
  },
  {
    name: "projects/17203910358013848429/screens/a42944d1639d46d19037bfa9896f7c05",
    title: "Fruchtsaeure Peeling",
    htmlUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzcxZDI5Y2UwMjk1ZjQ1MmViNTIwZDU0OTZmYjI2NjhiEgoSBhCZj5TtBRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjAzOTEwMzU4MDEzODQ4NDI5&filename=&opi=89354086"
  },
  {
    name: "projects/17203910358013848429/screens/e56381ada1934584ab793dd3bbbf64ec",
    title: "Visia Hautanalyse",
    htmlUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2JjODU4YzQ4MDc4NDQ2NmQ5MGE1NzljN2VlYWEzMTgwEgoSBhCZj5TtBRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjAzOTEwMzU4MDEzODQ4NDI5&filename=&opi=89354086"
  }
];

const downloadDir = path.resolve('.stitch/designs');
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Handle redirect
        downloadFile(res.headers.location, outputPath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download: Status Code ${res.statusCode}`));
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
  for (const screen of screens) {
    const filename = screen.title.toLowerCase().replace(/[^a-z0-9]/g, '_') + '.html';
    const outputPath = path.join(downloadDir, filename);
    console.log(`Downloading: ${screen.title} -> ${filename}`);
    try {
      await downloadFile(screen.htmlUrl, outputPath);
      console.log(`✅ Success`);
    } catch (e) {
      console.error(`❌ Failed: ${e.message}`);
    }
  }
}

start();
