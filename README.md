# Vlad Panaite — Portfolio Website

Modern, dark-themed portfolio for sound design and composition work. Built with HTML, CSS, and vanilla JavaScript—no dependencies, fully responsive, hosted on GitHub Pages.

## 🎯 Quick Setup

This site is ready to deploy immediately, but requires one manual step:

### 1. Upload Videos to YouTube (Unlisted)

You have 3 Sound Design reel videos that need to be uploaded to YouTube as "unlisted" videos:

- `SD_reel_FV_f.mp4` → **Cinematic & Game Reel**
- `SD_plyphon_f.mp4` → **Plyphone — Abstract Sound Design**
- `SD_CLIP_F.mp4` → **Interactive Audio Implementation**

**Steps:**
1. Go to https://youtube.com/upload
2. Upload each video as "unlisted" (not private, not public)
3. Copy the video ID from the URL (e.g., `dQw4w9WgXcQ` from `youtube.com/watch?v=dQw4w9WgXcQ`)
4. Send the 3 video IDs to me or update the placeholders in `sound-design.html`

**Placeholder format in `sound-design.html`:**
```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID_HERE" ...></iframe>
```

Replace `VIDEO_ID_HERE` with each actual YouTube video ID.

### 2. Deploy to GitHub Pages

The site is ready to push. From this directory:

```bash
git add .
git commit -m "Initial portfolio site"
gh repo create vlad-panaite-portfolio --public --source=. --push
```

Then enable GitHub Pages:
- Go to https://github.com/vladnonso-cell/vlad-panaite-portfolio
- Settings → Pages
- Set "Source" to `main` branch, root folder
- Save

Your site will be live at: **https://vladnonso-cell.github.io/vlad-panaite-portfolio/**

### 3. Test Locally (Optional)

Before deploying, test the site locally:

```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

## 📋 Contents

- **index.html** — Home, about, skills, contact
- **sound-design.html** — 3 case studies (video placeholders)
- **composition.html** — .Pierrot. project (Spotify embeds)
- **style.css** — Dark theme, fully responsive
- **script.js** — Mobile menu, nav highlighting, scroll reveals
- **assets/cv/** — CV PDF (auto-linked for download)
- **assets/img/** — Images (to be added)

## 🎨 Customization

### Colors
Edit `style.css` `:root` variables:
```css
--accent-red: #e84c3d;
--accent-green: #4ae84c;
--bg-dark: #0a0a0a;
```

### Text / Bio
Edit the content directly in HTML files.

### CV
Replace `assets/cv/Vlad_Panaite_CV.pdf` with your updated resume.

## 📱 Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Dark theme, cinematically styled
- ✅ Spotify embeds (playable in-page)
- ✅ YouTube video embeds (once links added)
- ✅ Direct email link & LinkedIn integration
- ✅ CV download button
- ✅ Mobile hamburger menu
- ✅ Smooth scroll navigation
- ✅ Fade-in animations on scroll
- ✅ No external dependencies (fast, reliable)

## 🚀 What's Next

1. Upload videos to YouTube (unlisted)
2. Update video links in `sound-design.html`
3. Push to GitHub
4. Enable GitHub Pages
5. Share the URL with recruiters/studios

## 📧 Questions?

Email: v.panaite97@gmail.com  
LinkedIn: linkedin.com/in/vlad-p-53164a196/

---

**Built with:** HTML5 · CSS3 · Vanilla JavaScript  
**Hosted on:** GitHub Pages  
**Last updated:** July 2026
