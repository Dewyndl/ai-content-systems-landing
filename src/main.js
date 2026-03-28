import './style.css';

const solutions = [
  {
    id: 'telegram',
    eyebrow: '01 / Telegram',
    title: 'A content factory for the channel you already own.',
    text: 'Turn voice notes, links, and rough ideas into a steady stream of channel-ready posts. Nothing ships without your approval.',
    tags: ['Telegram', 'n8n', 'GPT / Gemini'],
    number: '01',
  },
  {
    id: 'youtube',
    eyebrow: '02 / YouTube',
    title: 'Research and outlines without the blank-page tax.',
    text: 'A research assistant that gathers sources, finds the angle, and hands your writer a structured, cited outline.',
    tags: ['NotebookLM', 'Google AI Studio', 'Docs'],
    number: '02',
  },
  {
    id: 'approval',
    eyebrow: '03 / Approval',
    title: 'Make feedback a workflow, not a group chat.',
    text: 'Route drafts to the right people, collect decisions in one place, and keep a visible record of every revision.',
    tags: ['Make', 'Airtable', 'Slack'],
    number: '03',
  },
  {
    id: 'custom',
    eyebrow: '04 / Custom',
    title: 'A pipeline shaped around your actual business.',
    text: 'When your process is the differentiator, we map it, automate the repeatable parts, and leave you with a system your team can own.',
    tags: ['Custom app', 'Model router', 'API'],
    number: '04',
  },
];

const app = document.querySelector('#app');
if (!app) throw new Error('Landing mount element is missing');

app.innerHTML = `
  <header class="site-header">
    <a class="brand" href="#top" aria-label="Signal Systems home"><span class="brand-mark">✳</span><span>signal<span class="brand-muted">/</span>systems</span></a>
    <button class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="site-nav"><span></span><span></span></button>
    <nav id="site-nav" class="site-nav" aria-label="Main navigation">
      <a href="#systems">Systems</a><a href="#method">Method</a><a href="#pricing">Investment</a><a href="#faq">FAQ</a>
      <a class="nav-cta" href="#contact">Talk to us <span>↗</span></a>
    </nav>
  </header>

  <main id="top">
    <section class="hero section-shell">
      <div class="hero-copy reveal">
        <p class="kicker"><span class="kicker-dot"></span> AI content systems / 2025</p>
        <h1>Make more.<br /><em>Repeat less.</em></h1>
        <p class="hero-lede">We design practical AI workflows for teams with something worth saying — and enough taste to keep a human in the loop.</p>
        <div class="hero-actions"><a class="button button-primary" href="#contact">Build your system <span>↗</span></a><a class="text-link" href="#systems">Explore solutions <span>↓</span></a></div>
      </div>
      <div class="hero-visual reveal reveal-delay">
        <div class="orbit orbit-one"></div><div class="orbit orbit-two"></div>
        <div class="visual-core"><span class="core-symbol">✳</span><span>signal<br /><small>in / out</small></span></div>
        <div class="signal-card card-top"><span class="card-label">INPUT</span><strong>raw material</strong><span class="card-icon">↘</span></div>
        <div class="signal-card card-right"><span class="card-label">SYSTEM</span><strong>your logic</strong><span class="card-icon">↙</span></div>
        <div class="signal-card card-bottom"><span class="card-label">OUTPUT</span><strong>ready to review</strong><span class="card-icon">↖</span></div>
        <span class="visual-caption">A little less magic.<br />A lot more clarity.</span>
      </div>
      <div class="scroll-cue"><span>Scroll to explore</span><i></i></div>
    </section>

    <section class="trust-strip"><div class="section-shell trust-inner"><span>For teams that care about</span><div><span>QUALITY</span><span>CONSISTENCY</span><span>OWNERSHIP</span></div></div></section>

    <section id="systems" class="systems section-shell section-pad">
      <div class="section-heading reveal"><p class="kicker">The catalogue</p><h2>Systems for the work<br /><em>behind the work.</em></h2><p class="section-intro">Choose a focused starting point or bring us the process nobody has had time to untangle.</p></div>
      <div class="solution-list" role="list">${solutions.map((solution, index) => `<article class="solution-card reveal ${index === 0 ? 'is-active' : ''}" data-solution="${solution.id}" role="listitem" tabindex="0"><div class="solution-number">${solution.number}</div><div class="solution-main"><p class="card-eyebrow">${solution.eyebrow}</p><h3>${solution.title}</h3><p>${solution.text}</p><div class="tag-list">${solution.tags.map((tag) => `<span>${tag}</span>`).join('')}</div></div><span class="solution-arrow">↗</span></article>`).join('')}</div>
    </section>

    <section id="method" class="method section-pad"><div class="section-shell method-grid"><div class="section-heading reveal"><p class="kicker">The method</p><h2>Automation with<br /><em>good judgement.</em></h2><p class="section-intro">The best system is not the one with the most AI. It is the one your team trusts enough to use on a Tuesday.</p><a class="text-link" href="#contact">Start with a map <span>↗</span></a></div><div class="steps reveal reveal-delay"><div class="step"><span>01</span><div><h3>Map the real process</h3><p>We find the inputs, decisions, edge cases, and hand-offs that a tidy brief tends to hide.</p></div></div><div class="step"><span>02</span><div><h3>Automate the repeatable</h3><p>We connect the tools you already use and make the invisible work observable.</p></div></div><div class="step"><span>03</span><div><h3>Keep the taste human</h3><p>Approvals, source checks, and final publishing remain exactly where they belong: with you.</p></div></div></div></div></section>

    <section class="numbers section-shell section-pad"><div class="number-grid"><div class="metric reveal"><strong>3–6<span>wks</span></strong><p>Typical build time<br />to first useful system</p></div><div class="metric reveal"><strong>100<span>%</span></strong><p>Transparent handover<br />and documented logic</p></div><div class="metric reveal"><strong>1<span>st</span></strong><p>Human review stays<br />in the right place</p></div></div></section>

    <section id="pricing" class="pricing section-pad"><div class="section-shell"><div class="section-heading reveal"><p class="kicker">Investment</p><h2>Clear scope.<br /><em>No mystery math.</em></h2></div><div class="pricing-grid"><article class="price-card reveal"><p class="card-eyebrow">Launch kit</p><h3>One workflow,<br />properly built.</h3><strong>from €1,800</strong><p>For a focused content bottleneck with a clear owner and a small tool stack.</p><a class="text-link" href="#contact">Scope a launch <span>↗</span></a></article><article class="price-card price-card-featured reveal reveal-delay"><span class="popular">Most useful starting point</span><p class="card-eyebrow">Operating system</p><h3>A connected rhythm<br />your team can run.</h3><strong>from €4,500</strong><p>For teams ready to connect research, production, approvals, and reporting.</p><a class="button button-light" href="#contact">Find your fit <span>↗</span></a></article><article class="price-card reveal"><p class="card-eyebrow">Custom build</p><h3>Your process,<br />with leverage.</h3><strong>from €8,000</strong><p>For a differentiated workflow that needs custom interfaces, logic, or integrations.</p><a class="text-link" href="#contact">Bring a brief <span>↗</span></a></article></div><p class="fine-print">One-time implementation. Hosting, model/API usage, and optional ongoing support are scoped separately. You own the system and its documentation.</p></div></section>

    <section class="comparison section-shell section-pad"><div class="comparison-copy reveal"><p class="kicker">A useful distinction</p><h2>AI does the<br /><em>first pass.</em></h2><p>It can gather, sort, draft, and route. It cannot know what your audience will care about tomorrow. That is still your superpower.</p></div><div class="comparison-table reveal reveal-delay"><div class="table-row table-head"><span>Task</span><span>System handles</span><span>You decide</span></div><div class="table-row"><span>Research</span><span>Collects + cites sources</span><span>What matters</span></div><div class="table-row"><span>Drafting</span><span>Structure + variations</span><span>What sounds like you</span></div><div class="table-row"><span>Publishing</span><span>Routes + reminds</span><span>Whether it ships</span></div></div></section>

    <section id="faq" class="faq section-pad"><div class="section-shell faq-grid"><div class="section-heading reveal"><p class="kicker">Good questions</p><h2>Before we<br /><em>make a thing.</em></h2></div><div class="faq-list reveal reveal-delay"><details open><summary>Do you replace our content team?</summary><p>No. We remove repetitive coordination and give your team a better first draft. Your expertise, point of view, and final approval stay central.</p></details><details><summary>Which tools do you work with?</summary><p>n8n, Make, Airtable, Notion, Google Workspace, Telegram, Slack, Dify, and model-router APIs are common starting points. We choose the smallest reliable stack for the job.</p></details><details><summary>What do we need to provide?</summary><p>A process owner, examples of good work, access to the relevant tools, and a willingness to make a few decisions. We turn the rest into a clear implementation plan.</p></details><details><summary>Can we start with something small?</summary><p>That is usually the best way to start. A Launch Kit gives us one useful proof point before you decide whether the wider operating system is worth building.</p></details></div></div></section>

    <section id="contact" class="contact section-pad"><div class="section-shell contact-grid"><div class="contact-copy reveal"><p class="kicker">Your turn</p><h2>Tell us what<br /><em>keeps repeating.</em></h2><p>Give us the messy version. We will reply with a useful first shape within two working days.</p><div class="contact-note"><span>✳</span><p>Good fit for founders, editorial teams, agencies, and operators who value clarity over hype.</p></div></div><form class="lead-form reveal reveal-delay" id="lead-form" novalidate><label>Name<input name="name" type="text" autocomplete="name" placeholder="Your name" required /></label><label>Work email<input name="email" type="email" autocomplete="email" placeholder="you@company.com" required /></label><label>What keeps repeating?<textarea name="message" rows="4" placeholder="A task, process, or bottleneck..." required></textarea></label><label class="checkbox"><input name="consent" type="checkbox" required /><span>I agree to be contacted about this enquiry.</span></label><button class="button button-primary" type="submit">Send the signal <span>↗</span></button><p class="form-status" role="status" aria-live="polite"></p></form></div></section>
  </main>
  <footer class="site-footer"><div class="section-shell footer-inner"><a class="brand" href="#top"><span class="brand-mark">✳</span><span>signal<span class="brand-muted">/</span>systems</span></a><p>Practical AI systems for content teams.</p><span>© 2025 Signal Systems</span></div></footer>
`;

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('is-open', !open);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
}));
document.querySelectorAll('.button, .nav-cta').forEach((link) => link.addEventListener('click', () => window.dispatchEvent(new CustomEvent('signal:cta-clicked', { detail: { label: link.textContent.trim() } }))));

document.querySelectorAll('.solution-card').forEach((card) => {
  const activate = () => {
    document.querySelectorAll('.solution-card').forEach((item) => item.classList.remove('is-active'));
    card.classList.add('is-active');
  };
  card.addEventListener('click', () => { activate(); window.dispatchEvent(new CustomEvent('signal:solution-selected', { detail: { solution: card.dataset.solution } })); });
  card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activate(); window.dispatchEvent(new CustomEvent('signal:solution-selected', { detail: { solution: card.dataset.solution } })); } });
});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

document.querySelector('#lead-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector('.form-status');
  if (!form.checkValidity()) { form.classList.add('has-error'); status.textContent = 'Please complete the fields above so we can reply.'; form.reportValidity(); return; }
  form.classList.remove('has-error');
  status.textContent = 'Thanks — your signal is on its way. We’ll be in touch within two working days.';
  form.reset();
  window.dispatchEvent(new CustomEvent('signal:lead-submitted', { detail: { source: 'landing-form', hasMessage: Boolean(form.message.value.trim()) } }));
});
