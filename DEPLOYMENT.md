# Deployment Guide

This document provides comprehensive instructions for deploying the Daily Dad Jokes static website to various hosting platforms.

## Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Platform-Specific Deployment](#platform-specific-deployment)
  - [Cloudflare Pages](#cloudflare-pages)
  - [Netlify](#netlify)
  - [GitHub Pages](#github-pages)
  - [AWS S3 + CloudFront](#aws-s3--cloudfront)
- [Post-Deployment Verification](#post-deployment-verification)
- [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

Use this comprehensive checklist before deploying:

### Code Quality
- [ ] Code passes linting: `npm run lint`
- [ ] No TypeScript errors
- [ ] No console errors in browser
- [ ] All routes tested locally

### Build Verification
- [ ] Build succeeds: `npm run build`
- [ ] `dist/` directory created
- [ ] `dist/index.html` exists
- [ ] Assets are in `dist/assets/`
- [ ] No source maps in production build
- [ ] Console.log statements removed in build

### Security
- [ ] No secrets in code
- [ ] No API keys hardcoded
- [ ] `.env` files not committed (check `.gitignore`)
- [ ] Security headers configured
- [ ] CSP policy tested
- [ ] `npm audit` shows no moderate+ vulnerabilities

### Configuration Files
- [ ] `public/_headers` exists (for Cloudflare Pages)
- [ ] `.github/workflows/deploy.yml` exists
- [ ] `.nvmrc` specifies Node version

### SEO & Meta
- [ ] `index.html` has proper meta tags
- [ ] Open Graph tags configured
- [ ] Twitter card tags configured
- [ ] `robots.txt` configured
- [ ] `sitemap.xml` created (update domain)

---

## Platform-Specific Deployment

### Cloudflare Pages

**Recommended for:** Global CDN, excellent performance, best for this project

1. **Deploy via Dashboard:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Pages → Create a project
   - Connect your Git repository
   - Build settings:
     - Framework preset: Vite
     - Build command: `npm run build`
     - Build output directory: `dist`

2. **Deploy via Wrangler CLI:**
   ```bash
   npm install -g wrangler
   wrangler pages deploy dist --project-name=daily-dad-jokes
   ```

3. **Environment Variables** (if needed):
   - Go to Settings → Environment Variables
   - Add any required variables

**Configuration:** Headers configured in `public/_headers`

---

### Netlify

**Recommended for:** Easy setup, good free tier

1. **Deploy via Dashboard:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

2. **Deploy via CLI:**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod
   ```

3. **Environment Variables:**
   - Site settings → Environment variables
   - Add required variables

**Configuration:** Already set in `netlify.toml`

---


### GitHub Pages

**Recommended for:** Free hosting for public repos

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json:**
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Configure GitHub Pages:**
   - Repository Settings → Pages
   - Source: GitHub Actions (recommended) or gh-pages branch

4. **Deploy:**
   ```bash
   npm run deploy
   ```

**Note:** Update `vite.config.ts` base path if using custom domain:
```typescript
export default defineConfig({
  base: '/daily-dad-jokes/', // Your repo name
  // ... rest of config
})
```

---

### AWS S3 + CloudFront

**Recommended for:** Enterprise deployments, custom infrastructure

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload to S3:**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

3. **Configure S3 bucket:**
   - Enable static website hosting
   - Set index document: `index.html`
   - Set error document: `index.html` (for SPA routing)
   - Block public access: Off (for public site)
   - Bucket policy: Allow public read access

4. **Set up CloudFront:**
   - Create distribution
   - Origin: S3 bucket
   - Default root object: `index.html`
   - Error pages: 404 → `/index.html` (200)
   - Security headers: Configure in CloudFront response headers policy

5. **Security Headers:**
   - Use CloudFront Response Headers Policy
   - Or configure via Lambda@Edge

---

## Post-Deployment Verification

After deployment, verify everything works correctly:

### Functionality
- [ ] Homepage loads correctly
- [ ] All routes work (test 404 page)
- [ ] Assets load (images, fonts, CSS)
- [ ] JavaScript executes without errors
- [ ] Mobile view works correctly
- [ ] No console errors

### Security Headers
Check headers using:
```bash
curl -I https://your-domain.com
```

Verify presence of:
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-Frame-Options: DENY`
- [ ] `X-XSS-Protection: 1; mode=block`
- [ ] `Content-Security-Policy` present
- [ ] `Strict-Transport-Security` present
- [ ] `Referrer-Policy` present

### Performance
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Assets cached correctly
- [ ] Images optimized

**Test with:**
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

### SEO
- [ ] Meta description present
- [ ] Open Graph tags work (test with [Facebook Debugger](https://developers.facebook.com/tools/debug/))
- [ ] Twitter card works (test with [Twitter Card Validator](https://cards-dev.twitter.com/validator))
- [ ] `robots.txt` accessible: `https://your-domain.com/robots.txt`
- [ ] `sitemap.xml` accessible: `https://your-domain.com/sitemap.xml`

### HTTPS
- [ ] Site loads over HTTPS
- [ ] No mixed content warnings
- [ ] SSL certificate valid
- [ ] HSTS header present

### Analytics & Monitoring
- [ ] Analytics configured (if applicable)
- [ ] Error tracking set up (if applicable)
- [ ] Uptime monitoring configured (optional)

---

## Troubleshooting

### Build Fails

**Error:** `Cannot find module`
- **Solution:** Run `npm ci` to ensure dependencies match lock file

**Error:** `Out of memory`
- **Solution:** Increase Node memory: `NODE_OPTIONS=--max-old-space-size=4096 npm run build`

### Routes Return 404

**Problem:** React Router routes return 404 on refresh
- **Solution:** Ensure hosting platform redirects all routes to `index.html` (configured in platform files)

### Assets Not Loading

**Problem:** Images/CSS not loading
- **Solution:** Check base path in `vite.config.ts` matches deployment path

### Security Headers Not Applied

**Problem:** Headers missing in response
- **Solution:** Verify platform-specific configuration file is present and correct

---

## Continuous Deployment

This repository includes GitHub Actions workflow (`.github/workflows/deploy.yml`) that:
- Runs on push to main/master
- Lints code
- Builds project
- Runs security audit
- Uploads artifacts

To enable auto-deployment:
1. Connect repository to hosting platform
2. Configure platform to deploy on successful GitHub Actions run
3. Or use platform's native CI/CD integration

---

## Environment Variables

If your app requires environment variables:

1. **Create `.env.example`:**
   ```bash
   VITE_API_URL=https://api.example.com
   ```

2. **Add to platform:**
   - Cloudflare Pages: Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables

3. **Access in code:**
   ```typescript
   const apiUrl = import.meta.env.VITE_API_URL
   ```

**Important:** Never commit `.env` files. They're already in `.gitignore`.

---

## Monitoring

After deployment, monitor:

- **Uptime:** Use services like UptimeRobot
- **Performance:** Use Lighthouse CI or WebPageTest
- **Errors:** Set up error tracking (Sentry, LogRocket)
- **Analytics:** Add Google Analytics or similar

---

## Rollback Plan

If deployment fails:

- [ ] Know how to rollback on your platform
- [ ] Previous version accessible
- [ ] Rollback procedure documented

**Platform-specific rollback:**
1. **Cloudflare Pages:** Use Deployments → Rollback
2. **Netlify:** Use Deploys → Publish previous deploy
3. **GitHub Pages:** Revert commit and redeploy

---

## Quick Commands

```bash
# Pre-deployment
npm ci                    # Install dependencies
npm run lint              # Check code quality
npm audit                 # Check vulnerabilities
npm run build             # Build for production
npm run preview           # Preview production build locally

# Post-deployment verification
curl -I https://your-domain.com  # Check headers
```

---

## Support

For issues or questions:
- Check platform-specific documentation
- Review [SECURITY.md](./SECURITY.md) for security concerns
- Check GitHub Issues for known problems
