# Deployment Guide

Complete guide to deploying CleanPress Laundry Service Booking App to various platforms.

## 📋 Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] Environment variables configured
- [ ] Images optimized and in place
- [ ] Company information updated
- [ ] Contact details updated
- [ ] Social media links updated
- [ ] Analytics tracking code added (if needed)
- [ ] SEO meta tags customized
- [ ] Favicon and logo updated
- [ ] Test on multiple browsers
- [ ] Test on mobile devices

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

Vercel is the recommended platform as it's created by the Next.js team.

#### Step 1: Prepare Your Repository
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Create GitHub repository and push
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

#### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Add environment variables (if any)
7. Click "Deploy"

#### Step 3: Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for DNS propagation (5-60 minutes)

**Deployment Time**: 2-3 minutes
**Auto-deploy on push**: Yes
**Free SSL**: Yes

---

### Option 2: Netlify

#### Step 1: Build Settings
Create `netlify.toml` in root:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

#### Step 2: Deploy
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "New site from Git"
4. Select your repository
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables
7. Click "Deploy site"

**Deployment Time**: 3-5 minutes
**Auto-deploy on push**: Yes
**Free SSL**: Yes

---

### Option 3: AWS Amplify

#### Step 1: Install Amplify CLI
```bash
npm install -g @aws-amplify/cli
amplify configure
```

#### Step 2: Initialize Amplify
```bash
amplify init
amplify add hosting
amplify publish
```

#### Step 3: Deploy via Console
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click "New app" → "Host web app"
3. Connect your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
5. Add environment variables
6. Click "Save and deploy"

**Deployment Time**: 5-7 minutes
**Auto-deploy on push**: Yes
**Free SSL**: Yes

---

### Option 4: Digital Ocean App Platform

#### Step 1: Create App
1. Go to [Digital Ocean](https://www.digitalocean.com)
2. Click "Apps" → "Create App"
3. Connect GitHub repository
4. Configure:
   - Type: Web Service
   - Build Command: `npm run build`
   - Run Command: `npm start`
   - HTTP Port: 3000

#### Step 2: Set Environment Variables
Add any required environment variables in the app settings.

#### Step 3: Deploy
Click "Create Resources" to deploy.

**Deployment Time**: 5-10 minutes
**Auto-deploy on push**: Yes
**Cost**: Starting at $5/month

---

### Option 5: Traditional VPS/Server

#### Requirements
- Node.js 18+ installed
- PM2 for process management
- Nginx for reverse proxy
- SSL certificate (Let's Encrypt)

#### Step 1: Server Setup
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt-get install nginx
```

#### Step 2: Deploy Application
```bash
# Clone repository
git clone YOUR_REPO_URL
cd Laundry-Service-Booking-App

# Install dependencies
npm install

# Build application
npm run build

# Start with PM2
pm2 start npm --name "laundry-app" -- start
pm2 save
pm2 startup
```

#### Step 3: Configure Nginx
Create `/etc/nginx/sites-available/laundry-app`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/laundry-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 4: SSL with Let's Encrypt
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

**Deployment Time**: 30-60 minutes
**Auto-deploy on push**: Manual setup required
**Cost**: $5-20/month depending on VPS

---

## 🔐 Environment Variables

Create `.env.production` for production environment:

```env
# Production Site URL
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# API Configuration
NEXT_PUBLIC_API_URL=https://api.your-domain.com

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Payment Gateway (if integrated)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx

# Google Maps (if integrated)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
```

---

## 📊 Post-Deployment

### 1. Test Your Deployment
- [ ] Visit all pages
- [ ] Test cart functionality
- [ ] Submit contact form
- [ ] Test on mobile devices
- [ ] Check browser console for errors
- [ ] Test service detail pages
- [ ] Verify images load correctly

### 2. Setup Monitoring
- Add Google Analytics
- Setup error tracking (Sentry)
- Monitor performance (Vercel Analytics)
- Setup uptime monitoring

### 3. SEO Configuration
- Submit sitemap to Google Search Console
- Verify site ownership
- Add structured data
- Update robots.txt if needed

### 4. Performance Optimization
- Enable CDN (usually automatic on platforms)
- Configure caching headers
- Optimize images further if needed
- Enable compression

---

## 🔄 Continuous Deployment

### Automatic Deployment on Git Push

Most platforms (Vercel, Netlify, AWS Amplify) automatically deploy when you push to your main branch.

```bash
# Make changes
git add .
git commit -m "Update service prices"
git push origin main

# Your site will automatically redeploy!
```

### Branch Deployments

Create preview deployments for testing:
```bash
# Create feature branch
git checkout -b feature/new-service
# Make changes and push
git push origin feature/new-service

# Most platforms create a preview URL automatically
```

---

## 🛠️ Troubleshooting

### Build Fails

**Check:**
- Node.js version (must be 18+)
- All dependencies installed
- Environment variables set correctly
- No TypeScript errors

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Page Not Found (404)

**Cause**: Routing issues or build problems

**Solution:**
- Ensure all pages are in `src/app/` directory
- Check for missing `page.tsx` files
- Rebuild the application

### Slow Load Times

**Solutions:**
- Enable CDN
- Optimize images
- Use lazy loading
- Enable caching headers
- Minimize JavaScript bundles

### Environment Variables Not Working

**Check:**
- Variables start with `NEXT_PUBLIC_` for client-side
- Variables are added in platform dashboard
- Rebuild after adding variables
- Check spelling/capitalization

---

## 📞 Support

If you encounter deployment issues:

1. Check platform-specific documentation
2. Review build logs for errors
3. Test build locally first: `npm run build && npm start`
4. Contact platform support
5. Reach out through CodeCanyon for app-specific help

---

## 🎉 Success!

Once deployed, your laundry service booking app is live and ready to accept customers!

**Next Steps:**
- Share your website URL
- Start marketing
- Monitor analytics
- Gather user feedback
- Plan future updates

---

**Need help with deployment? Contact through CodeCanyon support.**
