import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const domain = 'https://yourdomain.com';

const pages = [
  { slug: 'landing-page-development', title: 'Landing Page Development', keys: ['landing page developer', 'landing page design', 'conversion landing page', 'landing page for ads'], audience: 'advertising campaigns, lead generation, businesses, and startups', type: 'conversion page' },
  { slug: 'small-business-websites', title: 'Small Business Websites', keys: ['small business website', 'affordable business website', 'business website developer'], audience: 'small businesses, local companies, and service providers', type: 'business website' },
  { slug: 'restaurant-websites', title: 'Restaurant Websites', keys: ['restaurant website design', 'cafe website developer', 'restaurant online menu website'], audience: 'restaurants, cafes, coffee shops, and food businesses', type: 'hospitality website' },
  { slug: 'startup-websites', title: 'Startup Websites', keys: ['startup website developer', 'SaaS landing page', 'startup web design'], audience: 'SaaS products, AI startups, and technology companies', type: 'startup website' },
  { slug: 'website-redesign-services', title: 'Website Redesign Services', keys: ['website redesign', 'redesign old website', 'modern website redesign'], audience: 'old websites, outdated business websites, and brands that need a stronger digital presence', type: 'redesign project' },
  { slug: 'ecommerce-websites', title: 'Ecommerce Websites', keys: ['ecommerce website developer', 'online store development', 'ecommerce web design'], audience: 'online stores, Shopify-like businesses, and product sellers', type: 'online store' },
  { slug: 'gym-fitness-websites', title: 'Gym & Fitness Websites', keys: ['gym website design', 'fitness website developer', 'personal trainer website'], audience: 'gyms, fitness clubs, personal trainers, and coaches', type: 'fitness website' },
  { slug: 'barbershop-websites', title: 'Barbershop Websites', keys: ['barber website design', 'barbershop website', 'salon website developer'], audience: 'barber shops, beauty salons, and hair studios', type: 'booking website' },
  { slug: 'real-estate-websites', title: 'Real Estate Websites', keys: ['real estate website design', 'realtor website developer', 'property listing website'], audience: 'realtors, property consultants, and real estate agencies', type: 'property website' },
  { slug: 'car-dealership-websites', title: 'Car Dealership Websites', keys: ['car dealership website', 'auto dealer website design', 'car sales website'], audience: 'car dealers, auto businesses, and vehicle sales teams', type: 'inventory website' },
  { slug: 'car-wash-websites', title: 'Car Wash Websites', keys: ['car wash website', 'detailing website design', 'auto service website'], audience: 'car washes, detailing studios, garages, and auto service companies', type: 'auto service website' },
  { slug: 'medical-clinic-websites', title: 'Medical Clinic Websites', keys: ['medical website design', 'clinic website developer', 'healthcare website'], audience: 'clinics, doctors, dentists, and healthcare providers', type: 'healthcare website' },
  { slug: 'dental-clinic-websites', title: 'Dental Clinic Websites', keys: ['dental website design', 'dentist website developer', 'dental clinic website'], audience: 'dentists, orthodontists, and dental clinics', type: 'dental website' },
  { slug: 'lawyer-websites', title: 'Lawyer Websites', keys: ['lawyer website design', 'attorney website developer', 'law firm website'], audience: 'lawyers, attorneys, legal consultants, and law firms', type: 'legal website' },
  { slug: 'construction-company-websites', title: 'Construction Company Websites', keys: ['construction website design', 'contractor website', 'building company website'], audience: 'construction companies, contractors, renovation teams, and builders', type: 'contractor website' },
  { slug: 'cleaning-service-websites', title: 'Cleaning Service Websites', keys: ['cleaning company website', 'maid service website', 'cleaning service design'], audience: 'cleaning companies, maid services, and home service providers', type: 'cleaning website' },
  { slug: 'plumber-websites', title: 'Plumber Websites', keys: ['plumber website design', 'plumbing website', 'plumbing company website'], audience: 'plumbers, emergency repair teams, and plumbing companies', type: 'plumbing website' },
  { slug: 'electrician-websites', title: 'Electrician Websites', keys: ['electrician website', 'electrical company website', 'electrician web design'], audience: 'electricians, electrical contractors, and repair services', type: 'electrical website' },
  { slug: 'hvac-websites', title: 'HVAC Websites', keys: ['HVAC website design', 'air conditioning website', 'HVAC contractor website'], audience: 'AC services, HVAC companies, and maintenance contractors', type: 'HVAC website' },
  { slug: 'roofing-company-websites', title: 'Roofing Company Websites', keys: ['roofing website design', 'roofing contractor website', 'roofing business website'], audience: 'roofing companies, contractors, and home exterior businesses', type: 'roofing website' },
  { slug: 'photographer-websites', title: 'Photographer Websites', keys: ['photographer website design', 'portfolio website for photographers', 'photography website'], audience: 'photographers, creators, studios, and visual freelancers', type: 'portfolio website' },
  { slug: 'videographer-websites', title: 'Videographer Websites', keys: ['videographer website', 'video production website', 'filmmaker portfolio website'], audience: 'videographers, filmmakers, video creators, and production studios', type: 'video portfolio' },
  { slug: 'portfolio-websites', title: 'Portfolio Websites', keys: ['portfolio website design', 'personal portfolio website', 'online portfolio developer'], audience: 'designers, freelancers, creators, and independent professionals', type: 'portfolio website' },
  { slug: 'freelancer-websites', title: 'Freelancer Websites', keys: ['freelancer website design', 'personal brand website', 'freelance portfolio website'], audience: 'freelancers, consultants, coaches, and personal brands', type: 'personal brand website' },
  { slug: 'crypto-websites', title: 'Crypto Websites', keys: ['crypto website design', 'blockchain landing page', 'web3 website developer'], audience: 'crypto projects, blockchain startups, and web3 products', type: 'web3 website' },
  { slug: 'ai-startup-websites', title: 'AI Startup Websites', keys: ['AI startup website', 'AI SaaS landing page', 'artificial intelligence website'], audience: 'AI startups, AI tools, and artificial intelligence products', type: 'AI website' },
  { slug: 'saas-websites', title: 'SaaS Websites', keys: ['SaaS website design', 'SaaS landing page', 'SaaS product website'], audience: 'SaaS companies, software products, and subscription businesses', type: 'SaaS website' },
  { slug: 'wordpress-alternative-websites', title: 'WordPress Alternative Websites', keys: ['wordpress alternative website', 'fast static website', 'SEO optimized static website'], audience: 'businesses tired of slow WordPress sites and plugin maintenance', type: 'static website' },
  { slug: 'seo-friendly-websites', title: 'SEO Friendly Websites', keys: ['SEO friendly website', 'Google optimized website', 'technical SEO web development'], audience: 'businesses that want Google traffic and stronger search visibility', type: 'SEO website' },
  { slug: 'fast-loading-websites', title: 'Fast Loading Websites', keys: ['fast loading website', 'Core Web Vitals optimization', 'lightweight website'], audience: 'SEO-focused clients, performance-sensitive businesses, and mobile-first brands', type: 'performance website' },
  { slug: 'mobile-friendly-websites', title: 'Mobile Friendly Websites', keys: ['mobile friendly website', 'responsive website developer', 'mobile optimized website'], audience: 'mobile-first businesses and companies whose customers browse on phones', type: 'responsive website' },
  { slug: 'business-landing-pages', title: 'Business Landing Pages', keys: ['business landing page', 'lead generation landing page', 'service landing page'], audience: 'service companies, agencies, consultants, and advertising campaigns', type: 'lead generation page' },
  { slug: 'website-for-restaurants', title: 'Website for Restaurants', keys: ['website for restaurants', 'online menu website', 'restaurant ordering website'], audience: 'restaurants, takeout brands, food delivery teams, and dining businesses', type: 'restaurant website' },
  { slug: 'website-for-cafes', title: 'Website for Cafes', keys: ['cafe website design', 'coffee shop website', 'coffee business website'], audience: 'cafes, coffee shops, bakeries, and specialty coffee businesses', type: 'cafe website' },
  { slug: 'website-for-hotels', title: 'Website for Hotels', keys: ['hotel website design', 'resort website', 'booking website developer'], audience: 'hotels, resorts, boutique stays, and hospitality brands', type: 'hotel website' },
  { slug: 'website-for-airbnb-hosts', title: 'Website for Airbnb Hosts', keys: ['Airbnb host website', 'vacation rental website', 'booking landing page'], audience: 'Airbnb hosts, vacation rentals, short-term rental managers, and property owners', type: 'rental website' },
  { slug: 'website-for-coaches', title: 'Website for Coaches', keys: ['coaching website', 'life coach website', 'business coach website'], audience: 'coaches, mentors, consultants, and personal development brands', type: 'coaching website' },
  { slug: 'website-for-online-courses', title: 'Website for Online Courses', keys: ['online course website', 'education platform website', 'course landing page'], audience: 'educators, online schools, course creators, and learning platforms', type: 'education website' },
  { slug: 'website-for-youtube-creators', title: 'Website for YouTube Creators', keys: ['YouTube creator website', 'influencer website', 'creator portfolio website'], audience: 'YouTubers, influencers, creators, and media personalities', type: 'creator website' },
  { slug: 'website-maintenance-services', title: 'Website Maintenance Services', keys: ['website maintenance', 'website support services', 'website updates'], audience: 'businesses that need ongoing website support, updates, and fixes', type: 'maintenance service' },
  { slug: 'website-speed-optimization', title: 'Website Speed Optimization', keys: ['website speed optimization', 'Core Web Vitals', 'improve website performance'], audience: 'businesses with slow websites, SEO problems, and poor mobile performance', type: 'speed service' },
  { slug: 'website-seo-audit', title: 'Website SEO Audit', keys: ['website SEO audit', 'technical SEO audit', 'SEO website analysis'], audience: 'SEO clients, business owners, and teams that need technical website analysis', type: 'audit service' },
  { slug: 'one-page-websites', title: 'One Page Websites', keys: ['one page website', 'single page website design', 'one page landing page'], audience: 'simple businesses, solo founders, freelancers, and quick launch projects', type: 'one page website' },
  { slug: 'multi-page-websites', title: 'Multi Page Websites', keys: ['multi page website', 'business website structure', 'corporate website'], audience: 'larger companies, service businesses, and brands with multiple offers', type: 'multi page website' },
  { slug: 'custom-web-development', title: 'Custom Web Development', keys: ['custom web development', 'custom website developer', 'unique website design'], audience: 'custom projects, unique brands, and businesses that need more than a template', type: 'custom website' },
  { slug: 'web-design-services', title: 'Web Design Services', keys: ['web design services', 'professional website designer', 'modern web design'], audience: 'business owners looking for professional modern web design', type: 'web design service' },
  { slug: 'web-development-services', title: 'Web Development Services', keys: ['web development services', 'website development company', 'freelance web developer'], audience: 'businesses looking for broad website development support', type: 'web development service' },
  { slug: 'ui-ux-websites', title: 'UI UX Websites', keys: ['UI UX website design', 'modern UI website', 'UX optimized website'], audience: 'premium clients, SaaS brands, and businesses that care about user experience', type: 'UX website' },
  { slug: 'website-for-local-business', title: 'Website for Local Business', keys: ['local business website', 'local SEO website', 'local company website'], audience: 'local companies worldwide, service providers, and regional brands', type: 'local website' },
  { slug: 'website-for-service-business', title: 'Website for Service Business', keys: ['service business website', 'service company website', 'lead generation website'], audience: 'service businesses, home services, agencies, and consultants', type: 'service website' },
  { slug: 'cheap-business-websites', title: 'Cheap Business Websites', keys: ['affordable website design', 'cheap business website', 'budget website developer'], audience: 'low-budget clients, new businesses, and founders who need a simple launch', type: 'budget website' },
  { slug: 'premium-business-websites', title: 'Premium Business Websites', keys: ['premium website design', 'luxury business website', 'premium web development'], audience: 'premium clients, luxury brands, and expensive service businesses', type: 'premium website' },
];

const images = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop',
];

function esc(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function relatedLinks(page) {
  const index = pages.findIndex((item) => item.slug === page.slug);
  const picks = [
    pages[(index + 1) % pages.length],
    pages[(index + 7) % pages.length],
    pages[(index + 17) % pages.length],
    pages.find((item) => item.slug === 'web-development-services'),
    pages.find((item) => item.slug === 'seo-friendly-websites'),
  ].filter(Boolean);
  return [...new Map(picks.map((item) => [item.slug, item])).values()].filter((item) => item.slug !== page.slug).slice(0, 5);
}

function pageHtml(page, index) {
  const primary = page.keys[0];
  const secondary = page.keys[1] || primary;
  const third = page.keys[2] || primary;
  const fourth = page.keys[3] || secondary;
  const description = `Professional ${primary} services for ${page.audience}. SEO optimized, mobile-first websites built for leads, trust, and fast loading.`;
  const image = images[index % images.length];
  const links = relatedLinks(page);
  const linkHtml = links.map((item) => `<a href="../${item.slug}/" class="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white transition hover:border-green-400/40 hover:bg-white/10">${esc(item.title)}</a>`).join('\n          ');
  const faq = [
    [`What makes this ${page.type} SEO optimized?`, `The page is planned around search intent, keyword placement, technical structure, internal links, readable headings, strong metadata, compressed visual assets, and a mobile-first layout. For ${page.title.toLowerCase()}, the content also uses phrases such as ${primary}, ${secondary}, and ${third} in natural places instead of stuffing them randomly.`],
    [`Can this page be used for ads and lead generation?`, `Yes. The layout is built around a clear CTA, quick trust signals, a focused offer, and short decision paths. That makes it useful for Google Ads, social ads, local campaigns, and organic visitors who need to understand the offer quickly.`],
    [`How long does a ${page.title.toLowerCase()} project take?`, `A focused single page can often be created quickly when the offer, contact details, and examples are ready. Bigger websites with multiple services, locations, galleries, or integrations need more planning because each page should have unique copy and a clear SEO role.`],
    [`Will the website work well on mobile phones?`, `Yes. Every page is designed mobile-first, with readable text, fast sections, tap-friendly buttons, responsive spacing, and simple navigation. Mobile visitors should be able to understand the offer and contact the business without zooming or searching.`],
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(primary)} | ${esc(page.title)} by NAUMWEB</title>
  <meta name="description" content="${esc(description)}">
  <meta name="keywords" content="${esc(page.keys.join(', '))}">
  <link rel="canonical" href="${domain}/${page.slug}/">
  <link rel="stylesheet" href="../styles.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "${esc(page.title)}",
    "serviceType": "${esc(primary)}",
    "provider": {
      "@type": "ProfessionalService",
      "name": "NAUMWEB"
    },
    "areaServed": "Worldwide",
    "description": "${esc(description)}"
  }
  </script>
</head>

<body class="bg-black text-white overflow-x-hidden">

<header class="border-b border-white/10 bg-black/80 backdrop-blur-xl">
  <div class="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-5">
    <a href="../" class="text-2xl font-bold tracking-wide">NAUMWEB</a>
    <nav class="hidden md:flex items-center gap-6 text-sm uppercase tracking-wider text-zinc-300">
      <a href="../#services" class="hover:text-green-400 transition">Services</a>
      <a href="../#portfolio" class="hover:text-green-400 transition">Portfolio</a>
      <a href="../#contact" class="hover:text-green-400 transition">Contact</a>
    </nav>
  </div>
</header>

<main>
  <section class="py-20 md:py-28">
    <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <p class="text-green-400 uppercase tracking-[0.3em] text-sm mb-6">${esc(page.type)}</p>
        <h1 class="text-4xl md:text-6xl font-black leading-tight mb-8">${esc(primary)} for ${esc(page.audience)}</h1>
        <p class="text-zinc-300 text-lg md:text-xl leading-relaxed mb-8">
          If you need a ${esc(primary)}, the page cannot be only a beautiful screen. It has to explain your offer, support search intent, load quickly, and move visitors toward action. This ${esc(page.title.toLowerCase())} service is built for ${esc(page.audience)}, with ${esc(secondary)}, ${esc(third)}, and a practical structure that helps people understand why they should contact you.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="../#contact" class="bg-green-400 text-black px-8 py-4 rounded-2xl font-bold text-center hover:scale-105 transition">Request This Website</a>
          <a href="../#portfolio" class="border border-white/20 px-8 py-4 rounded-2xl font-bold text-center hover:bg-white hover:text-black transition">View Portfolio</a>
        </div>
      </div>

      <img src="${image}"
           alt="${esc(primary)} example for ${esc(page.audience)}"
           class="w-full rounded-3xl border border-white/10 object-cover aspect-[4/3]">
    </div>
  </section>

  <section class="py-20 bg-zinc-950 border-y border-white/10">
    <div class="max-w-6xl mx-auto px-6">
      <p class="text-green-400 uppercase tracking-[0.3em] text-sm mb-4">Strategy</p>
      <h2 class="text-3xl md:text-5xl font-black mb-8">A ${esc(page.type)} should do more than look modern</h2>
      <div class="grid md:grid-cols-2 gap-8 text-zinc-300 leading-relaxed">
        <p>
          Many websites fail because they are built as visual brochures first and business tools second. A stronger approach starts with the visitor: what they searched, what problem they have, what proof they need, and which action should happen next. For ${esc(page.audience)}, that means the page needs direct messaging, fast proof, clear sections, and a CTA that feels natural instead of forced.
        </p>
        <p>
          The content is organized around ${esc(primary)}, ${esc(secondary)}, and ${esc(third)} so the page can speak to both humans and search engines. The goal is not to repeat keywords mechanically. The goal is to build a helpful page where each section has a job: explain the offer, reduce doubt, show credibility, and make the next step obvious.
        </p>
      </div>
    </div>
  </section>

  <section class="py-20">
    <div class="max-w-7xl mx-auto px-6">
      <p class="text-green-400 uppercase tracking-[0.3em] text-sm mb-4">What is included</p>
      <h2 class="text-3xl md:text-5xl font-black mb-12">SEO optimized structure for real business use</h2>
      <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div class="bg-zinc-900 rounded-3xl p-7 border border-white/5">
          <h3 class="text-xl font-bold mb-3">Keyword Planning</h3>
          <p class="text-zinc-400 leading-relaxed">The page uses ${esc(primary)}, ${esc(secondary)}, and related phrases in the title, H1, first paragraph, description, alt tags, headings, and body copy.</p>
        </div>
        <div class="bg-zinc-900 rounded-3xl p-7 border border-white/5">
          <h3 class="text-xl font-bold mb-3">Conversion Layout</h3>
          <p class="text-zinc-400 leading-relaxed">The design supports leads with a clear hero, benefit sections, trust signals, FAQ answers, strong CTA buttons, and simple contact paths.</p>
        </div>
        <div class="bg-zinc-900 rounded-3xl p-7 border border-white/5">
          <h3 class="text-xl font-bold mb-3">Mobile-First Build</h3>
          <p class="text-zinc-400 leading-relaxed">The layout is planned for phones first, then expanded for larger screens. Buttons are easy to tap and text remains readable on small devices.</p>
        </div>
        <div class="bg-zinc-900 rounded-3xl p-7 border border-white/5">
          <h3 class="text-xl font-bold mb-3">Technical SEO</h3>
          <p class="text-zinc-400 leading-relaxed">Clean HTML, metadata, schema markup, internal links, canonical URLs, lightweight sections, and logical content hierarchy are included.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="py-20 bg-zinc-950 border-y border-white/10">
    <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
      <div>
        <p class="text-green-400 uppercase tracking-[0.3em] text-sm mb-4">Use cases</p>
        <h2 class="text-3xl md:text-5xl font-black mb-6">Built for ${esc(page.audience)}</h2>
        <p class="text-zinc-400 text-lg leading-relaxed">
          A useful ${esc(page.type)} has to match the business model. ${esc(page.title)} pages should not all sound the same, because visitors from different markets care about different proof. Some need pricing clarity. Some need trust. Some need a portfolio. Some need speed, calls, bookings, or a direct WhatsApp conversation.
        </p>
      </div>
      <div class="space-y-5 text-zinc-300 leading-relaxed">
        <p>
          For ${esc(page.audience)}, the page can include service descriptions, location signals, feature blocks, comparison sections, testimonials, portfolio examples, and a concise FAQ. If the traffic comes from ads, the copy should stay focused and avoid distractions. If the goal is organic search, the page should answer real questions and connect to related services through internal links.
        </p>
        <p>
          This is especially important when a visitor is comparing several providers. A generic website says that the company exists. A strong ${esc(primary)} page explains what makes the offer useful, what happens after contact, why the business is credible, and how quickly the visitor can take the next step.
        </p>
        <p>
          The final result can be used as a standalone page, a service page inside a larger website, or a campaign page for ${esc(fourth)}. The structure is flexible enough for startups, local companies, creators, and service providers, while still staying focused on measurable business outcomes.
        </p>
      </div>
    </div>
  </section>

  <section class="py-20">
    <div class="max-w-6xl mx-auto px-6">
      <p class="text-green-400 uppercase tracking-[0.3em] text-sm mb-4">Process</p>
      <h2 class="text-3xl md:text-5xl font-black mb-10">How the page is planned and built</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-zinc-900 rounded-3xl p-7 border border-white/5">
          <h3 class="text-xl font-bold mb-3">1. Offer & Search Intent</h3>
          <p class="text-zinc-400 leading-relaxed">We clarify the business goal, the visitor profile, the primary keyword, supporting keywords, and the main action the page should generate.</p>
        </div>
        <div class="bg-zinc-900 rounded-3xl p-7 border border-white/5">
          <h3 class="text-xl font-bold mb-3">2. Content & Layout</h3>
          <p class="text-zinc-400 leading-relaxed">The page is written with a strong first paragraph, useful sections, proof points, CTA placement, FAQ answers, and internal links.</p>
        </div>
        <div class="bg-zinc-900 rounded-3xl p-7 border border-white/5">
          <h3 class="text-xl font-bold mb-3">3. Build & Launch</h3>
          <p class="text-zinc-400 leading-relaxed">The website is built as a fast, responsive, SEO-friendly static page that can be deployed quickly and expanded later.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="py-20 bg-zinc-950 border-y border-white/10">
    <div class="max-w-5xl mx-auto px-6">
      <p class="text-green-400 uppercase tracking-[0.3em] text-sm mb-4">FAQ</p>
      <h2 class="text-3xl md:text-5xl font-black mb-10">Frequently asked questions</h2>
      <div class="space-y-5">
        ${faq.map(([q, a]) => `<div class="bg-zinc-900 rounded-3xl p-7 border border-white/5">
          <h3 class="text-xl font-bold mb-3">${esc(q)}</h3>
          <p class="text-zinc-400 leading-relaxed">${esc(a)}</p>
        </div>`).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="py-20">
    <div class="max-w-6xl mx-auto px-6">
      <div class="bg-zinc-900 border border-white/5 rounded-3xl p-8 md:p-12 text-center">
        <p class="text-green-400 uppercase tracking-[0.3em] text-sm mb-4">CTA</p>
        <h2 class="text-3xl md:text-5xl font-black mb-6">Need a ${esc(primary)} that is fast, modern, and built for leads?</h2>
        <p class="text-zinc-400 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
          Send your business niche, target country, services, and contact links. I can create a ${esc(page.title.toLowerCase())} page with SEO structure, mobile-first design, and conversion-focused sections.
        </p>
        <a href="../#contact" class="inline-flex bg-green-400 text-black px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition">Start This Project</a>
      </div>
    </div>
  </section>

  <section class="py-20 bg-zinc-950">
    <div class="max-w-7xl mx-auto px-6">
      <p class="text-green-400 uppercase tracking-[0.3em] text-sm mb-4">Internal links</p>
      <h2 class="text-3xl md:text-4xl font-black mb-8">Related website services</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          ${linkHtml}
      </div>
    </div>
  </section>
</main>

<footer class="border-t border-white/10 py-10 text-center text-zinc-500 text-sm">
  <a href="../" class="hover:text-white transition">NAUMWEB</a> - SEO optimized web development
</footer>

</body>
</html>
`;
}

function hubHtml() {
  const items = pages.map((page) => `<a href="../${page.slug}/" class="bg-zinc-900 border border-white/5 rounded-3xl p-6 hover:border-green-400/30 transition">
        <span class="text-green-400 text-sm uppercase tracking-wider">${esc(page.type)}</span>
        <span class="block text-xl font-bold mt-3">${esc(page.title)}</span>
        <span class="block text-zinc-400 mt-3 leading-relaxed">${esc(page.keys.join(', '))}</span>
      </a>`).join('\n      ');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SEO Website Services | NAUMWEB</title>
  <meta name="description" content="Browse SEO optimized website services for landing pages, business websites, local companies, startups, restaurants, clinics, real estate, and more.">
  <link rel="stylesheet" href="../styles.css">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-black text-white overflow-x-hidden">
<header class="border-b border-white/10 bg-black/80">
  <div class="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
    <a href="../" class="text-2xl font-bold tracking-wide">NAUMWEB</a>
    <a href="../#contact" class="bg-green-400 text-black px-5 py-3 rounded-2xl font-bold">Contact</a>
  </div>
</header>
<main class="py-20">
  <div class="max-w-7xl mx-auto px-6">
    <p class="text-green-400 uppercase tracking-[0.3em] mb-5">SEO Pages</p>
    <h1 class="text-4xl md:text-6xl font-black mb-8">SEO Website Services</h1>
    <p class="text-zinc-400 text-xl leading-relaxed max-w-4xl mb-12">Choose a website service page built around a specific business niche, search intent, and lead generation goal.</p>
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      ${items}
    </div>
  </div>
</main>
</body>
</html>
`;
}

function sitemapXml() {
  const urls = [''].concat(['services'], pages.map((page) => page.slug));
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((slug) => `
  <url>
    <loc>${domain}/${slug ? `${slug}/` : ''}</loc>
  </url>`).join('\n')}

</urlset>
`;
}

await mkdir('services', { recursive: true });
await writeFile(path.join('services', 'index.html'), hubHtml(), 'utf8');

for (const [index, page] of pages.entries()) {
  await mkdir(page.slug, { recursive: true });
  await writeFile(path.join(page.slug, 'index.html'), pageHtml(page, index), 'utf8');
}

await writeFile('sitemap.xml', sitemapXml(), 'utf8');

console.log(`Generated ${pages.length} SEO pages plus services hub.`);
