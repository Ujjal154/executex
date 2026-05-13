# ExecuteX - Study Execution Dashboard

A premium, fully responsive study execution dashboard for competitive exam students. Works on phones, tablets, and desktop.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (download from https://nodejs.org/)
- npm (comes with Node.js)

### Installation & Running

1. **Extract all files to a folder** (e.g., `executex`)

2. **Open terminal/command prompt** in that folder

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   - Local: http://localhost:5173
   - Phone on same WiFi: http://YOUR_COMPUTER_IP:5173
   - To find your IP: Run `ipconfig` (Windows) or `ifconfig` (Mac/Linux)

## 📱 Mobile Installation

### iOS (iPhone/iPad)
1. Open Safari
2. Go to `http://YOUR_COMPUTER_IP:5173`
3. Tap **Share** → **Add to Home Screen**
4. Name it "ExecuteX"
5. Tap **Add**

### Android
1. Open Chrome
2. Go to `http://YOUR_COMPUTER_IP:5173`
3. Tap menu (⋮) → **Install app** or **Add to Home screen**
4. Tap **Install**

## 🔨 Build for Production

To create optimized version for deployment:

```bash
npm run build
```

This creates a `dist` folder. Upload the contents to any web hosting service.

## 📋 Project Structure

```
executex/
├── index.html          # Main HTML file
├── main.jsx            # React entry point
├── App.jsx             # Main component
├── index.css           # Global styles
├── package.json        # Dependencies
├── vite.config.js      # Build configuration
├── tailwind.config.js  # Tailwind setup
├── postcss.config.js   # PostCSS setup
├── manifest.json       # PWA manifest
└── sw.js              # Service Worker
```

## 🎯 Features

✅ **Planning Mode** - Strategize tomorrow's study  
✅ **Execution Mode** - Track daily progress  
✅ **Proof-Based Accountability** - Upload proof before progressing  
✅ **Performance Scoring** - Track quiz/test scores  
✅ **Reality Check Engine** - Motivational warnings  
✅ **Responsive Design** - Mobile, tablet, desktop optimized  
✅ **PWA Support** - Works offline, install as app  
✅ **Glassmorphism UI** - Premium dark aesthetic  
✅ **Smooth Animations** - Framer Motion powered  

## 🌐 Deploy to Web

### Option 1: Vercel (Easiest)
1. Go to https://vercel.com
2. Click "Import Project"
3. Choose "Other" → Connect git repo or upload folder
4. Deploy!

### Option 2: GitHub Pages
1. Build: `npm run build`
2. Upload `dist` folder contents to GitHub Pages

### Option 3: Netlify
1. Go to https://netlify.com
2. Drag & drop `dist` folder
3. Done!

## 🛠️ Customization

### Change Colors
Edit `tailwind.config.js` to customize theme colors

### Change Content
Edit `App.jsx` to modify:
- Task data
- Resource links
- Motivational warnings
- Pipeline steps

### Add New Sections
All components are modular in `App.jsx`

## 📞 Troubleshooting

**Port 5173 already in use:**
```bash
npm run dev -- --port 3000
```

**Can't access from phone:**
- Check both devices on same WiFi
- Check firewall isn't blocking port 5173
- Use `ipconfig` (Windows) or `ifconfig` (Mac) to find your IP

**Service Worker not updating:**
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache

## 💾 Data Persistence

Currently uses in-memory state. To add data persistence:

1. Add localStorage:
```javascript
// In App.jsx
const [taskData, setTaskData] = useState(() => {
  const saved = localStorage.getItem('taskData');
  return saved ? JSON.parse(saved) : defaultData;
});

useEffect(() => {
  localStorage.setItem('taskData', JSON.stringify(taskData));
}, [taskData]);
```

2. Or use IndexedDB for larger datasets

## 🎨 Design System

- **Dark theme**: `bg-slate-950`, `text-white`
- **Primary gradient**: Blue → Purple
- **Secondary colors**: Red (alerts), Emerald (success), Orange (warnings)
- **Spacing**: Tailwind defaults
- **Rounded**: `2xl` for cards, `xl` for buttons

## 📦 Dependencies

- **React 18.2** - UI library
- **Framer Motion 10.16** - Animations
- **Lucide React 0.263** - Icons
- **Tailwind CSS 3.3** - Styling
- **Vite 4.4** - Build tool

## 🤝 Support

For issues or questions:
1. Check browser console (F12) for errors
2. Verify all files are in same directory
3. Ensure Node.js is installed correctly
4. Try: `npm install` again

## 📄 License

Free to use and modify for personal/educational purposes.

---

**Happy studying! 🚀⚡**
