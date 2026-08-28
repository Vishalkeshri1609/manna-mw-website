const fs = require('fs');
const path = require('path');
const {
  ROOT, BRAND, BRAND_CAPS, SITE, ROUTES, relHref, img, asset, blocksToHtml,
  layout, pageBanner, companyProfileSidebar, statsSection, certificationsSection, clientLogosSection,
} = require('./build.js');

function write(file, html) {
  const full = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html, 'utf8');
  console.log('wrote', file);
}

/* =========================================================================
   HOME
   ========================================================================= */
(function homePage() {
  const file = ROUTES.home;
  const slideImages = ['hero-1-tshirts.jpeg', 'hero-2-logistics.jpeg', 'hero-3-bulk-supply.jpeg', 'hero-4-facility.jpeg'];

  const heroHtml = `
  <section class="hero">
    <div class="container hero-inner">
      <div class="hero-text">
        <span class="eyebrow">26+ Years of Apparel Manufacturing</span>
        <h1>Corporate Apparel Manufacturer in India</h1>
        <p>${BRAND} is a corporate apparel manufacturer in India with 26+ years of experience serving international B2B buyers. We deliver consistent quality, scalable production, and export-ready processes with full documentation and logistics support for bulk apparel sourcing.</p>
        <a class="btn btn-gold" href="${relHref(file, 'contact')}">Request Bulk Pricing</a>
      </div>
      <div class="hero-carousel">
        ${slideImages.map((s, i) => `<img class="hero-slide ${i === 0 ? 'active' : ''}" src="${img(file, s)}" alt="Manna Mens Wear apparel manufacturing" />`).join('')}
        <div class="hero-dots">${slideImages.map((_, i) => `<button class="${i === 0 ? 'active' : ''}"></button>`).join('')}</div>
      </div>
    </div>
  </section>`;

  const aboutSplit = `
  <section class="section">
    <div class="container split">
      <img src="${img(file, 'product-banner.jpeg')}" alt="Built for Bulk Production. Structured for Reliable Supply." />
      <div>
        <span class="eyebrow" style="color:var(--gold);font-weight:700;letter-spacing:2px;font-size:13px;text-transform:uppercase;">Who We Are</span>
        <h2>Built for Bulk Production. Structured for Reliable Supply.</h2>
        <p>With over 26 years of experience, ${BRAND} operates as a corporate apparel manufacturer in India supporting B2B buyers with consistent, production-led supply. Our manufacturing approach is built around standardized processes, batch-level quality control, and predictable output across bulk orders.</p>
        <p>We combine in-house production with a structured supplier network to handle varying order scales and specifications. This allows us to maintain flexibility across fabrics, sizing, and branding requirements while ensuring stability in supply for repeat and high-volume orders.</p>
        <p>Our focus is on operational reliability&mdash;ensuring every order moves through defined production, inspection, and delivery stages. This reduces sourcing risk and enables retailers, wholesalers, and procurement teams to scale with confidence.</p>
        <a class="btn" href="${relHref(file, 'contact')}">Request Bulk Pricing</a>
      </div>
    </div>
  </section>`;

  const categories = [
    { key: 'prod-tshirts', image: 'cat-tshirts.jpeg', label: "Men's T-Shirts for Bulk & Retail Buying" },
    { key: 'prod-formal-shirts', image: 'cat-formal-shirts.jpeg', label: "Men's Formal Shirts for Office & Event Sourcing" },
    { key: 'prod-blazers', image: 'cat-blazers.jpeg', label: "Men's Slim Fit Blazers for Formal & Smart Wear" },
    { key: 'prod-trousers', image: 'cat-trousers.jpeg', label: "Men's Slim Fit Trousers for Businesswear Sourcing" },
  ];
  const categoriesHtml = `
  <section class="section section-soft">
    <div class="container">
      <div class="section-title">
        <span class="eyebrow">Product Range</span>
        <h2>Corporate Apparel Categories for Bulk Sourcing</h2>
      </div>
      <div class="cat-grid">
        ${categories.map((c) => `
        <a class="cat-card" href="${relHref(file, c.key)}">
          <img src="${img(file, c.image)}" alt="${c.label}" />
          <h3>${c.label}</h3>
        </a>`).join('')}
      </div>
    </div>
  </section>`;

  const features = [
    { icon: 'icon-quality-control.jpeg', title: 'Structured Quality Control', text: 'Batch-level inspection at every production stage.' },
    { icon: 'icon-bulk-supply.jpeg', title: 'Reliable Bulk Supply', text: 'Consistent output across large and repeat orders.' },
    { icon: 'icon-flexible-mfg.jpeg', title: 'Flexible Manufacturing Setup', text: 'In-house production backed by a supplier network.' },
    { icon: 'icon-years-exp.jpeg', title: '26+ Years Experience', text: 'Deep expertise in export-ready apparel manufacturing.' },
  ];
  const featuresHtml = `
  <section class="section">
    <div class="container">
      <div class="section-title">
        <span class="eyebrow">Why Businesses Choose Us</span>
        <h2>Reliable Manufacturing at Every Scale</h2>
      </div>
      <div class="feature-row">
        ${features.map((f) => `
        <div class="feature-item">
          <img src="${img(file, f.icon)}" alt="${f.title}" />
          <h4>${f.title}</h4>
          <p>${f.text}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`;

  const gallery = [
    { image: 'usecase-corporate.jpeg', label: 'Corporate Uniforms' },
    { image: 'usecase-retail.jpeg', label: 'Retail T-Shirts' },
    { image: 'usecase-promo.jpeg', label: 'Promotional Merchandise' },
    { image: 'usecase-industrial.jpeg', label: 'Industrial Workwear' },
    { image: 'usecase-school.jpeg', label: 'School Uniforms' },
    { image: 'usecase-medical.jpeg', label: 'Healthcare Scrubs' },
  ];
  const galleryHtml = `
  <section class="section section-soft">
    <div class="container">
      <div class="section-title">
        <span class="eyebrow">Versatile By Design</span>
        <h2>Apparel For Every Industry</h2>
      </div>
      <div class="gallery-grid">
        ${gallery.map((g) => `<div class="gallery-item"><img src="${img(file, g.image)}" alt="${g.label}" /><span>${g.label}</span></div>`).join('')}
      </div>
    </div>
  </section>`;

  const featureCards = [
    { image: 'feature-folded-tshirts.jpeg', title: 'Bulk Supply, Ready to Ship', text: 'Folded and packed cotton t-shirts across colors for wholesale fashion distribution and retail.' },
    { image: 'feature-embroidery.jpeg', title: 'Private Label & Branding', text: 'High-precision embroidery adds custom logos for private label and corporate branding needs.' },
    { image: 'feature-partnership.jpeg', title: 'Trusted Export Partner', text: 'Global trade support backed by an experienced, export-registered manufacturing team.' },
  ];
  const featureCardsHtml = `
  <section class="section">
    <div class="container">
      <div class="section-title">
        <span class="eyebrow">Built On Strong Foundations</span>
        <h2>End-to-End Manufacturing You Can Rely On</h2>
      </div>
      <div class="feature-cards">
        ${featureCards.map((f) => `
        <div class="feature-card">
          <img src="${img(file, f.image)}" alt="${f.title}" />
          <div class="body"><h3>${f.title}</h3><p>${f.text}</p></div>
        </div>`).join('')}
      </div>
    </div>
  </section>`;

  const ctaHtml = `
  <section class="section cta-banner">
    <div class="container">
      <h2>Ready to Scale Your Apparel Sourcing?</h2>
      <p>Talk to our team about bulk pricing, private labeling, and export documentation support.</p>
      <a class="btn btn-gold" href="${relHref(file, 'contact')}">Send Inquiry</a>
    </div>
  </section>`;

  const body = heroHtml + statsSection() + aboutSplit + categoriesHtml + featuresHtml + galleryHtml + featureCardsHtml + clientLogosSection(file) + certificationsSection(file) + ctaHtml;

  write(file, layout({
    file,
    title: `Corporate Apparel Manufacturer in India | ${BRAND_CAPS}`,
    description: `${BRAND} is a corporate apparel manufacturer in India with 26+ years of experience serving international B2B buyers.`,
    activeTop: 'home',
    bodyHtml: body,
  }));
})();

/* =========================================================================
   COMPANY PROFILE — About Us
   ========================================================================= */
(function aboutUsPage() {
  const file = ROUTES['about-us'];
  const info = [
    ['Established in', '2002'],
    ['Business Type', 'Sole Proprietorship'],
    ['Business Activities', 'Manufacturer'],
    ['MSME', 'Yes'],
    ['Countries exporting to', 'Austria, Brazil, Canada'],
    ['Export Turnover (3 years)', 'US$500,000 - US$1,000,000'],
    ['Certifications', 'ICE'],
    ['Countries would like to export to', 'Australia, Canada, Kiribati'],
    ['No. of employees', '101-300'],
  ];
  const body = pageBanner(file, [{ key: 'home', label: 'Home' }, { key: 'about-us', label: 'About Us' }], 'About Us') + `
  <section class="section">
    <div class="container layout">
      ${companyProfileSidebar(file, 'about-us')}
      <div class="prose">
        <h2 style="margin-top:0">${BRAND_CAPS}</h2>
        <p>With over 26 years of experience in the apparel industry, we are more than just a supplier&mdash;we are a dependable partner for businesses seeking quality, consistency, and efficiency.</p>
        <div class="info-grid">
          ${info.map(([k, v]) => `<div><b>${k}:</b> ${v}</div>`).join('')}
        </div>
        <h2>Advantages and USP</h2>
        <p>With over 26 years of experience in the apparel industry, we offer a strong combination of reliability, quality, and export-ready capabilities that make us a preferred partner for global buyers. Our operations are aligned with international standards, ensuring smooth handling of export documentation, compliance, and logistics. We maintain consistent product quality through strict control processes while offering competitive pricing that helps our clients stay profitable in global markets.</p>
        <p>Our flexible production capacity allows us to efficiently manage both small and large bulk orders, including seasonal demand fluctuations. We also provide customization options such as fabric selection, sizing, colors, labeling, and packaging to meet specific buyer requirements. Backed by a streamlined supply chain, we ensure timely deliveries and minimal operational delays.</p>
        <p>Our products are versatile and suitable for retail, corporate wear, and promotional use, making them adaptable across different markets. We prioritize transparent communication and long-term partnerships, while continuously adapting to evolving market trends to support our clients&rsquo; growth and success in international trade.</p>
        <h2>Innovations</h2>
        <p>We continuously focus on innovation across our products, operations, and processes to stay aligned with evolving market demands. Our product innovations include the development of comfortable, durable, and trend-aligned t-shirts suitable for retail, uniforms, and promotional use, with flexibility in fabrics, fits, and finishes.</p>
        <p>On the operational side, we emphasize streamlined sourcing and production practices that improve efficiency and reduce turnaround time. Our process innovations include better inventory planning, quality control systems, and adaptive manufacturing techniques that allow us to handle bulk and customized orders with consistency. We also integrate practical solutions in packaging and labeling to meet export requirements and client specifications.</p>
        <p>By combining experience with continuous improvement, we ensure our offerings remain relevant, efficient, and competitive in both domestic and international markets.</p>
        <h2>Proposals Interested In</h2>
        <p><em>Agency Request, Buying Agents, Importers</em></p>
        <p>We welcome a wide range of business proposals from foreign buyers, including agency requests, buying agents, and direct importers seeking reliable sourcing partners in India. We are open to long-term collaborations with agents representing brands or distributors in international markets, as well as partnerships with buying houses looking for consistent quality and dependable supply.</p>
        <p>Importers interested in bulk procurement of t-shirts and uniform garments for retail, corporate, or promotional use are encouraged to connect with us. We are also receptive to customized sourcing requirements, private labeling opportunities, and market-specific product development. Our goal is to build mutually beneficial relationships by offering flexible solutions, competitive pricing, and reliable delivery for global clients.</p>
      </div>
    </div>
  </section>`;
  write(file, layout({
    file,
    title: `About Us | ${BRAND_CAPS}`,
    description: `With over 26 years of experience in the apparel industry, ${BRAND} is a dependable partner for businesses seeking quality, consistency, and efficiency.`,
    activeTop: 'company-profile',
    bodyHtml: body,
  }));
})();

/* =========================================================================
   COMPANY PROFILE — Who We Are
   ========================================================================= */
(function whoWeArePage() {
  const file = ROUTES['who-we-are'];
  const body = pageBanner(file, [{ key: 'home', label: 'Home' }, { key: 'who-we-are', label: 'Who We Are' }], 'Who We Are') + `
  <section class="section">
    <div class="container layout">
      ${companyProfileSidebar(file, 'who-we-are')}
      <div class="prose">
        <p>With over 26 years of experience in the apparel industry, we have established ourselves as a reliable and quality-driven supplier of ready-made uniform garments and t-shirts.</p>
        <p>Our journey is built on consistency, adaptability, and a deep understanding of the evolving needs of clothing retailers, wholesalers, and merchandisers.</p>
        <p>Operating from Pune, we specialize in sourcing, manufacturing, and supplying high-quality t-shirts tailored to diverse business requirements. From retail collections to promotional campaigns and corporate uniforms, our products are designed to align with customer preferences and market trends.</p>
        <p>We focus on creating a seamless supply chain experience. Our operations simplify sourcing, inventory management, and distribution so our clients can concentrate on their core business strategies.</p>
        <p>Our client base includes retailers, merchandisers, and businesses that require dependable sourcing solutions. We pride ourselves on being responsive to specific client needs, including bulk orders, custom requirements, and seasonal demand variations.</p>
        <p>Quality and reliability are at the heart of our operations. Our t-shirts are known for their comfort, durability, and versatility, making them ideal for everyday wear, branding, and promotional use. We believe in building long-term partnerships by maintaining transparency, consistency, and efficient communication. As the apparel industry evolves, we remain committed to adapting to market trends and customer demands.</p>

        <h2>Our Mission</h2>
        <p>Our mission is to provide high-quality, reliable, and cost-effective apparel solutions that empower businesses to grow with confidence.</p>
        <h3>Mission Highlights</h3>
        <ul>
          <li>Deliver consistent quality in every product</li>
          <li>Ensure reliable and timely supply for all clients</li>
          <li>Support business growth through efficient sourcing</li>
          <li>Adapt to changing market trends and customer needs</li>
          <li>Build long-term relationships based on trust and transparency</li>
        </ul>

        <h2>Our Values</h2>
        <ul>
          <li><b>Quality First</b> &ndash; We prioritize product quality and consistency</li>
          <li><b>Reliability</b> &ndash; We ensure dependable supply and timely delivery</li>
          <li><b>Customer Focus</b> &ndash; We adapt to client needs and specifications</li>
          <li><b>Integrity</b> &ndash; We operate with transparency and honesty</li>
          <li><b>Efficiency</b> &ndash; We streamline processes for better service</li>
          <li><b>Long-Term Partnerships</b> &ndash; We believe in growing together</li>
        </ul>

        <h2>Key Highlights</h2>
        <ul class="check-list">
          <li>26+ years of experience in garment manufacturing and supply</li>
          <li>Specialization in ready-made uniform garments and t-shirts</li>
          <li>Based in Pune with strong distribution capabilities</li>
          <li>Trusted by retailers, wholesalers, and merchandisers</li>
          <li>Competitive pricing with consistent product quality</li>
          <li>Efficient supply chain and inventory management</li>
          <li>Flexible order handling and customization options</li>
          <li>Suitable for casual wear, uniforms, and promotions</li>
          <li>Strong focus on timely delivery</li>
          <li>Dedicated to long-term business relationships</li>
        </ul>

        <h2>Our Certificates</h2>
        <div class="cert-row" style="justify-content:flex-start;gap:40px;">
          <div><img src="${img(file, 'cert-iec.jpeg')}" alt="Import Export Code" /><div class="cert-label">Import Export Code</div></div>
          <div><img src="${img(file, 'cert-gstin.jpeg')}" alt="GST" /><div class="cert-label">GST</div></div>
          <div><img src="${img(file, 'cert-udyam.jpeg')}" alt="UDYAM Registration" /><div class="cert-label">UDYAM Registration</div></div>
        </div>

        ${blocksToHtml([{
    faqGroup: {
      title: 'FAQ',
      items: [
        { q: 'What does your company specialize in?', a: 'We specialize in manufacturing and supplying ready-made uniform garments and high-quality t-shirts.' },
        { q: 'How many years of experience do you have?', a: 'We have over 26 years of experience in the textile and apparel industry.' },
        { q: 'Where is your company located?', a: 'Our company operates from Pune, India.' },
        { q: 'Do you supply t-shirts in bulk?', a: 'Yes, we provide bulk t-shirt supply for retailers, wholesalers, and corporate clients.' },
        { q: 'What types of t-shirts do you offer?', a: 'We offer t-shirts suitable for casual wear, uniforms, branding, and promotional purposes.' },
        { q: 'Who do you work with?', a: 'We work with retailers, merchandisers, and businesses requiring sourcing solutions.' },
        { q: 'Do you offer customization?', a: 'Yes, we accommodate client-specific requirements, including sizes and styles.' },
        { q: 'How do you maintain quality?', a: 'We follow strict quality control processes during sourcing and production.' },
        { q: 'What makes your company reliable?', a: 'Our streamlined supply chain and timely delivery ensure reliability.' },
        { q: 'Can you handle large or seasonal orders?', a: 'Yes, we efficiently manage bulk and seasonal demand.' },
      ],
    },
  }])}
      </div>
    </div>
  </section>`;
  write(file, layout({
    file,
    title: `Who We Are | ${BRAND_CAPS}`,
    description: `With over 26 years of experience in the apparel industry, ${BRAND} is a reliable and quality-driven supplier of ready-made uniform garments and t-shirts.`,
    activeTop: 'company-profile',
    bodyHtml: body,
  }));
})();

/* =========================================================================
   COMPANY PROFILE — Why Choose Us
   ========================================================================= */
(function whyChooseUsPage() {
  const file = ROUTES['why-choose-us'];
  const reasons = [
    { title: 'Perfect Fit, Every Time', items: ['Multiple fit options including slim-fit and regular-fit', 'Consistent sizing across bulk orders', 'Comfortable designs for long wear', 'Suitable for both casual and professional use'] },
    { title: 'Fabric That Works for You', items: ['Breathable fabrics like cotton and cotton blends', 'Lightweight and skin-friendly materials', 'Durable construction for repeated use', 'Suitable for various climates and work environments'] },
    { title: 'Designed for Real Life', items: ['Ideal for office wear, uniforms, and casual settings', 'Versatile designs for multiple industries', 'Suitable for branding, merchandising, and promotions', 'Built for daily use and long-term wear'] },
    { title: 'Transparent & Hassle-Free', items: ['Clear size guides and product specifications', 'Smooth and efficient order handling', 'Responsive customer support', 'Easy management of bulk and repeat orders'] },
    { title: 'Reliable Supply', items: ['Strong inventory and supply chain management', 'Timely delivery across all orders', 'Capability to handle bulk and seasonal demand', 'Dependable sourcing network'] },
    { title: '26+ Years Expertise', items: ['Proven track record in garment supply', 'Deep understanding of retail/wholesale markets', 'Ability to adapt to trends and demand cycles', 'Trusted by long-term clients'] },
  ];
  const body = pageBanner(file, [{ key: 'home', label: 'Home' }, { key: 'why-choose-us', label: 'Why Choose Us' }], 'Why Choose Us') + `
  <section class="section">
    <div class="container layout">
      ${companyProfileSidebar(file, 'why-choose-us')}
      <div class="prose">
        <p>With over 26 years of experience in the apparel industry, we are more than just a supplier&mdash;we are a dependable partner for businesses seeking quality, consistency, and efficiency.</p>
        <h2>Why Choose Us</h2>
        ${reasons.map((r) => `<h3>&#10003; ${r.title}</h3><ul>${r.items.map((i) => `<li>${i}</li>`).join('')}</ul>`).join('')}
        <h2>What Sets Us Apart</h2>
        <ul class="check-list">
          <li>Consistent product quality across all orders</li>
          <li>Competitive pricing for bulk buyers</li>
          <li>Flexible solutions tailored to business needs</li>
          <li>Strong focus on long-term partnerships</li>
          <li>Efficient and simplified supply chain</li>
        </ul>
        ${blocksToHtml([{
    faqGroup: {
      title: 'FAQ &ndash; Why Choose Our Apparel',
      items: [
        { q: 'Why should I choose your apparel company?', a: `Our company offers 26+ years of experience, consistent quality, reliable supply, and efficient bulk order handling.` },
        { q: 'What makes your t-shirts different from other suppliers?', a: 'Our t-shirts provide consistent fit, breathable fabrics, durability, and versatility.' },
        { q: 'Do you offer different fitting options?', a: 'Yes, we offer slim-fit and regular-fit options.' },
        { q: 'What fabrics do you use?', a: 'We use high-quality cotton and cotton blends.' },
        { q: 'Are your garments suitable for uniforms?', a: 'Yes, they are widely used for uniforms and corporate wear.' },
        { q: 'Can your t-shirts be used for branding?', a: 'Yes, they are ideal for promotions and merchandising.' },
        { q: 'How do you ensure consistent sizing?', a: 'We follow standardized sizing and strict quality checks.' },
        { q: 'Do you handle bulk orders?', a: 'Yes, we specialize in bulk and repeat orders.' },
        { q: 'How reliable is your supply chain?', a: 'Our supply chain ensures timely delivery and availability.' },
        { q: 'Do you provide customer support?', a: 'Yes, we offer responsive support throughout the order process.' },
        { q: 'Are your products suitable for daily wear?', a: 'Yes, they are designed for comfort and durability.' },
        { q: 'Which industries do you serve?', a: 'We serve retailers, wholesalers, corporate buyers, and merchandisers.' },
        { q: 'Can you manage seasonal demand?', a: 'Yes, we efficiently handle seasonal demand.' },
        { q: 'What is your biggest strength?', a: 'Our strengths include quality, reliability, pricing, and partnerships.' },
        { q: 'Where is your company located?', a: 'We are based in Pune, India.' },
      ],
    },
  }])}
      </div>
    </div>
  </section>`;
  write(file, layout({
    file,
    title: `Why Choose Us | ${BRAND_CAPS}`,
    description: `With over 26 years of experience in the apparel industry, ${BRAND} is a dependable partner for businesses seeking quality, consistency, and efficiency.`,
    activeTop: 'company-profile',
    bodyHtml: body,
  }));
})();

/* =========================================================================
   COMPANY PROFILE — Step-by-Step Export Process
   ========================================================================= */
(function exportProcessPage() {
  const file = ROUTES['export-process'];
  const phase1 = [
    { title: '1. Requirement Understanding & Inquiry', items: ['Product type (t-shirts, uniforms, etc.)', 'Fabric, size, and fit specifications', 'Quantity and order frequency', 'Target market and usage'] },
    { title: '2. Product Selection & Sampling', items: ['Product recommendations based on needs', 'Sample development and approval', 'Quality and fit confirmation', 'Customization discussion'] },
    { title: '3. Pricing & Quotation', items: ['Transparent cost breakdown', 'Bulk pricing advantages', 'Flexible quotation based on volume', 'No hidden charges'] },
    { title: '4. Order Confirmation', items: ['Final product specifications', 'Quantity and delivery timelines', 'Payment terms agreement', 'Proforma invoice issuance'] },
  ];
  const phase2 = [
    { title: '5. Production & Quality Control', items: ['Material sourcing and production planning', 'Continuous quality checks', 'Consistency across bulk orders', 'Final inspection before dispatch'] },
    { title: '6. Packaging & Documentation', items: ['Secure and standardized packaging', 'Labeling as per international requirements', 'Invoice, packing list, and export documents', 'Compliance with export regulations'] },
    { title: '7. Shipping & Logistics', items: ['Coordination with logistics partners', 'Air or sea freight options', 'Shipment tracking and updates', 'On-time dispatch and delivery'] },
    { title: '8. Delivery & Post-Sales Support', items: ['Confirmation of shipment receipt', 'Support for any queries or issues', 'Assistance with repeat orders', 'Long-term partnership support'] },
  ];
  const body = pageBanner(file, [{ key: 'home', label: 'Home' }, { key: 'export-process', label: 'Step-by-Step Export Process' }], 'Step-by-Step Export Process') + `
  <section class="section">
    <div class="container layout">
      ${companyProfileSidebar(file, 'export-process')}
      <div class="prose">
        <h2 style="margin-top:0">${BRAND} &ndash; Reliable Apparel Export Solutions</h2>
        <p>At ${BRAND}, we follow a structured and transparent export process to ensure smooth international transactions, consistent product quality, and timely delivery. Our export workflow is designed to simplify complexities for our clients, allowing them to focus on growing their business while we handle sourcing, documentation, and logistics.</p>
        <h2>Phase 1: Planning &amp; Confirmation</h2>
        ${phase1.map((s) => `<h3>${s.title}</h3><ul>${s.items.map((i) => `<li>${i}</li>`).join('')}</ul>`).join('')}
        <h2>Phase 2: Execution &amp; Fulfillment</h2>
        ${phase2.map((s) => `<h3>${s.title}</h3><ul>${s.items.map((i) => `<li>${i}</li>`).join('')}</ul>`).join('')}
        <h2>Key Benefits of Our Export Process</h2>
        <ul class="check-list">
          <li>Smooth and transparent end-to-end workflow</li>
          <li>Reliable quality control and consistency</li>
          <li>Timely delivery with trusted logistics partners</li>
          <li>Clear communication at every stage</li>
          <li>Scalable solutions for bulk and repeat orders</li>
        </ul>
        ${blocksToHtml([{
    faqGroup: {
      title: 'FAQ &ndash; Export Process',
      items: [
        { q: `What is the export process followed by ${BRAND}?`, a: 'We follow a structured process including requirement analysis, sampling, pricing, order confirmation, production, quality checks, documentation, shipping, and post-sales support.' },
        { q: 'Do you provide samples before bulk export orders?', a: 'Yes, we provide samples for approval to ensure quality and specifications meet your requirements.' },
        { q: 'How do you ensure quality in export orders?', a: 'We implement strict quality control at every stage, including final inspection before shipment.' },
        { q: 'What types of garments do you export?', a: 'We export ready-made uniform garments and t-shirts for retail, corporate, and promotional use.' },
        { q: 'Do you handle export documentation?', a: 'Yes, we manage all export documentation including invoices and packing lists.' },
        { q: 'What shipping options are available?', a: 'We offer both air and sea freight options based on requirements.' },
        { q: 'How long does the export process take?', a: 'Timelines vary depending on order size and destination.' },
        { q: 'Can you handle large bulk export orders?', a: 'Yes, we specialize in managing large-scale orders efficiently.' },
        { q: 'Do you offer support after delivery?', a: 'Yes, we provide post-sales support and assistance for repeat orders.' },
        { q: `Why choose ${BRAND} for garment export?`, a: 'With 26+ years of experience and a reliable supply chain, we are a trusted export partner.' },
      ],
    },
  }])}
      </div>
    </div>
  </section>`;
  write(file, layout({
    file,
    title: `Step-by-Step Export Process | ${BRAND_CAPS}`,
    description: `At ${BRAND}, we follow a structured and transparent export process to ensure smooth international transactions, consistent product quality, and timely delivery.`,
    activeTop: 'company-profile',
    bodyHtml: body,
  }));
})();

/* =========================================================================
   COMPANY PROFILE — Sourcing & Procurement
   ========================================================================= */
(function sourcingPage() {
  const file = ROUTES.sourcing;
  const process = [
    ['Requirement Analysis', 'Understanding product type, quantity, fabric preferences, and usage.'],
    ['Supplier Selection', 'Sourcing from trusted and verified manufacturers.'],
    ['Product Evaluation', 'Assessing quality, fit, durability, and consistency.'],
    ['Cost Optimization', 'Negotiating competitive pricing while maintaining quality.'],
    ['Order Management', 'Handling order placement, tracking, and coordination.'],
    ['Inventory Control', 'Maintaining efficient inventory systems for quick turnaround.'],
    ['Delivery & Logistics', 'Ensuring timely delivery and smooth logistics coordination.'],
  ];
  const body = pageBanner(file, [{ key: 'home', label: 'Home' }, { key: 'sourcing', label: 'Sourcing & Procurement' }], 'Sourcing & Procurement') + `
  <section class="section">
    <div class="container layout">
      ${companyProfileSidebar(file, 'sourcing')}
      <div class="prose">
        <h2 style="margin-top:0">${BRAND} &ndash; Efficient Apparel Sourcing &amp; Procurement Solutions</h2>
        <p>At ${BRAND}, sourcing and procurement are at the core of our operations. With over 26 years of experience in the apparel industry, we have developed a reliable and efficient system for acquiring high-quality garments that meet diverse business needs.</p>
        <p>We specialize in sourcing ready-made uniform garments and t-shirts for retailers, wholesalers, and merchandisers. Our procurement strategy is built on strong supplier relationships, quality control, and streamlined logistics.</p>
        <h2>Our Approach to Sourcing</h2>
        <p>Our sourcing process ensures every product meets high standards of quality, durability, and comfort. We collaborate with trusted manufacturers to maintain consistency across all orders.</p>
        <p>By evaluating materials, production methods, and finishing processes, we ensure reliable and competitively priced garments.</p>
        <h2>Procurement Process</h2>
        <ol style="padding-left:1.2em;color:var(--muted);">${process.map(([t, d]) => `<li style="margin-bottom:10px;"><b style="color:var(--navy);">${t}</b> &ndash; ${d}</li>`).join('')}</ol>
        <h2>Why Our Sourcing &amp; Procurement Stands Out</h2>
        <ul class="check-list">
          <li>Access to a wide network of trusted suppliers</li>
          <li>Consistent quality across all batches</li>
          <li>Competitive pricing for bulk and repeat orders</li>
          <li>Efficient inventory and supply chain management</li>
          <li>Adaptability to seasonal and market trends</li>
          <li>Reliable and timely delivery</li>
        </ul>
        <h2>Benefits for Our Clients</h2>
        <ul class="check-list">
          <li>Reduced sourcing complexity and time</li>
          <li>Assured product quality and consistency</li>
          <li>Scalable solutions for growing businesses</li>
          <li>Flexible order handling</li>
          <li>Strong support for retail and wholesale operations</li>
        </ul>
        <h2>Built for Long-Term Partnerships</h2>
        <p>We believe sourcing and procurement go beyond transactions. Our goal is to build long-term partnerships by delivering consistent value, reliability, and transparency.</p>
        <ul class="check-list">
          <li>26+ years of experience in apparel sourcing</li>
          <li>Specialization in t-shirts and uniform garments</li>
          <li>Strong supplier network and connections</li>
          <li>Reliable quality control and consistency</li>
          <li>Competitive pricing and cost optimization</li>
          <li>Timely delivery and dependable supply chain</li>
        </ul>
        ${blocksToHtml([{
    faqGroup: {
      title: 'FAQ &ndash; Sourcing & Procurement',
      items: [
        { q: `What sourcing and procurement services does ${BRAND} offer?`, a: 'We provide end-to-end sourcing and procurement services including supplier selection, quality checks, and delivery.' },
        { q: 'How do you ensure product quality?', a: 'We work with trusted suppliers and conduct strict quality evaluations.' },
        { q: 'Do you offer bulk sourcing solutions?', a: 'Yes, we specialize in bulk sourcing for various clients.' },
        { q: 'What types of garments do you source?', a: 'We source ready-made t-shirts and uniform garments.' },
        { q: 'How do you select suppliers?', a: 'Suppliers are selected based on quality, reliability, and performance.' },
        { q: 'Can you handle recurring procurement needs?', a: 'Yes, we support ongoing procurement requirements.' },
        { q: 'How do you manage costs?', a: 'We optimize costs through negotiation and efficient sourcing strategies.' },
        { q: 'Do you provide customized sourcing?', a: 'Yes, we adapt sourcing based on client requirements.' },
        { q: 'How reliable is your supply chain?', a: 'Our supply chain ensures timely delivery and product availability.' },
        { q: `Why choose ${BRAND}?`, a: 'We offer 26+ years of experience, strong networks, and efficient processes.' },
      ],
    },
  }])}
      </div>
    </div>
  </section>`;
  write(file, layout({
    file,
    title: `Sourcing & Procurement | ${BRAND_CAPS}`,
    description: `At ${BRAND}, sourcing and procurement are at the core of our operations, built on strong supplier relationships, quality control, and streamlined logistics.`,
    activeTop: 'company-profile',
    bodyHtml: body,
  }));
})();

/* =========================================================================
   COMPANY PROFILE — Sustainability & CSR
   ========================================================================= */
(function sustainabilityPage() {
  const file = ROUTES.sustainability;
  const body = pageBanner(file, [{ key: 'home', label: 'Home' }, { key: 'sustainability', label: 'Sustainability & CSR' }], 'Sustainability & Corporate Social Responsibility') + `
  <section class="section">
    <div class="container layout">
      ${companyProfileSidebar(file, 'sustainability')}
      <div class="prose">
        <h2 style="margin-top:0">${BRAND} &ndash; Responsible Apparel Sourcing for a Better Future</h2>
        <p>At ${BRAND}, we believe that business success should go hand in hand with environmental responsibility and social accountability. With over 26 years of experience in the apparel industry, we are committed to adopting sustainable practices and ethical sourcing methods.</p>
        <p>Our approach focuses on responsible sourcing, efficient resource management, and ethical business practices that align with industry standards and global expectations.</p>
        <h2>Our Approach to Sustainability</h2>
        <p>Sustainability is embedded in our sourcing and procurement processes. We aim to minimize environmental impact while maintaining product quality and efficiency.</p>
        <p>We prioritize durable garments and efficient processes that help reduce waste and promote long-term use.</p>
        <h2>Ethical Sourcing &amp; Responsible Partnerships</h2>
        <p>We collaborate with suppliers who follow ethical manufacturing practices and comply with industry standards, ensuring fair and safe working conditions. Our partnerships are built on transparency, accountability, and long-term reliability.</p>
        <h2>Efficient Resource Management</h2>
        <ul class="check-list">
          <li>Efficient inventory management to minimize overstock and waste</li>
          <li>Streamlined logistics to reduce unnecessary transportation</li>
          <li>Focus on durable and long-lasting garments</li>
          <li>Reduction of operational inefficiencies</li>
        </ul>
        <h2>Commitment to Social Responsibility</h2>
        <p>We strive to promote fairness, integrity, and responsible business practices while contributing positively to society and industry growth.</p>
        <h2>Continuous Improvement</h2>
        <p>Sustainability is an ongoing process. We continuously evaluate and improve our practices to align with evolving industry and environmental standards.</p>
        <h2>Key Sustainability Highlights</h2>
        <ul class="check-list">
          <li>Commitment to responsible and ethical sourcing</li>
          <li>Focus on durable, long-lasting apparel products</li>
          <li>Efficient supply chain and resource management</li>
          <li>Collaboration with trusted and compliant suppliers</li>
          <li>Reduction of waste through optimized operations</li>
          <li>Continuous improvement in sustainable practices</li>
          <li>Transparent and ethical business approach</li>
        </ul>
        <h2>Why Sustainability Matters to Us</h2>
        <p>We understand that businesses and consumers are increasingly conscious of environmental and social impact. Our goal is to support clients in achieving their sustainability objectives while contributing to a responsible apparel industry.</p>
        ${blocksToHtml([{
    faqGroup: {
      title: 'FAQ &ndash; Sustainability & CSR',
      items: [
        { q: `What is ${BRAND}'s approach to sustainability?`, a: 'We focus on responsible sourcing, efficient resource management, and ethical practices.' },
        { q: 'Do you use sustainable materials?', a: 'We prioritize durable materials and continuously explore sustainable options.' },
        { q: 'How do you ensure ethical sourcing?', a: 'We work with trusted suppliers who follow fair labor practices.' },
        { q: 'What steps do you take to reduce waste?', a: 'We optimize inventory, streamline logistics, and focus on long-lasting products.' },
        { q: 'Are your suppliers compliant?', a: 'Yes, our suppliers meet quality and ethical standards.' },
        { q: 'How does your supply chain support sustainability?', a: 'Our efficient supply chain minimizes resource usage and improves logistics.' },
        { q: 'Do you support long-term sustainability goals?', a: 'Yes, we are committed to continuous improvement.' },
        { q: 'Why is sustainability important in apparel?', a: 'It reduces environmental impact and promotes ethical practices.' },
        { q: 'How do you contribute to CSR?', a: 'We follow ethical practices and maintain transparency in operations.' },
        { q: 'Can clients rely on responsible sourcing?', a: 'Yes, we provide reliable and responsible sourcing solutions.' },
      ],
    },
  }])}
      </div>
    </div>
  </section>`;
  write(file, layout({
    file,
    title: `Sustainability & Corporate Social Responsibility | ${BRAND_CAPS}`,
    description: `At ${BRAND}, we are committed to adopting sustainable practices and ethical sourcing methods across our apparel manufacturing operations.`,
    activeTop: 'company-profile',
    bodyHtml: body,
  }));
})();

/* =========================================================================
   OUR PRODUCTS
   ========================================================================= */
const PRODUCTS = [
  { name: 'Men’s Classic White Formal Shirt with Pocket – Regular Fit', image: 'product-formal-shirt-white-pocket.jpeg', cats: ['prod-formal-shirts'] },
  { name: 'Men’s Premium Navy Blue 3-Piece Suit – Blazer, Waistcoat & Trousers', image: 'product-navy-suit-a.jpeg', cats: ['prod-blazers'] },
  { name: 'Men’s Classic Formal Slim-Fit Trousers – Business & Casual Wear (Multiple Colors)', image: 'product-formal-trousers-multicolor.jpeg', cats: ['prod-trousers'] },
  { name: 'Men’s Classic Light Blue Formal Shirt with Pocket – Regular Fit', image: 'product-formal-shirt-lightblue-pocket.jpeg', cats: ['prod-formal-shirts'] },
  { name: 'Men’s Light Blue Formal Shirt – Slim Fit Long Sleeve Office Wear', image: 'product-formal-shirt-lightblue-slim.jpeg', cats: ['prod-formal-shirts'] },
  { name: 'Dual-Tone Royal Blue Polo T-Shirt – Stylish Comfort for Work & Casual Wear', image: 'product-polo-dualtone-royalblue.jpeg', cats: ['prod-tshirts'] },
  { name: 'Classic Royal Blue Polo T-Shirt – Premium Comfort & Style', image: 'product-polo-royalblue.jpeg', cats: ['prod-tshirts'] },
  { name: 'Classic White Formal Shirt – Slim Fit with Long Sleeves & Front Pocket', image: 'product-formal-shirt-white-slim.jpeg', cats: ['prod-formal-shirts'] },
  { name: 'Men’s Sky Blue Slim Fit Blazer – Lightweight Formal & Casual Jacket', image: 'product-blazer-skyblue.jpeg', cats: ['prod-blazers'] },
  { name: 'Men’s Classic Navy Blue 3-Piece Slim Fit Suit with Double-Breasted Waistcoat', image: 'product-navy-suit-b.jpeg', cats: ['prod-formal-shirts'] },
  { name: 'Men’s Classic Teal Polo T-Shirt | Casual & Smart Wear', image: 'product-polo-teal.jpeg', cats: ['prod-tshirts'] },
  { name: 'Men’s Grey Slim-Fit Formal Trousers – Classic Business & Office Wear', image: 'product-trousers-grey.jpeg', cats: ['prod-trousers'] },
  { name: 'Men’s Light Blue Linen Blend Blazer – Casual & Formal Slim Fit Jacket', image: 'product-blazer-linen-lightblue.jpeg', cats: ['prod-blazers'] },
  { name: 'Men’s Light Blue Slim Fit Blazer | Casual & Formal Wear', image: 'product-blazer-lightblue.jpeg', cats: ['prod-blazers'] },
  { name: 'Round Neck T Shirt', image: 'product-round-neck-tshirt.png', cats: ['prod-tshirts'] },
];

const CATEGORY_LIST = [
  { key: 'prod-tshirts', label: "Men's T-Shirts for Bulk & Retail Buying" },
  { key: 'prod-formal-shirts', label: "Men's Formal Shirts for Office & Event Sourcing" },
  { key: 'prod-blazers', label: "Men's Slim Fit Blazers for Formal & Smart Wear" },
  { key: 'prod-trousers', label: "Men's Slim Fit Trousers for Businesswear Sourcing" },
];

function productSidebar(file, activeKey) {
  return `<aside class="sidebar">
    <h4>Categories</h4>
    <ul class="cat-list">
      <li><a class="${!activeKey ? 'active' : ''}" href="${relHref(file, 'products')}">Our Products</a></li>
      ${CATEGORY_LIST.map((c) => `<li><a class="${c.key === activeKey ? 'active' : ''}" href="${relHref(file, c.key)}">${c.label}</a></li>`).join('')}
    </ul>
  </aside>`;
}

function productToolbar() {
  return `<div class="product-toolbar">
    <select disabled><option>Default</option><option>A-Z alphabetical order</option><option>Z-A alphabetical order</option><option>Price (Low &gt; High)</option><option>Price (High &gt; Low)</option><option>New items</option></select>
  </div>`;
}

function productGrid(file, list) {
  return `<div class="product-grid">
    ${list.map((p) => `
    <div class="product-card">
      <div class="thumb"><img src="${img(file, p.image)}" alt="${p.name}" loading="lazy" /></div>
      <div class="body">
        <h3>${p.name}</h3>
        <a class="btn" href="${relHref(file, 'contact')}">Send Inquiry</a>
      </div>
    </div>`).join('')}
  </div>`;
}

const PRODUCTS_INTRO = `Managing multiple apparel categories across different vendors can quickly become complex. Working with a single apparel manufacturer helps businesses simplify sourcing, maintain consistency, and scale production more efficiently across product lines.`;
const PRODUCTS_INFO_BLOCKS = [
  { title: 'Streamlined Bulk Apparel Sourcing', p: 'Retailers, wholesalers, and distributors often prefer consolidated sourcing to reduce operational friction. By combining multiple product categories under one supplier, businesses can better control timelines, inventory flow, and overall procurement planning.', items: ['Multi-category supply including shirts, t-shirts, blazers, and trousers', 'Coordinated production schedules for better inventory management', 'Support for both recurring and seasonal bulk requirements'] },
  { title: 'Private Label & Brand Flexibility', p: 'Private label manufacturing allows businesses to create consistent brand identity across their product range. From basic labeling to packaging formats, customization options are structured to support retail and distribution needs.', items: ['Custom labels, tags, and packaging formats', 'Flexible batch sizes for testing and scaling', 'Options aligned with wholesale and retail presentation'] },
  { title: 'Consistent Production & Quality Control', p: 'Consistency across batches is essential for large-scale apparel sourcing. Standard quality processes ensure that fit, fabric, and finish remain uniform across every order.', items: ['Pre-production sampling and approvals', 'In-line production monitoring', 'Final inspection before dispatch'] },
  { title: 'Order Planning & Delivery Support', p: 'Clear planning helps businesses align production with demand cycles. Defined timelines and documentation support make it easier to manage both domestic and export orders.', items: ['Transparent MOQ and production timelines', 'Structured batch planning for bulk orders', 'Support for export documentation and logistics coordination'] },
];

function infoBlocksHtml(intro, blocks) {
  return `<div class="prose" style="margin-top:48px;">
    <p>${intro}</p>
    ${blocks.map((b) => `<h2>${b.title}</h2><p>${b.p}</p><ul>${b.items.map((i) => `<li>${i}</li>`).join('')}</ul>`).join('')}
  </div>`;
}

(function productsIndexPage() {
  const file = ROUTES.products;
  const body = pageBanner(file, [{ key: 'home', label: 'Home' }, { key: 'products', label: 'Our Products' }], 'Our Products') + `
  <section class="section">
    <div class="container">
      ${productToolbar()}
      <div class="layout">
        ${productSidebar(file, null)}
        <div>
          ${productGrid(file, PRODUCTS)}
          ${infoBlocksHtml(PRODUCTS_INTRO, PRODUCTS_INFO_BLOCKS)}
        </div>
      </div>
    </div>
  </section>`;
  write(file, layout({
    file,
    title: `B2B Apparel Manufacturer & Private Label Clothing Supplier for Bulk Orders | ${BRAND_CAPS}`,
    description: `${BRAND} supplies men's t-shirts, formal shirts, blazers, and trousers for bulk and private-label B2B sourcing.`,
    activeTop: 'products',
    bodyHtml: body,
  }));
})();

const CATEGORY_CONTENT = {
  'prod-tshirts': {
    title: "Men's T-Shirts for Bulk & Retail Buying",
    metaTitle: "Men's T-Shirts | Everyday Casual Range",
    intro: 'Men’s t-shirts remain one of the highest-volume categories for distributors and retailers. Consistent fabric quality, reliable sizing, and repeatable production are key factors when sourcing in bulk.',
    blocks: [
      { title: 'Bulk Supply for High-Demand Products', p: 'T-shirts are fast-moving products, requiring stable supply and predictable lead times. Businesses look for suppliers who can support ongoing replenishment without compromising quality.', items: ['Regular production batches for continuous availability', 'Suitable for retail chains and wholesale distribution', 'Scalable volumes based on demand cycles'] },
      { title: 'Private Label T-Shirt Manufacturing', p: 'Private label options help brands differentiate in a competitive market. Customization is kept practical to ensure production efficiency while maintaining brand identity.', items: ['Printed or woven label options', 'Multiple packaging formats for distribution needs', 'Flexible order sizes for different business stages'] },
      { title: 'Fabric Quality & Color Consistency', p: 'Material selection and dye consistency directly impact product appeal and repeat sales. Controlled sourcing and batch tracking help maintain uniformity across orders.', items: ['Ring-spun cotton and blended fabric options', 'Controlled dye lots for consistent color output', 'Quality checks across production stages'] },
      { title: 'Efficient Order Handling', p: 'Well-structured order planning ensures smooth execution from production to delivery, especially for large-volume requirements.', items: ['Defined MOQ tiers for bulk ordering', 'Clear lead-time estimates', 'Export-ready packaging and shipping coordination'] },
    ],
  },
  'prod-formal-shirts': {
    title: "Men's Formal Shirts for Office & Event Sourcing",
    metaTitle: "Men’s Formal Shirts Manufacturer for Bulk & Corporate Supply",
    intro: 'Formal shirts play a critical role in corporate and uniform programs where consistency and presentation matter. Buyers prioritize fit accuracy, finish quality, and repeatability across bulk orders.',
    blocks: [
      { title: 'Reliable Production for Corporate Supply', p: 'Businesses sourcing formal shirts require dependable production that aligns with ongoing demand and event timelines. Structured manufacturing helps maintain consistency across batches.', items: ['Suitable for corporate uniforms and retail distribution', 'Defined production timelines for bulk orders', 'Scalable manufacturing capacity'] },
      { title: 'Customization & Private Label Options', p: 'Customization allows businesses to maintain a consistent brand presence across their apparel range while meeting specific corporate requirements.', items: ['Custom collars, labels, and branding elements', 'Options for corporate identity alignment', 'Flexible batch sizes for different requirements'] },
      { title: 'Quality Control & Finish Consistency', p: 'Uniformity in size, stitching, and finish is essential for minimizing returns and maintaining customer satisfaction.', items: ['Sample approval before bulk production', 'Batch-level inspection processes', 'Focus on fit consistency and finish quality'] },
      { title: 'Packaging & Delivery Planning', p: 'Proper packaging and delivery coordination ensure products reach their destination in ready-to-sell condition.', items: ['Retail and bulk packaging options', 'Clear MOQ and lead-time structure', 'Export documentation support when required'] },
    ],
  },
  'prod-blazers': {
    title: "Men's Slim Fit Blazers for Formal & Smart Wear",
    metaTitle: 'Slim Fit Blazers Manufacturer for Wholesale & Export Supply',
    intro: 'Slim fit blazers require precision in tailoring and consistency in construction, making supplier selection critical for wholesalers and exporters.',
    blocks: [
      { title: 'Bulk Blazer Supply for Wholesale Markets', p: 'Wholesalers need reliable suppliers who can deliver consistent styles and maintain stock availability across seasons.', items: ['Production aligned with wholesale demand cycles', 'Suitable for retail chains and export markets', 'Structured batch planning for seasonal requirements'] },
      { title: 'Private Label & Custom Tailoring', p: 'Private label options allow brands to differentiate while maintaining control over product positioning and presentation.', items: ['Custom labels and branding options', 'Selection of lining and finishing details', 'Packaging suited for retail display'] },
      { title: 'Fit Accuracy & Quality Assurance', p: 'Blazers demand precise fit and durable construction. Consistent pattern grading and quality checks help maintain standards across production runs.', items: ['Standardized pattern grading', 'Fit sampling before production', 'Quality checks throughout manufacturing'] },
      { title: 'Order Coordination & Delivery', p: 'Efficient coordination ensures timely delivery and smooth handling of bulk and export orders.', items: ['Defined MOQ and production timelines', 'Export-ready packaging options', 'Documentation and logistics support'] },
    ],
  },
  'prod-trousers': {
    title: "Men's Slim Fit Trousers for Businesswear Sourcing",
    metaTitle: 'Men’s Slim Fit Trousers Manufacturer for Bulk B2B Supply',
    intro: 'Slim fit trousers require accurate sizing and consistent patterning to ensure uniformity across large orders. Importers and retailers focus on reliability and repeatability when selecting suppliers.',
    blocks: [
      { title: 'Precision Manufacturing for Bulk Orders', p: 'Consistent production processes help maintain sizing accuracy and reduce variations across batches, which is critical for retail success.', items: ['Suitable for retail and wholesale distribution', 'Scalable production for bulk requirements', 'Structured manufacturing processes'] },
      { title: 'Private Label & Customization', p: 'Customization options allow businesses to align products with their brand while maintaining production efficiency.', items: ['Custom size charts and labeling options', 'Flexible packaging formats', 'Adaptable batch sizes'] },
      { title: 'Quality Control & Size Consistency', p: 'Maintaining consistent sizing across batches helps reduce returns and improve customer satisfaction.', items: ['Dimensional checks during production', 'Final inspection before dispatch', 'Controlled processes to reduce variation'] },
      { title: 'Order Planning & Logistics', p: 'Proper planning ensures efficient execution from production to delivery, especially for international orders.', items: ['Clear MOQ and lead-time structure', 'Export-ready packing solutions', 'Coordination for shipping and documentation'] },
    ],
  },
};

CATEGORY_LIST.forEach((cat) => {
  const file = ROUTES[cat.key];
  const content = CATEGORY_CONTENT[cat.key];
  const list = PRODUCTS.filter((p) => p.cats.includes(cat.key));
  const body = pageBanner(file, [{ key: 'home', label: 'Home' }, { key: 'products', label: 'Our Products' }, { key: cat.key, label: content.title }], content.title) + `
  <section class="section">
    <div class="container">
      ${productToolbar()}
      <div class="layout">
        ${productSidebar(file, cat.key)}
        <div>
          ${productGrid(file, list)}
          ${infoBlocksHtml(content.intro, content.blocks)}
        </div>
      </div>
    </div>
  </section>`;
  write(file, layout({
    file,
    title: `${content.metaTitle} | ${BRAND_CAPS}`,
    description: content.intro,
    activeTop: 'products',
    bodyHtml: body,
  }));
});

/* =========================================================================
   BLOGS
   ========================================================================= */
const BLOGS = [
  {
    key: 'blog-garment-exporter', image: 'blog-garment-exporter-factors.png', date: '15 Apr 2026',
    title: 'Top 10 Factors to Consider When Choosing a Garment Exporter',
    excerpt: 'Selecting the right garment exporter is one of the most important decisions for importers, retailers, and distributors.',
    intro: `Selecting the right garment exporter is one of the most important decisions for importers, retailers, and distributors. The right partner ensures consistent quality, timely delivery, and competitive pricing&mdash;while the wrong choice can lead to delays, losses, and reputational damage.`,
    body: [
      { p: `With India being a global hub for textile manufacturing, many buyers rely on a trusted garment exporter in India to meet their sourcing needs. This guide will help you evaluate exporters effectively and make informed decisions.` },
      { h2: 'Why Choosing the Right Garment Exporter Matters' },
      { p: 'Your exporter is more than just a supplier&mdash;they are a long-term business partner who directly influences your product quality, supply chain efficiency, and overall business performance.' },
      { p: 'A reliable exporter ensures consistent product quality, smooth operations, timely deliveries, cost efficiency, and scalability as your business grows. Choosing the right garment exporter in India can give your business a strong competitive advantage in the global market.' },
      { h2: 'Top 10 Factors to Evaluate a Garment Exporter' },
      { h3: '1. Experience and Industry Expertise' },
      { p: 'Experience reflects reliability. Check years in the industry, product specialization, and knowledge of international markets. An experienced exporter understands compliance and buyer expectations.' },
      { h3: '2. Product Quality and Consistency' },
      { p: 'Evaluate fabric durability, stitching quality, and consistency across batches. Always request samples before placing bulk orders.' },
      { h3: '3. Certifications and Compliance' },
      { p: 'Ensure the exporter meets global standards such as ISO, OEKO-TEX, GOTS, and SEDEX. Certifications guarantee safety, sustainability, and credibility.' },
      { h3: '4. Production Capacity and Scalability' },
      { p: 'Check production capacity, scalability during peak seasons, and lead times. A reliable supplier can grow with your business needs.' },
      { h3: '5. Customization Capabilities' },
      { p: 'Look for options like logo printing, custom designs, colors, and private labeling to match your brand identity.' },
      { h3: '6. Pricing and Cost Transparency' },
      { p: 'Ensure clear pricing structures with no hidden costs. Focus on value for money rather than just the lowest price.' },
      { h3: '7. Communication and Responsiveness' },
      { p: 'Choose exporters who respond quickly, communicate clearly, and are proactive in resolving issues.' },
      { h3: '8. Logistics and Delivery Capabilities' },
      { p: 'Evaluate their experience with shipping, documentation, and on-time delivery. Efficient logistics reduce delays and risks.' },
      { h3: '9. Reputation and Client Feedback' },
      { p: 'Check testimonials, references, and reviews. A reputable garment exporter is more likely to deliver consistent results.' },
      { h3: '10. Ethical Practices and Sustainability' },
      { p: 'Ensure the exporter follows ethical labor practices and sustainable production methods, especially if your brand focuses on responsible sourcing.' },
      { h2: 'Quick Checklist for Buyers' },
      { check: ['Verified experience and export history', 'Approved product samples', 'Required certifications in place', 'Transparent pricing structure', 'Strong communication and support', 'Reliable logistics and delivery timelines'] },
      { h2: 'Common Mistakes to Avoid' },
      { p: 'Many buyers make avoidable mistakes when selecting exporters, which can lead to operational challenges. Avoid choosing suppliers based only on price, skipping sample checks, ignoring certifications, failing to verify production capacity, or neglecting communication quality. These errors can result in delays and financial losses.' },
      { faqGroup: { title: 'FAQs', items: [
        { q: 'What is the most important factor when choosing a garment exporter?', a: 'Quality and reliability are the most important factors, followed by pricing and scalability.' },
        { q: 'Why choose a garment exporter from India?', a: 'India offers high-quality textiles, competitive pricing, skilled labor, and strong export infrastructure.' },
        { q: 'How can I verify a supplier’s credibility?', a: 'Check certifications, request samples, review feedback, and confirm export experience.' },
        { q: 'What is the typical MOQ for garment exports?', a: 'MOQ typically ranges from 500–2000 units depending on product type.' },
        { q: 'Can exporters handle customized clothing orders?', a: 'Yes, most exporters provide customization including branding, designs, and packaging.' },
        { q: 'How long does delivery take for bulk orders?', a: 'Delivery usually takes 4–8 weeks depending on production and shipping methods.' },
      ] } },
      { p: `Choosing the right garment exporter is a strategic decision that directly impacts your business success. By carefully evaluating factors such as quality, certifications, scalability, and communication, you can build a strong and reliable supply chain. India continues to be a leading sourcing destination, offering the ideal balance of affordability and quality. By partnering with a trusted garment exporter in India like ${BRAND}, you can ensure long-term growth and consistent performance in the global apparel market.` },
    ],
  },
  {
    key: 'blog-import-guide', image: 'blog-import-apparel-guide.png', date: '15 Apr 2026',
    title: 'How to Start Importing Apparel from India: A Step-by-Step Guide',
    excerpt: 'India is one of the world’s largest exporters of textiles and garments, making it a top destination for businesses looking to source high-quality apparel.',
    intro: 'India is one of the world’s largest exporters of textiles and garments, making it a top destination for businesses looking to source high-quality apparel at competitive prices. Whether you are a startup, retailer, or distributor, importing clothing from India can be a highly profitable venture&mdash;if done correctly.',
    body: [
      { p: `This step-by-step guide will help new buyers understand the process, minimize risks, and build a reliable supply chain with a trusted apparel exporter in India.` },
      { h2: 'Why Import Clothing from India?' },
      { p: 'Before starting the import process, it’s important to understand why India is a preferred sourcing hub for apparel worldwide. The country offers a strong combination of quality, affordability, and manufacturing expertise.' },
      { p: 'Key advantages include cost-effective production, access to high-quality fabrics such as cotton and sustainable textiles, a skilled workforce, and a wide product range including t-shirts, uniforms, fashion wear, and workwear. These benefits make it easier for businesses to import clothing from India while maintaining strong profit margins and consistent product quality.' },
      { h2: 'Step-by-Step Process to Import Apparel from India' },
      { h3: 'Step 1: Define Your Product Requirements' },
      { p: 'Clearly identify the type of apparel you want to import. Consider product category, fabric type, quantity, budget, and target market. Having well-defined requirements helps you communicate effectively with suppliers.' },
      { h3: 'Step 2: Research and Find Reliable Suppliers' },
      { p: 'Search for a trustworthy apparel exporter through B2B platforms, trade fairs, or direct websites. Evaluate experience, certifications, product range, and customer reviews before shortlisting suppliers.' },
      { h3: 'Step 3: Request Samples and Quality Check' },
      { p: 'Always request product samples before placing bulk orders. Check fabric quality, stitching, finishing, color accuracy, and sizing consistency to ensure standards are met.' },
      { h3: 'Step 4: Understand Pricing and Negotiate Terms' },
      { p: 'Discuss pricing structure, MOQ, bulk discounts, and payment terms. A reliable supplier will offer transparent pricing and flexible options suited to your business needs.' },
      { h3: 'Step 5: Verify Certifications and Compliance' },
      { p: 'Ensure the supplier meets international standards such as ISO, OEKO-TEX, GOTS, and SEDEX. Working with a certified exporter reduces compliance risks in global markets.' },
      { h3: 'Step 6: Finalize Order and Production Timeline' },
      { p: 'Confirm product specifications, quantities, delivery timelines, and packaging details. Document everything in a purchase order or agreement.' },
      { h3: 'Step 7: Manage Logistics and Shipping' },
      { p: 'Choose between sea freight for cost efficiency or air freight for faster delivery. Ensure all required documents such as invoice, packing list, and bill of lading are prepared correctly.' },
      { h3: 'Step 8: Customs Clearance and Delivery' },
      { p: 'Clear customs using a licensed broker, pay duties and taxes, and arrange final delivery to your warehouse. Understanding import regulations helps avoid delays.' },
      { h2: 'Common Challenges and How to Avoid Them' },
      { p: 'New buyers often face challenges when importing apparel. These can include quality issues, delayed shipments, communication gaps, and hidden costs. To avoid these risks, always approve samples before production, set clear timelines, maintain strong communication with suppliers, and clarify all costs including shipping and duties upfront.' },
      { h2: 'Tips for Building a Long-Term Supplier Relationship' },
      { p: 'A successful apparel import business depends on strong and reliable supplier relationships. Building trust over time leads to better pricing, priority service, and smoother operations. Start with smaller orders, maintain clear communication, provide feedback, and work closely with your supplier to improve processes.' },
      { faqGroup: { title: 'FAQs', items: [
        { q: 'Is it profitable to import clothing from India?', a: 'Yes, due to low production costs and high-quality products, importing apparel from India can offer strong profit margins.' },
        { q: 'What is the minimum order quantity (MOQ)?', a: 'MOQ typically ranges from 500 to 2000 units depending on the product and supplier.' },
        { q: 'How do I find a reliable apparel exporter in India?', a: 'Use B2B platforms, verify certifications, request samples, and review export experience before finalizing a supplier.' },
        { q: 'What are the shipping options available?', a: 'You can choose between sea freight for cost savings and air freight for faster delivery.' },
        { q: 'How long does the import process take?', a: 'Production and delivery usually take 4–8 weeks depending on order size and shipping method.' },
        { q: 'Do I need an import license?', a: 'This depends on your country’s regulations. Check with local authorities or a customs broker for accurate information.' },
      ] } },
      { p: `Importing apparel from India is a strategic move for businesses looking to combine affordability, quality, and scalability. By following a structured process&mdash;from supplier research to logistics&mdash;you can minimize risks and maximize returns. Working with a reliable partner like ${BRAND} ensures smooth operations, consistent quality, and timely delivery.` },
    ],
  },
  {
    key: 'blog-hospital-uniforms', image: 'blog-hospital-uniforms.png', date: '15 Apr 2026',
    title: 'Hospital Uniforms Export: Quality, Hygiene & Compliance Explained',
    excerpt: 'The global healthcare industry relies heavily on high-quality medical textiles, especially hospital uniforms.',
    intro: 'The global healthcare industry relies heavily on high-quality medical textiles, especially hospital uniforms. From doctors and nurses to support staff, uniforms play a crucial role in maintaining hygiene, safety, and professionalism. As demand continues to grow worldwide, India has emerged as a trusted sourcing destination for hospital apparel.',
    body: [
      { p: 'A reliable hospital uniform supplier not only delivers cost-effective products but also ensures strict adherence to hygiene and compliance standards. This guide explores the essential aspects of exporting hospital uniforms, including quality benchmarks, safety features, and global certifications.' },
      { h2: 'Importance of Hospital Uniforms in Healthcare' },
      { p: 'Hospital uniforms are not just about appearance&mdash;they are essential for infection control, patient safety, and maintaining a professional healthcare environment. Every garment used in medical settings must meet strict hygiene and functionality standards.' },
      { p: 'Key functions include preventing cross-contamination between patients and staff, providing comfort during long working hours, ensuring easy identification of healthcare professionals, and supporting overall workplace safety. Because of these critical roles, buyers must partner with a trusted medical clothing exporter that prioritizes both quality and compliance.' },
      { h2: 'Types of Hospital Uniforms Exported from India' },
      { p: 'Indian manufacturers offer a comprehensive range of medical apparel designed to meet the diverse needs of healthcare institutions worldwide. Common product categories include doctor coats and lab coats, nurse uniforms and scrubs, surgical gowns and PPE kits, patient gowns, as well as medical caps, masks, and accessories.' },
      { h2: 'Quality Standards in Medical Textiles' },
      { p: 'Quality is the foundation of hospital uniform manufacturing. Medical garments must withstand frequent washing, sterilization processes, and continuous daily use without losing their functionality.' },
      { p: 'Essential quality features include durable fabrics that maintain strength after repeated washes, colorfast materials that resist fading, breathable and lightweight textiles for comfort, and advanced finishes such as anti-microbial and fluid-resistant coatings.' },
      { h2: 'Hygiene and Safety Requirements' },
      { p: 'Hygiene is the most critical factor in hospital uniforms. Poor-quality garments can increase the risk of infections and compromise patient safety. Key hygiene features include anti-bacterial and anti-fungal treatments, fluid-resistant and stain-repellent coatings, easy-to-clean materials suitable for high-temperature washing, and minimal lint generation to reduce contamination risks.' },
      { h2: 'Certifications and Compliance Standards' },
      { p: 'Exporting medical clothing requires strict compliance with international standards to ensure safety, reliability, and regulatory approval in different markets. Common certifications include ISO 13485 for medical quality management, OEKO-TEX Standard 100 for textile safety, CE certification for European markets, FDA compliance for the United States, and GOTS for organic textiles.' },
      { h2: 'Bulk Supply and Customization' },
      { p: 'Hospitals and distributors often require large volumes of uniforms, and Indian manufacturers are well-equipped to handle bulk production efficiently. Customization options include hospital logos, department-specific color coding, size variations for staff, and specialized designs tailored to different medical roles.' },
      { h2: 'Key Considerations When Choosing a Medical Clothing Exporter' },
      { p: 'Buyers should evaluate factors such as experience in medical textile exports, adherence to international certifications, fabric and stitching quality, production capacity, transparent pricing, communication efficiency, and delivery reliability.' },
      { faqGroup: { title: 'FAQs', items: [
        { q: 'Why are hospital uniforms important in healthcare?', a: 'They help maintain hygiene, prevent infections, ensure staff comfort, and enable easy identification of medical personnel.' },
        { q: 'What fabrics are used in hospital uniforms?', a: 'Common fabrics include cotton, polyester blends, and anti-microbial treated textiles for durability and hygiene.' },
        { q: 'What certifications are required for exporting medical clothing?', a: 'Certifications such as ISO 13485, OEKO-TEX, CE, FDA compliance, and GOTS are often required.' },
        { q: 'Can hospital uniforms be customized?', a: 'Yes, suppliers offer customization including logos, color coding, and department-specific designs.' },
        { q: 'What is the typical MOQ for hospital uniforms?', a: 'MOQ typically starts from 500–1000 units depending on customization and product type.' },
        { q: 'How long does it take to deliver bulk orders?', a: 'Production and delivery usually take 4–8 weeks depending on order size and shipping method.' },
      ] } },
      { p: `Hospital uniforms are a critical component of healthcare systems, requiring strict attention to quality, hygiene, and compliance. By partnering with a certified supplier like ${BRAND}, buyers can ensure consistent quality, regulatory compliance, and efficient bulk supply.` },
    ],
  },
  {
    key: 'blog-uniform-supplier', image: 'blog-uniform-supplier.png', date: '15 Apr 2026',
    title: 'How to Choose the Right Uniform Supplier for Your Business',
    excerpt: 'Choosing the right uniform supplier is a critical decision for importers, distributors, and corporate buyers.',
    intro: 'Choosing the right uniform supplier is a critical decision for importers, distributors, and corporate buyers. Whether you need school uniforms, corporate apparel, or industrial workwear, your supplier directly impacts product quality, pricing, and delivery timelines.',
    body: [
      { p: 'With India emerging as a global leader in garment manufacturing, many buyers are turning to a trusted uniform supplier in India for reliable and cost-effective sourcing. This guide will help you understand the key factors to evaluate before selecting the right partner.' },
      { h2: 'Why Choosing the Right Uniform Supplier Matters' },
      { p: 'Uniforms are more than just clothing&mdash;they represent your brand identity, professionalism, and operational consistency. Poor-quality products or delayed deliveries can negatively affect your reputation and disrupt your business.' },
      { p: 'A reliable bulk uniform manufacturer ensures consistent product quality, timely deliveries, competitive pricing, and smooth communication throughout the process.' },
      { h2: 'Key Factors to Consider When Selecting a Uniform Supplier' },
      { h3: '1. Experience and Industry Expertise' },
      { p: 'Evaluate the supplier’s experience in uniform manufacturing and exports. Look for years of operation, previous clients such as schools or corporates, and export experience in your target market.' },
      { h3: '2. Product Quality and Fabric Standards' },
      { p: 'Ensure the supplier uses durable and comfortable fabrics. Check fabric types such as cotton or polyester blends, colorfastness, shrink resistance, and stitching quality.' },
      { h3: '3. Customization Capabilities' },
      { p: 'A good supplier should offer customization options like logo embroidery, custom colors, size variations, and private labeling.' },
      { h3: '4. Production Capacity and Scalability' },
      { p: 'Assess whether the supplier can handle your current and future order volumes. Check production capacity, scalability during peak demand, and lead times.' },
      { h3: '5. Certifications and Compliance' },
      { p: 'Ensure the supplier meets global standards. Look for certifications like ISO, OEKO-TEX, GOTS, and SEDEX.' },
      { h3: '6. Pricing and Cost Transparency' },
      { p: 'Compare pricing structures and ensure transparency. Evaluate bulk discounts and overall value for money rather than just choosing the lowest price.' },
      { h3: '7. Communication and Customer Support' },
      { p: 'Choose suppliers who respond promptly, provide clear timelines, and maintain open communication.' },
      { h3: '8. Logistics and Delivery Capabilities' },
      { p: 'Check their experience in export documentation, shipping options, and delivery track record.' },
      { h2: 'Red Flags to Avoid' },
      { p: 'When selecting a uniform supplier, it is equally important to identify potential risks. Some warning signs include lack of certifications, poor communication, inconsistent product samples, unrealistically low pricing, and unclear production timelines.' },
      { h2: 'Benefits of Choosing an Indian Uniform Supplier' },
      { p: 'India has become a preferred sourcing destination for uniforms due to its strong manufacturing ecosystem and export capabilities, offering cost-effective production, high-quality fabrics, skilled labor, customization flexibility, strong logistics infrastructure, and scalability for bulk orders.' },
      { faqGroup: { title: 'FAQs', items: [
        { q: 'What should I look for in a uniform supplier?', a: 'Focus on experience, product quality, certifications, pricing transparency, and production capacity.' },
        { q: 'Why choose a uniform supplier from India?', a: 'India offers a strong combination of affordability, quality, scalability, and export expertise.' },
        { q: 'What is the typical MOQ for bulk uniforms?', a: 'MOQ usually starts from 500–1000 units depending on customization and product type.' },
        { q: 'How can I verify a supplier’s credibility?', a: 'Request samples, check certifications, review testimonials, and confirm export experience.' },
        { q: 'Can suppliers handle customized uniform designs?', a: 'Yes, most suppliers provide customization options including logos, colors, and packaging.' },
        { q: 'How long does it take to deliver bulk uniform orders?', a: 'Delivery typically takes 4–8 weeks depending on order size and shipping method.' },
      ] } },
      { p: `Choosing the right uniform supplier is a strategic decision that directly impacts your business success. Partnering with a dependable manufacturer like ${BRAND} ensures long-term growth and competitive advantage in global markets.` },
    ],
  },
  {
    key: 'blog-tshirt-manufacturers', image: 'blog-tshirt-manufacturers.png', date: '14 Apr 2026',
    title: 'Why Indian T-Shirt Manufacturers Are Preferred by Global Buyers',
    excerpt: 'India has become a global powerhouse in textile and apparel manufacturing, with t-shirts being one of its most exported products.',
    intro: 'India has become a global powerhouse in textile and apparel manufacturing, with t-shirts being one of its most exported products. From startups to large retail chains, international buyers increasingly rely on Indian suppliers for high-quality, cost-effective, and scalable production.',
    body: [
      { p: 'In this guide, we explore the key reasons why global buyers prefer Indian suppliers and how partnering with a trusted t-shirt exporter can strengthen your sourcing strategy and improve supply chain efficiency.' },
      { h2: 'Strong Cost Advantage Without Compromising Quality' },
      { p: 'One of the biggest advantages of sourcing from India is competitive pricing. Compared to many other manufacturing countries, India offers lower labor costs, efficient production processes, and access to locally sourced raw materials.' },
      { p: 'Despite the affordability, Indian manufacturers do not compromise on quality. They combine modern machinery with skilled craftsmanship to deliver premium t-shirts that meet international expectations.' },
      { h2: 'Access to High-Quality Cotton and Fabrics' },
      { p: 'India is one of the largest producers of cotton globally, giving manufacturers direct access to high-quality raw materials. Key fabric advantages include soft and breathable cotton suitable for all climates, durable blends such as cotton-polyester and organic cotton, eco-friendly fabric options for sustainable brands, and colorfast, shrink-resistant materials.' },
      { h2: 'Scalability for Bulk Orders' },
      { p: 'Global buyers often require large volumes within tight deadlines, and Indian manufacturers are well-equipped to meet these demands with advanced production units and experienced teams handling orders ranging from thousands to millions of units efficiently.' },
      { h2: 'Customization and Design Flexibility' },
      { p: 'Indian manufacturers excel in providing flexible design and customization options including screen printing, digital printing, embroidery, private labeling, and custom packaging.' },
      { h2: 'Compliance with International Standards' },
      { p: 'To serve global markets, Indian manufacturers follow strict quality and compliance standards including ISO for quality management, OEKO-TEX for textile safety, GOTS for organic textiles, and SEDEX for ethical business practices.' },
      { h2: 'Efficient Export and Logistics Network' },
      { p: 'India’s well-developed export infrastructure plays a key role in supporting global trade, with access to major ports such as Mumbai, Chennai, and Mundra, and flexible logistics options including air and sea freight.' },
      { h2: 'Growing Focus on Sustainability' },
      { p: 'Sustainability has become a major factor in global sourcing decisions. Options include organic cotton t-shirts, recycled fabrics, low-impact dyes, and responsible water usage practices.' },
      { faqGroup: { title: 'FAQs', items: [
        { q: 'Why is India a popular choice for t-shirt manufacturing?', a: 'India offers low production costs, high-quality cotton, skilled labor, and strong export capabilities.' },
        { q: 'What is the minimum order quantity (MOQ) for bulk t-shirts?', a: 'MOQ varies by manufacturer but typically starts from 500 to 1000 pieces depending on customization requirements.' },
        { q: 'Can I get customized t-shirts from Indian suppliers?', a: 'Yes, most manufacturers offer customization options including prints, embroidery, private labels, and packaging solutions.' },
        { q: 'Are Indian t-shirt manufacturers compliant with international standards?', a: 'Yes, many suppliers hold certifications such as ISO, OEKO-TEX, and GOTS to meet global quality and safety standards.' },
        { q: 'How long does it take to deliver bulk orders?', a: 'Production and shipping generally take 3 to 6 weeks depending on order size and destination.' },
        { q: 'Do Indian suppliers offer sustainable t-shirt options?', a: 'Yes, many manufacturers provide organic cotton products and eco-friendly production methods.' },
      ] } },
      { p: `Indian t-shirt manufacturers have established a strong global reputation by delivering the perfect balance of affordability, quality, and scalability. Partnering with a trusted supplier like ${BRAND} can help streamline operations, reduce costs, and ensure long-term success.` },
    ],
  },
  {
    key: 'blog-school-uniforms', image: 'blog-school-uniforms.png', date: '14 Apr 2026',
    title: 'Complete Guide to Exporting School Uniforms from India',
    excerpt: 'India has emerged as a global hub for textile manufacturing, and school uniforms are among its most in-demand export categories.',
    intro: 'India has emerged as a global hub for textile manufacturing, and school uniforms are among its most in-demand export categories. With competitive pricing, skilled craftsmanship, and a robust supply chain, Indian manufacturers are becoming preferred partners for international buyers.',
    body: [
      { p: 'For importers, distributors, and institutions seeking dependable sourcing, working with a trusted school uniform exporter can simplify procurement while ensuring consistent quality, timely delivery, and scalable production support.' },
      { h2: 'Why India is a Leading School Uniform Exporter' },
      { p: 'Key advantages include cost-effective production supported by lower labor costs, access to a wide range of fabrics such as cotton, polyester blends, and eco-friendly materials, and a skilled workforce experienced in large-scale garment manufacturing.' },
      { h2: 'Global Demand for School Uniforms' },
      { p: 'Global demand for school uniforms remains strong across multiple regions. African markets such as Nigeria, Kenya, and South Africa continue to show strong purchasing demand. The Middle East, including the UAE, Saudi Arabia, and Oman, also represents a growing market, alongside the UK, parts of Europe, Australia, and New Zealand.' },
      { h2: 'Types of School Uniforms Exported from India' },
      { p: 'Common categories include primary school uniforms such as shirts, shorts, and skirts; secondary school uniforms including formal shirts, trousers, and blazers; sports uniforms like track suits, t-shirts, and shorts; winter wear such as sweaters, jackets, and hoodies; and accessories including ties, belts, and socks.' },
      { h2: 'Quality Standards and Compliance' },
      { h3: '1. Fabric Quality' },
      { p: 'High-quality school uniforms require breathable, durable, and colorfast fabrics. Cotton, polyester blends, and sustainable materials are commonly used to balance comfort with long-term wear performance.' },
      { h3: '2. Stitching and Finishing' },
      { p: 'Strong seams, neat finishing, and consistent sizing are vital for schoolwear.' },
      { h3: '3. Certifications' },
      { p: 'Many international buyers request certifications such as ISO for quality management, OEKO-TEX for chemical safety, and GOTS for organic textiles.' },
      { h3: '4. Ethical Manufacturing' },
      { p: 'Fair labor practices, safe working conditions, and transparent production processes help build long-term credibility and secure repeat business.' },
      { h2: 'Bulk Supply and Logistics' },
      { p: 'The main advantages of bulk supply include scalability, cost savings, and consistency across batches. On the logistics side, exporters benefit from access to major ports such as Mumbai, Chennai, and Mundra, and flexible shipping options through sea freight and air freight.' },
      { h2: 'How to Choose the Right School Uniform Exporter in India' },
      { p: 'Start by reviewing the exporter’s experience in serving your target region, request product samples, verify certifications and compliance standards, assess production capacity, and confirm customization options such as logos, school colors, and embroidery.' },
      { h2: 'Trends in School Uniform Exports' },
      { p: 'Rising demand for sustainable fabrics such as organic cotton and recycled polyester, smart uniforms with moisture-wicking and anti-bacterial properties, and digital ordering systems are shaping the future of the category.' },
      { faqGroup: { title: 'FAQs', items: [
        { q: 'Why choose India for school uniform exports?', a: 'India offers cost-effective production, high-quality fabrics, skilled labor, and strong export infrastructure.' },
        { q: 'What is the minimum order quantity (MOQ) for bulk school uniforms?', a: 'MOQ typically ranges from 500 to 5,000 units depending on product type, customization needs, and fabric selection.' },
        { q: 'How do I verify a school uniform exporter in India?', a: 'Check certifications, request samples, review client testimonials, and confirm export experience in your target market.' },
        { q: 'What fabrics are commonly used in school uniforms?', a: 'Cotton, polyester blends, and eco-friendly fabrics are commonly used for comfort, durability, and easy maintenance.' },
        { q: 'Can Indian suppliers handle customized designs?', a: 'Yes, most suppliers can customize school uniforms with logos, colors, embroidery, and sizing specifications.' },
        { q: 'How long does it take to deliver bulk orders?', a: 'Production and delivery usually take between 4 and 8 weeks, depending on order volume and shipping method.' },
      ] } },
      { p: `Exporting school uniforms from India presents a strong opportunity for global buyers, wholesalers, and distributors seeking dependable supply at competitive prices. Partnering with a trusted exporter like ${BRAND} helps achieve consistent product quality, smooth fulfillment, and long-term sourcing success.` },
    ],
  },
];

function blogSidebar(file, activeKey) {
  return `<aside class="sidebar">
    <h4>Latest Posts</h4>
    <ul class="latest-list">
      ${BLOGS.map((b) => `<li><a class="${b.key === activeKey ? 'active' : ''}" href="${relHref(file, b.key)}">${b.title}<span>${b.date}</span></a></li>`).join('')}
    </ul>
  </aside>`;
}

(function blogsIndexPage() {
  const file = ROUTES.blogs;
  const body = pageBanner(file, [{ key: 'home', label: 'Home' }, { key: 'blogs', label: 'Blog' }], 'Blog') + `
  <section class="section">
    <div class="container">
      <div class="blog-grid">
        ${BLOGS.map((b) => `
        <div class="blog-card">
          <a href="${relHref(file, b.key)}"><img src="${img(file, b.image)}" alt="${b.title}" /></a>
          <div class="body">
            <span class="date">${b.date}</span>
            <h3><a href="${relHref(file, b.key)}">${b.title}</a></h3>
            <p>${b.excerpt}</p>
            <a class="readmore" href="${relHref(file, b.key)}">Read More &rarr;</a>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`;
  write(file, layout({
    file,
    title: `Blogs | ${BRAND_CAPS}`,
    description: `Insights on apparel exporting, sourcing, and manufacturing from ${BRAND}.`,
    activeTop: 'blogs',
    bodyHtml: body,
  }));
})();

BLOGS.forEach((b) => {
  const file = ROUTES[b.key];
  const body = pageBanner(file, [{ key: 'home', label: 'Home' }, { key: 'blogs', label: 'Blog Details' }, { key: b.key, label: b.title }], b.title) + `
  <section class="section">
    <div class="container layout">
      <div>
        <div class="blog-post-meta">Post by: Admin | ${b.date}</div>
        <img src="${img(file, b.image)}" alt="${b.title}" style="border-radius:6px;margin-bottom:24px;" />
        <div class="prose">
          <p>${b.intro}</p>
          ${blocksToHtml(b.body)}
        </div>
      </div>
      ${blogSidebar(file, b.key)}
    </div>
  </section>`;
  write(file, layout({
    file,
    title: `${b.title} | ${BRAND_CAPS}`,
    description: b.excerpt,
    activeTop: 'blogs',
    bodyHtml: body,
  }));
});

/* =========================================================================
   CONTACT US
   ========================================================================= */
(function contactPage() {
  const file = ROUTES.contact;
  const body = pageBanner(file, [{ key: 'home', label: 'Home' }, { key: 'contact', label: 'Contact Us' }], 'Contact Us') + `
  <section class="section">
    <div class="container">
      <div class="section-title" style="margin-bottom:36px;">
        <p style="max-width:640px;margin:0 auto;">For product quotes, business inquiries, or support, reach our team using the form below.</p>
      </div>
      <div class="contact-grid">
        <div class="contact-card">
          <h3>${BRAND_CAPS}</h3>
          <p style="font-size:13px;">GST No.: ${SITE.gst}<br/>Verified as: ${BRAND_CAPS}</p>
          <div class="contact-row"><span class="c-icon">&#9993;</span><div><b>Email</b><a href="mailto:${SITE.email}">${SITE.email}</a></div></div>
          <div class="contact-row"><span class="c-icon">&#9742;</span><div><b>Phone</b><a href="${SITE.phoneHref}">${SITE.phone}</a></div></div>
          <div class="contact-row"><span class="c-icon">&#8962;</span><div><b>Corporate Office</b>${SITE.addressLine}</div></div>
          <a class="btn btn-outline" href="${SITE.mapsHref}" target="_blank" rel="noopener">Get Directions</a>
        </div>
        <div class="contact-form">
          <h3 style="color:var(--navy);">Get in Touch</h3>
          <form id="inquiry-form">
            <div class="form-grid">
              <div><label>Name *</label><input type="text" required /></div>
              <div><label>Company Name *</label><input type="text" required /></div>
              <div><label>Email *</label><input type="email" required /></div>
              <div><label>Phone *</label><input type="tel" placeholder="+91" required /></div>
              <div class="full"><label>Reason for Inquiry *</label>
                <select required>
                  <option value="">Select a reason</option>
                  <option>General Inquiry</option>
                  <option>Product Inquiry</option>
                  <option>Bulk Order</option>
                  <option>Partnership</option>
                  <option>Support</option>
                </select>
              </div>
              <div class="full"><label>Message / Requirement Details *</label><textarea required></textarea></div>
            </div>
            <button type="submit" class="btn" style="margin-top:20px;">Send Message</button>
            <p class="form-note">Average response time: 24&ndash;48 hours</p>
            <div class="form-success">Thank you! Your inquiry has been recorded. Our team will get back to you shortly.</div>
          </form>
        </div>
      </div>
    </div>
  </section>`;
  write(file, layout({
    file,
    title: `Contact Us | ${BRAND_CAPS}`,
    description: `For product quotes, business inquiries, or support, reach the ${BRAND} team.`,
    activeTop: 'contact',
    bodyHtml: body,
  }));
})();

module.exports = { write };
