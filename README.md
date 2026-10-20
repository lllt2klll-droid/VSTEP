# miumiuiuem – VSTEP Learning App

## Deploy to GitHub Pages

1. Create a GitHub repository.
2. Upload the **contents of this folder** so that `index.html` is in the repository root.
3. Go to **Settings → Pages**.
4. Select **Deploy from a branch**.
5. Select `main` and `/ (root)` and save.
6. Open the generated GitHub Pages URL.

The app uses relative paths (`./...`) so it works when the repository is published under a URL such as:

`https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/`

## Important

- Do not open `index.html` with `file://` when testing PWA features.
- GitHub Pages provides HTTPS automatically.
- If an older service worker is cached, open DevTools → Application → Service Workers and unregister it once, then reload.
- The test selector contains two working categories: **Đề thi các trường** and **7 test theo sách**.
