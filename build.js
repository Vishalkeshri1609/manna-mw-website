// Static site generator for Manna Mens Wear
// Run: node build.js
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const BRAND = "Manna Mens Wear";
const BRAND_CAPS = "MANNA MENS WEAR";

const SITE = {
  email: 'admin@mannamw.in',
  phone: '+91 9422028861',
  phoneHref: 'tel:+919422028861',
  gst: '27APEPM2883E1ZT',
  addressLine: "598/600, SHUKRAWAR PETH, SHIVAJI ROAD, PUNE, MANNA MENS WEAR, Pune - 411042, Maharashtra, India",
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('598/600, Shukrawar Peth, Shivaji Road, Pune - 411042, Maharashtra, India'),
  facebook: 'https://www.facebook.com/',
  instagram: 'https://www.instagram.com/',
};

// ---------------------------------------------------------------------------
// Routes (id -> output file, relative to project root, posix separators)
// ---------------------------------------------------------------------------
const ROUTES = {
  home: 'index.html',
  'about-us': 'company-profile/about-us.html',
  'who-we-are': 'company-profile/who-we-are.html',
  'why-choose-us': 'company-profile/why-choose-us.html',
  'export-process': 'company-profile/step-by-step-export-process.html',
  sourcing: 'company-profile/sourcing-procurement.html',
  sustainability: 'company-profile/sustainability-corporate-social-responsibility.html',
  products: 'our-products/index.html',
  'prod-tshirts': 'our-products/mens-t-shirts-for-bulk-retail-buying.html',
  'prod-formal-shirts': 'our-products/mens-formal-shirts-for-office-event-sourcing.html',
  'prod-blazers': 'our-products/mens-slim-fit-blazers-for-formal-smart-wear.html',
  'prod-trousers': 'our-products/mens-slim-fit-trousers-for-businesswear-sourcing.html',
  blogs: 'blogs/index.html',
  'blog-garment-exporter': 'blogs/top-10-factors-to-consider-when-choosing-a-garment-exporter.html',
  'blog-import-guide': 'blogs/how-to-start-importing-apparel-from-india-a-step-by-step-guide.html',
  'blog-hospital-uniforms': 'blogs/hospital-uniforms-export-quality-hygiene-compliance-explained.html',
  'blog-uniform-supplier': 'blogs/how-to-choose-the-right-uniform-supplier-for-your-business.html',
  'blog-tshirt-manufacturers': 'blogs/why-indian-t-shirt-manufacturers-are-preferred-by-global-buyers.html',
  'blog-school-uniforms': 'blogs/complete-guide-to-exporting-school-uniforms-from-india.html',
  contact: 'contact-us.html',
};

function relHref(fromFile, toKeyOrPath) {
  const toPath = ROUTES[toKeyOrPath] || toKeyOrPath;
  let rel = path.posix.relative(path.posix.dirname(fromFile), toPath);
  if (!rel) rel = path.posix.basename(toPath);
  return rel;
}
function img(fromFile, name) {
  return relHref(fromFile, 'assets/images/' + name);
}
function asset(fromFile, p) {
  return relHref(fromFile, p);
}

// ---------------------------------------------------------------------------
// Content block renderer
// ---------------------------------------------------------------------------
function esc(s) { return String(s); }

function blocksToHtml(blocks) {
  return blocks.map((b) => {
    if (b.h2) return `<h2>${b.h2}</h2>`;
    if (b.h3) return `<h3>${b.h3}</h3>`;
    if (b.p) return `<p>${b.p}</p>`;
    if (b.ul) return `<ul>${b.ul.map((i) => `<li>${i}</li>`).join('')}</ul>`;
    if (b.check) return `<ul class="check-list">${b.check.map((i) => `<li>${i}</li>`).join('')}</ul>`;
    if (b.faqGroup) {
      const { title, items } = b.faqGroup;
      const heading = title ? `<h2>${title}</h2>` : '';
      const faqs = items.map((it) => `<details class="faq"><summary>${it.q}</summary><div class="faq-body">${it.a}</div></details>`).join('');
      return heading + faqs;
    }
    return '';
  }).join('\n');
}

// ---------------------------------------------------------------------------
// Nav / header / footer / layout
// ---------------------------------------------------------------------------
const NAV = [
  { key: 'home', label: 'Home' },
  {
    key: 'company-profile', label: 'Company Profile', children: [
      { key: 'about-us', label: 'About Us' },
      { key: 'who-we-are', label: 'Who We Are' },
      { key: 'why-choose-us', label: 'Why Choose Us' },
      { key: 'export-process', label: 'Step-by-Step Export Process' },
      { key: 'sourcing', label: 'Sourcing & Procurement' },
      { key: 'sustainability', label: 'Sustainability & CSR' },
    ],
  },
  {
    key: 'products', label: 'Our Products', children: [
      { key: 'prod-tshirts', label: "Men's T-Shirts for Bulk & Retail Buying" },
      { key: 'prod-formal-shirts', label: "Men's Formal Shirts for Office & Event Sourcing" },
      { key: 'prod-blazers', label: "Men's Slim Fit Blazers for Formal & Smart Wear" },
      { key: 'prod-trousers', label: "Men's Slim Fit Trousers for Businesswear Sourcing" },
    ],
  },
  { key: 'blogs', label: 'Blogs' },
  { key: 'contact', label: 'Contact Us' },
];

function renderNav(currentFile, activeTop) {
  return NAV.map((item) => {
    const isActive = item.key === activeTop;
    if (item.children) {
      return `<li class="${isActive ? 'active' : ''}">
        <a href="${relHref(currentFile, item.key === 'company-profile' ? 'about-us' : item.key)}">${item.label}</a>
        <div class="dropdown">
          ${item.children.map((c) => `<a href="${relHref(currentFile, c.key)}">${c.label}</a>`).join('')}
        </div>
      </li>`;
    }
    return `<li class="${isActive ? 'active' : ''}"><a href="${relHref(currentFile, item.key)}">${item.label}</a></li>`;
  }).join('');
}

function renderHeader(currentFile, activeTop) {
  return `
  <div class="topbar">
    <div class="container">
      <div class="topbar-contacts">
        <span><a href="mailto:${SITE.email}">${SITE.email}</a></span>
        <span><a href="${SITE.phoneHref}">${SITE.phone}</a></span>
      </div>
      <div class="topbar-social">
        <a href="${SITE.facebook}" aria-label="Facebook" target="_blank" rel="noopener">f</a>
        <a href="${SITE.instagram}" aria-label="Instagram" target="_blank" rel="noopener">ig</a>
      </div>
    </div>
  </div>
  <header class="site-header">
    <div class="container">
      <div class="search-box">
        <form action="${relHref(currentFile, 'products')}" method="get">
          <input type="text" name="q" placeholder="Search Product" />
          <button type="submit" aria-label="Search">&#128269;</button>
        </form>
      </div>
      <div class="brand">
        <a href="${relHref(currentFile, 'home')}">
          <span class="brand-script">Manna Mens Wear</span>
        </a>
      </div>
      <a class="btn" href="${relHref(currentFile, 'contact')}">Send Inquiry</a>
    </div>
  </header>
  <nav class="site-nav">
    <div class="container">
      <button class="nav-toggle" aria-label="Menu">&#9776;</button>
      <ul class="nav-list">${renderNav(currentFile, activeTop)}</ul>
    </div>
  </nav>`;
}

function renderFooter(currentFile) {
  return `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <h4>${BRAND}</h4>
        <p>With over 26 years of experience, ${BRAND} operates as a corporate apparel manufacturer in India supporting B2B buyers with consistent, production-led supply across t-shirts, formal shirts, blazers and trousers.</p>
        <div class="footer-social">
          <a href="${SITE.facebook}" aria-label="Facebook" target="_blank" rel="noopener">f</a>
          <a href="${SITE.instagram}" aria-label="Instagram" target="_blank" rel="noopener">ig</a>
        </div>
      </div>
      <div>
        <h4>Quick Links</h4>
        <ul>
          <li><a href="${relHref(currentFile, 'home')}">Home</a></li>
          <li><a href="${relHref(currentFile, 'products')}">Our Products</a></li>
          <li><a href="${relHref(currentFile, 'blogs')}">Blogs</a></li>
          <li><a href="${relHref(currentFile, 'contact')}">Contact Us</a></li>
        </ul>
      </div>
      <div>
        <h4>Company Profile</h4>
        <ul>
          <li><a href="${relHref(currentFile, 'about-us')}">About Us</a></li>
          <li><a href="${relHref(currentFile, 'who-we-are')}">Who We Are</a></li>
          <li><a href="${relHref(currentFile, 'why-choose-us')}">Why Choose Us</a></li>
          <li><a href="${relHref(currentFile, 'export-process')}">Export Process</a></li>
          <li><a href="${relHref(currentFile, 'sourcing')}">Sourcing &amp; Procurement</a></li>
          <li><a href="${relHref(currentFile, 'sustainability')}">Sustainability &amp; CSR</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact Us</h4>
        <ul>
          <li>${SITE.addressLine}</li>
          <li><a href="${SITE.phoneHref}">${SITE.phone}</a></li>
          <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      &copy; ${new Date().getFullYear()} ${BRAND}. All rights reserved.
    </div>
  </footer>`;
}

function layout({ file, title, description, activeTop, bodyHtml, bannerImage }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<meta name="description" content="${description}" />
<link rel="icon" href="${img(file, 'logo.png')}" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${asset(file, 'assets/css/style.css')}" />
</head>
<body>
${renderHeader(file, activeTop)}
${bodyHtml}
${renderFooter(file)}
<script src="${asset(file, 'assets/js/main.js')}"></script>
</body>
</html>`;
}

function pageBanner(file, crumbs, title) {
  return `
  <section class="page-banner">
    <div class="container">
      <div class="crumb">${crumbs.map((c, i) => (i < crumbs.length - 1 ? `<a href="${relHref(file, c.key)}">${c.label}</a> / ` : `<span>${c.label}</span>`)).join('')}</div>
      <h1>${title}</h1>
    </div>
  </section>`;
}

function companyProfileSidebar(file, activeKey) {
  const items = NAV.find((n) => n.key === 'products') && null;
  const links = [
    { key: 'about-us', label: 'About Us' },
    { key: 'who-we-are', label: 'Who We Are' },
    { key: 'why-choose-us', label: 'Why Choose Us' },
    { key: 'export-process', label: 'Step-by-Step Export Process' },
    { key: 'sourcing', label: 'Sourcing & Procurement' },
    { key: 'sustainability', label: 'Sustainability & CSR' },
  ];
  return `<aside class="sidebar">
    <h4>Company Profile</h4>
    <ul>${links.map((l) => `<li><a class="${l.key === activeKey ? 'active' : ''}" href="${relHref(file, l.key)}">${l.label}</a></li>`).join('')}</ul>
  </aside>`;
}

// ---------------------------------------------------------------------------
// Shared home-page building blocks reused across pages (stats, icons, etc.)
// ---------------------------------------------------------------------------
function statsSection() {
  return `
  <section class="stats">
    <div class="container">
      <div><div class="num">26+</div><div class="label">Years in Apparel</div></div>
      <div><div class="num">100+</div><div class="label">Clients Served</div></div>
      <div><div class="num">1M+</div><div class="label">Production Capacity</div></div>
      <div><div class="num">300+</div><div class="label">Team Strength</div></div>
    </div>
  </section>`;
}

function certificationsSection(file) {
  return `
  <section class="section">
    <div class="container">
      <div class="section-title">
        <span class="eyebrow">Verified &amp; Compliant</span>
        <h2>Our Certifications</h2>
      </div>
      <div class="cert-row">
        <div><img src="${img(file, 'cert-udyam.jpeg')}" alt="UDYAM Registration" /><div class="cert-label">UDYAM Registration</div></div>
        <div><img src="${img(file, 'cert-gstin.jpeg')}" alt="GSTIN" /><div class="cert-label">GSTIN</div></div>
        <div><img src="${img(file, 'cert-iec.jpeg')}" alt="Import Export Code" /><div class="cert-label">Import Export Code</div></div>
      </div>
    </div>
  </section>`;
}

function clientLogosSection(file) {
  const logos = Array.from({ length: 10 }, (_, i) => i + 1);
  return `
  <section class="section section-soft">
    <div class="container">
      <div class="section-title">
        <span class="eyebrow">Trusted Partnerships</span>
        <h2>Clients Who Rely On Us</h2>
      </div>
      <div class="logo-strip">
        ${logos.map((n) => `<img src="${img(file, 'client-logo-' + n + '.jpeg')}" alt="Client logo" />`).join('')}
      </div>
    </div>
  </section>`;
}

module.exports = {
  ROOT, BRAND, BRAND_CAPS, SITE, ROUTES, relHref, img, asset, blocksToHtml,
  layout, pageBanner, companyProfileSidebar, statsSection, certificationsSection, clientLogosSection,
};
