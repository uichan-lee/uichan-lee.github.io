# Uichan Lee — Portfolio

Personal portfolio site. Static HTML/CSS/JS.

## Deploy

### Option 1: GitHub Pages

1. Create a new repo (e.g. `portfolio` or `uichan-lee.github.io` for your main site).
2. Push this folder:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/uichan-lee/YOUR-REPO-NAME.git
   git push -u origin main
   ```
3. **Settings → Pages** → Source: Deploy from branch → Branch: `main` → Save.
4. Site will be at `https://uichan-lee.github.io/YOUR-REPO-NAME/` (or `https://uichan-lee.github.io/` if repo is `uichan-lee.github.io`).

### Option 2: Netlify (Drag & Drop)

1. Go to [app.netlify.com](https://app.netlify.com) and sign in.
2. Drag the `portfolio` folder onto the deploy area.
3. Your site gets a URL like `random-name.netlify.app`. You can change it in Domain settings.

### Option 3: Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Import the repo or upload the `portfolio` folder.
3. Deploy. You’ll get a URL like `portfolio-xxx.vercel.app`.
