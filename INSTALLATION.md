# Installation Guide

## Quick Start (5 Minutes)

### Step 1: Prerequisites
Make sure you have installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

To check if installed, open terminal/command prompt:
```bash
node --version
npm --version
```

### Step 2: Extract Files
Extract the downloaded ZIP file to your desired location.

### Step 3: Install Dependencies
Open terminal/command prompt in the project folder and run:
```bash
npm install
```
Wait for installation to complete (2-3 minutes).

### Step 4: Run Development Server
```bash
npm run dev
```

### Step 5: Open in Browser
Navigate to: **http://localhost:3000**

✅ **Done!** Your app is now running.

---

## Detailed Installation Steps

### For Windows Users

1. **Install Node.js**
   - Download from https://nodejs.org/
   - Run installer with default options
   - Restart computer after installation

2. **Open Command Prompt**
   - Press `Win + R`
   - Type `cmd` and press Enter

3. **Navigate to Project**
   ```bash
   cd C:\path\to\Laundry-Service-Booking-App
   ```

4. **Install & Run**
   ```bash
   npm install
   npm run dev
   ```

### For Mac/Linux Users

1. **Install Node.js**
   - Download from https://nodejs.org/
   - Or use Homebrew: `brew install node`

2. **Open Terminal**
   - Press `Cmd + Space`, type "Terminal"

3. **Navigate to Project**
   ```bash
   cd /path/to/Laundry-Service-Booking-App
   ```

4. **Install & Run**
   ```bash
   npm install
   npm run dev
   ```

---

## Common Issues & Solutions

### Port 3000 Already in Use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Permission Errors (Mac/Linux)
```bash
sudo npm install
```

### Clear Cache
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

---

## Production Build

To create production build:
```bash
npm run build
npm run start
```

---

## Support

If you encounter any issues:
1. Check Node.js version: `node --version` (should be 18+)
2. Delete `node_modules` and reinstall
3. Check firewall settings
4. Contact support with error message

---

**Installation Time: ~5 minutes**
**First Build Time: ~2-3 minutes**
