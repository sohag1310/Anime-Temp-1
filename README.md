# ToonPlay - Watch Anime & Cartoons Online

A modern, fast, responsive streaming web platform for Anime and Cartoons with multi-language dub support (Hindi, Tamil, Telugu, English, Japanese).

---

## 🚀 Render.com Deployment Guide (রেন্ডার ডেপ্লয় নির্দেশিকা)

This project is fully configured to deploy on **Render.com** either as a **Web Service** (recommended) or a **Static Site**.

### Option A: Deploy as a Web Service (সর্বোচ্চ রেকমেন্ডেড)

1. Push this folder to your GitHub / GitLab repository.
2. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** -> **Web Service**.
3. Select your repository.
4. Configure the settings:
   - **Name**: `toonplay-stream`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Under **Environment Variables**:
   - `NODE_VERSION` = `20.18.0`
6. Click **Deploy Web Service**!

*(Render Blueprint / `render.yaml` is also included in this project, which Render detects automatically!)*

---

### Option B: Deploy as a Static Site (বিকল্প পদ্ধতি)

1. In Render Dashboard, click **New +** -> **Static Site**.
2. Select your repository.
3. Configure:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. The included `public/_redirects` will automatically handle SPA client-side routes (e.g. `/watch`, `/category`, etc.).

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview / Start production server
npm start
```

---

## 📱 Mobile & Desktop Responsiveness Features

- **Fluid Viewport Scaling**: Fully responsive on screens ranging from 320px mobile to 4K ultra-wide monitors.
- **No-Break Layout**: Video player maintains exact 16:9 aspect ratio (`aspect-video`) on all phone screens without overflowing.
- **Horizontal Touch Swiping**: Media carousels and audio track filters support smooth touch swipes with hidden scrollbars.
- **Touch-Friendly Controls**: Minimum 44px tap targets for mobile player controls (Auto-Next, Cinema Lights, Server selection, Audio track switcher).
- **Zero Horizontal Jitter**: Hardened with `overflow-x: hidden` and box-sizing to eliminate unexpected horizontal shifts or layout tearing.
