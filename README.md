# Kokone Imaizumi Portfolio

「まだ知らないを、おもしろいへ。」を軸にした、GitHub Pages向けの静的ポートフォリオです。

## Local preview

```bash
python3 -m http.server 5174
```

Open `http://127.0.0.1:5174/` in a browser.

## Content updates

- Works and News: edit `data.js`
- Contact and social links: edit `data.js` in `settings` and `socials`
- Portfolio assets: replace files in `assets/`

The current contact and social values are placeholders until the final public URLs are provided.

## GitHub Pages

Pushing to `main` runs `.github/workflows/deploy-pages.yml`. The workflow copies only the portfolio files into the Pages artifact and deploys them through GitHub Pages.

The project-site path is configured for:

`https://jinquanxinzhu1.github.io/-/`
