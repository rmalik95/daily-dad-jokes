# Security Policy & Best Practices

This document outlines security policies, guardrails, and best practices for the Daily Dad Jokes static website.

## Table of Contents

- [Security Headers](#security-headers)
- [Content Security Policy](#content-security-policy)
- [Deployment Security](#deployment-security)
- [Code Security](#code-security)
- [Dependency Management](#dependency-management)
- [Incident Response](#incident-response)

---

## Security Headers

The following security headers are configured and enforced:

### Implemented Headers

1. **X-Content-Type-Options: nosniff**
   - Prevents MIME-type sniffing
   - Protects against content-type confusion attacks

2. **X-Frame-Options: DENY**
   - Prevents clickjacking attacks
   - Blocks site from being embedded in iframes

3. **X-XSS-Protection: 1; mode=block**
   - Enables browser XSS filter
   - Legacy support for older browsers

4. **Referrer-Policy: strict-origin-when-cross-origin**
   - Controls referrer information sent
   - Balances privacy and functionality

5. **Permissions-Policy: geolocation=(), microphone=(), camera=()**
   - Disables unnecessary browser features
   - Reduces attack surface

6. **Strict-Transport-Security (HSTS)**
   - Forces HTTPS connections
   - Prevents protocol downgrade attacks
   - Max age: 1 year with preload

### Configuration Locations

- **HTML Meta Tags:** `index.html` (fallback)
- **Cloudflare Pages:** `public/_headers` (primary)
- **Netlify:** `netlify.toml` (optional)

---

## Content Security Policy

### Current CSP

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
font-src 'self' data:;
connect-src 'self';
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
```

### CSP Explanation

- **default-src 'self':** Only allow resources from same origin
- **script-src:** Allows inline scripts (required for Vite) and eval (for development)
- **style-src:** Allows inline styles (required for Tailwind CSS)
- **img-src:** Allows images from same origin, data URIs, and HTTPS
- **font-src:** Allows fonts from same origin and data URIs
- **connect-src:** Restricts API calls to same origin
- **frame-ancestors 'none':** Prevents embedding (redundant with X-Frame-Options)
- **base-uri 'self':** Restricts base tag URLs
- **form-action 'self':** Restricts form submissions

### CSP Hardening (Future)

For stricter security, consider:
- Removing `'unsafe-inline'` and `'unsafe-eval'` (requires nonce/hash)
- Implementing nonce-based CSP for scripts
- Using hash-based CSP for inline styles

---

## Deployment Security

### Pre-Deployment Checklist

- [ ] No secrets in code or environment variables
- [ ] All dependencies up to date (`npm audit`)
- [ ] Security headers configured
- [ ] CSP policy tested
- [ ] HTTPS enforced
- [ ] Build artifacts don't contain source maps (production)
- [ ] No console.log statements in production build

### Build Security

**Current Configuration (`vite.config.ts`):**
- Source maps disabled in production
- Console.log removed in production
- Debugger statements removed
- Code minified and obfuscated

### Hosting Platform Security

#### Cloudflare Pages
- ✅ Automatic HTTPS
- ✅ DDoS protection
- ✅ WAF (Web Application Firewall) available
- ✅ Security headers configured
- ✅ Global CDN performance

#### Netlify
- ✅ Automatic HTTPS
- ✅ DDoS protection
- ✅ Security headers configured
- ✅ Bot protection available

#### Cloudflare Pages
- ✅ Automatic HTTPS
- ✅ DDoS protection
- ✅ WAF (Web Application Firewall) available
- ✅ Security headers configured

---

## Code Security

### Input Validation

Since this is a static site with no user input:
- ✅ No form submissions
- ✅ No API calls to external services
- ✅ No user-generated content

### XSS Prevention

- ✅ React automatically escapes content
- ✅ No `dangerouslySetInnerHTML` usage
- ✅ CSP policy restricts script execution

### Dependency Security

**Regular Audits:**
```bash
npm audit
npm audit fix
```

**Automated Checks:**
- GitHub Actions runs `npm audit` on every PR
- Dependabot enabled (if configured)

**Vulnerability Response:**
1. Check severity level
2. Review affected dependencies
3. Update to patched version
4. Test thoroughly
5. Deploy fix

---

## Dependency Management

### Security Best Practices

1. **Keep Dependencies Updated**
   ```bash
   npm outdated
   npm update
   ```

2. **Use Exact Versions for Critical Packages**
   - Review `package.json` for critical security packages
   - Consider pinning versions for sensitive dependencies

3. **Regular Security Audits**
   - Weekly: `npm audit`
   - Monthly: Review dependency updates
   - Quarterly: Major version updates

4. **Remove Unused Dependencies**
   ```bash
   npm prune
   ```

### Known Vulnerabilities

Check current status:
```bash
npm audit
```

For moderate+ severity, address immediately.

---

## Environment Variables

### Security Rules

1. **Never commit `.env` files**
   - Already in `.gitignore`
   - Use `.env.example` for documentation

2. **Use Platform Environment Variables**
   - Configure in hosting platform dashboard
   - Never hardcode secrets

3. **Prefix with `VITE_`**
   - Required for Vite to expose to client
   - Only expose public variables
   - Never expose secrets (API keys, tokens)

### Example `.env.example`

```bash
# Public API URL (safe to expose)
VITE_API_URL=https://api.example.com

# Never add secrets here!
# SECRET_KEY=xxx
# API_KEY=xxx
```

---

## Incident Response

### Security Incident Procedure

1. **Identify**
   - Monitor error logs
   - Check security alerts
   - Review user reports

2. **Contain**
   - Disable affected features if needed
   - Revoke compromised credentials
   - Block malicious IPs (if applicable)

3. **Assess**
   - Determine scope of incident
   - Identify root cause
   - Evaluate impact

4. **Remediate**
   - Fix vulnerability
   - Update dependencies
   - Deploy fix

5. **Document**
   - Record incident details
   - Update security policies
   - Communicate if necessary

### Reporting Security Issues

If you discover a security vulnerability:

1. **Do NOT** create a public GitHub issue
2. Email security concerns privately
3. Include:
   - Description of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

---

## Security Checklist

### Before Every Deployment

- [ ] Run `npm audit` - no moderate+ vulnerabilities
- [ ] Run `npm run lint` - no errors
- [ ] Build succeeds: `npm run build`
- [ ] Test security headers: `curl -I https://your-domain.com`
- [ ] Verify CSP doesn't break functionality
- [ ] Check no secrets in build artifacts
- [ ] Review recent dependency updates

### Monthly Security Review

- [ ] Update all dependencies
- [ ] Review security advisories
- [ ] Check hosting platform security updates
- [ ] Review access logs for anomalies
- [ ] Test backup/restore procedures
- [ ] Update security documentation

### Quarterly Security Audit

- [ ] Full dependency audit
- [ ] Review and update CSP policy
- [ ] Review security headers
- [ ] Test incident response procedures
- [ ] Review and update this document

---

## Compliance & Standards

### OWASP Top 10

This static site addresses:

- ✅ **A01:2021 – Broken Access Control:** No user authentication needed
- ✅ **A02:2021 – Cryptographic Failures:** HTTPS enforced, no sensitive data
- ✅ **A03:2021 – Injection:** No user input, React XSS protection
- ✅ **A04:2021 – Insecure Design:** Security-first architecture
- ✅ **A05:2021 – Security Misconfiguration:** Headers configured, secure defaults
- ✅ **A06:2021 – Vulnerable Components:** Regular dependency audits
- ✅ **A07:2021 – Authentication Failures:** N/A (static site)
- ✅ **A08:2021 – Software and Data Integrity:** Dependency verification
- ✅ **A09:2021 – Security Logging:** Error logging configured
- ✅ **A10:2021 – SSRF:** No server-side requests

---

## Additional Resources

- [OWASP Static Site Security](https://owasp.org/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [Security Headers](https://securityheaders.com/)

---

## Updates

This security policy is reviewed and updated quarterly or as needed when:
- New vulnerabilities are discovered
- Dependencies are updated
- Deployment processes change
- Security standards evolve

**Last Updated:** 2024-02-19
