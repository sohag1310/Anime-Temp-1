# ToonPlay - Watch Anime & Cartoons Online

A modern, responsive anime and cartoon streaming web platform built with React 19, Vite 6, Tailwind CSS v4, and Express.

---

## 🛠️ ডিপ্লয় এরর কেন হচ্ছিল? (Why Render Deployment Failed)

আপনি যখন গিটহাবে পুশ করে রেন্ডারে ডিপ্লয় করছিলেন, তখন মূলত ৪টি বড় কারণে রেন্ডারে এরর আসছিল:

1. **ভুল এবং কাল্পনিক প্যাকেজ ভার্সন (Invalid Package Versions)**: 
   মূল `package.json`-এ এমন কিছু ভার্সন লেখা ছিল যা npm-এ কখনো রিলিজই হয়নি (যেমন `typescript: ^7.0.2`, `vite: ^8.3.0`, `dotenv: ^17.2.3`, `@vitejs/plugin-react: ^6.1.1`)। রেন্ডারে `npm install` চলার সাথে সাথেই npm ক্র্যাশ করত (`ETARGET: No matching version found`).
2. **Web Service-এর জন্য `start` কমান্ড ও সার্ভার ফাইল ছিল না**:
   রেন্ডারে Web Service হিসেবে ডিপ্লয় করলে রেন্ডার `npm start` চালায়। প্রজেক্টে কোনো `start` স্ক্রিপ্ট ও `server.js` ছিল না।
3. **`index.html` এর সমস্যা**:
   HTML ফাইলের ভেতরে `/src/main.tsx` এর লিংক ছিল না, যার ফলে Vite রিয়েক্ট অ্যাপ বিল্ড করতে পারছিল না। এছাড়া ভেতরে ব্রাউজার ফ্রিজ করার স্ক্রিপ্ট ছিল।
4. **SPA রাউটিং এরর (_redirects মিসিং)**:
   রেন্ডারে স্ট্যাটিক সাইট হিসেবে ডিপ্লয় করলে পেজ রিফ্রেশ দিলে বা ডিরেক্ট লিংকে ঢুকলে 404 Not Found এরর আসত।

**এই সবগুলো সমস্যা সম্পূর্ণ ফিক্স করে দেওয়া হয়েছে!**

---

## 🚀 Render.com-এ ডিপ্লয় করার সহজ নিয়ম (Deployment Guide)

### পদ্ধতি ১: Render Static Site (সবচেয়ে সহজ, দ্রুত ও ১০০% ফ্রি) ⭐ রেকমেন্ডেড
রেন্ডারের স্ট্যাটিক সাইট কখনো স্লিপে যায় না এবং একদম সাথে সাথে লোড হয়।

1. এই ফোল্ডারের ফাইলগুলো আপনার GitHub রিপোজিটরিতে Push করুন।
2. [Render Dashboard](https://dashboard.render.com)-এ যান।
3. **New +** বাটনে ক্লিক করে **Static Site** সিলেক্ট করুন।
4. আপনার GitHub রিপোজিটরিটি কানেক্ট করুন।
5. নিচের সেটিংসগুলো দিন:
   - **Name**: `toonplay`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
6. **Create Static Site** বাটনে ক্লিক করুন। ২ মিনিটের মধ্যে আপনার ওয়েবসাইট লাইভ হয়ে যাবে!

---

### পদ্ধতি ২: Render Web Service (Node.js Express Server)
আপনি যদি Node.js সার্ভার দিয়ে চালাতে চান:

1. আপনার GitHub রিপো কানেক্ট করে **Web Service** সিলেক্ট করুন।
2. নিচের সেটিংসগুলো দিন:
   - **Name**: `toonplay-service`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
3. Environment Variables এ যোগ করতে পারেন:
   - `NODE_VERSION` = `20`
4. **Create Web Service** এ ক্লিক করুন। `server.js` স্বয়ংক্রিয়ভাবে অ্যাপটি পোর্ট অনুযায়ী রান করে দেবে।
*(প্রজেক্টে `render.yaml` ফাইল দেওয়া আছে, যাতে রেন্ডার এক ক্লিকেই সম্পূর্ণ কনফিগারেশন বুঝে নেয়)*

---

## 💻 লোকাল কম্পিউটারে রান করার নিয়ম (Local Development)

```bash
# ডিপেন্ডেন্সি ইন্সটল
npm install

# ডেভেলপমেন্ট সার্ভার চালু
npm run dev

# প্রোডাকশন বিল্ড
npm run build

# প্রোডাকশন সার্ভার চালু
npm start
```
