import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const pricingFr = {
  eyebrow: 'Tarifs transparents',
  title: 'Trois formules.',
  titleAccent: 'Zéro surprise.',
  intro:
    'Choisissez la formule qui correspond à votre projet. Chaque site est conçu sur mesure, pensé pour votre métier, et livré dans les délais. Pas de jargon, pas de frais cachés.',
  paymentLine: 'Paiement sécurisé via PayPal',
  examplesOne: 'Voir un exemple',
  examplesMany: 'Nos exemples',
  addonsTitle: "Besoin de plus ? Ajoutez ce qu'il vous faut.",
  addonsIntro:
    "Chaque formule peut être enrichie avec des options à la carte. Choisissez d'abord une formule ci-dessus si vous voulez qu'elle soit présélectionnée avec chaque option.",
  addonCta: 'Ajouter à mon devis',
  selectPlanCta: 'Choisir pour les options',
  planSelectedCta: 'Formule sélectionnée',
  addonsLinkedHint: 'Les options ouvrent le devis avec la formule « {plan} ».',
  clearPlanSelection: 'Effacer le choix de formule',
  faqTitle: 'Questions fréquentes sur nos tarifs',
  finalTitle: 'Une question ? Un projet hors cadre ?',
  finalSub: 'Parlons-en directement. Premier échange gratuit, sans engagement.',
  finalCtaContact: 'Lancer mon projet',
  finalCtaWhatsapp: 'Discuter sur WhatsApp',
  plans: [
    {
      id: 'essentiel',
      name: 'Essentiel',
      tagline: 'Votre présence en ligne, simple et efficace.',
      price: '890',
      priceNote: 'TVAC · paiement unique',
      cta: 'Lancer mon site',
      ctaQuery: 'formule=essentiel',
      highlighted: false,
      badge: null,
      features: [
        "Site vitrine multi-pages (jusqu'à 5 pages)",
        'Design responsive mobile-first',
        'Développement HTML / CSS / JS optimisé',
        'Formulaire de contact',
        'SEO de base (balises, sitemap, meta)',
        'Bannière cookies RGPD',
        'Code livré, prêt pour la mise en production',
        'Checklist et conseils pour passer en ligne',
        'Livraison en 7 jours',
      ],
      examples: [
        {
          name: 'depan.be',
          desc: 'Dépannage plomberie & électricité, Bruxelles',
          href: 'https://depan-be.vercel.app',
        },
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      tagline: 'Un site qui marque les esprits.',
      price: '1 490',
      priceNote: 'TVAC · paiement unique',
      cta: 'Je veux ce site',
      ctaQuery: 'formule=pro',
      highlighted: true,
      badge: 'Le plus populaire',
      features: [
        'Tout ce qui est inclus dans Essentiel',
        'Développement Next.js + React',
        'Design sur mesure avec identité visuelle dédiée',
        'Animations fluides (Framer Motion)',
        "Jusqu'à 6 pages routées",
        'Micro-interactions et transitions',
        'SEO avancé + Google Search Console',
        'Optimisation performance (Lighthouse 90+)',
        'Intégration Google Avis',
        '1 mois de support post-livraison inclus',
      ],
      examples: [
        {
          name: 'Bel Coiffure',
          desc: 'Barbershop, Woluwe-Saint-Lambert',
          href: 'https://bel-coiffure.vercel.app',
        },
        {
          name: 'Coiffure Cristina',
          desc: 'Salon, Neuchâtel',
          href: 'https://coiffure-cristina.vercel.app',
        },
      ],
    },
    {
      id: 'signature',
      name: 'Signature',
      tagline: "L'expérience premium, pilotée par vous.",
      price: '3 490',
      priceNote: 'TVAC · paiement unique · à partir de',
      cta: 'Discutons-en',
      ctaQuery: 'formule=signature',
      highlighted: false,
      badge: null,
      features: [
        'Tout ce qui est inclus dans Pro',
        'Backend sur mesure (Next.js API / Node)',
        'Base de données PostgreSQL (Neon / Supabase)',
        'Authentification sécurisée (NextAuth)',
        'Tableau de bord privé avec statistiques en temps réel',
        'Gestion de contenu autonome depuis le dashboard',
        'Direction artistique complète',
        'Animations avancées (GSAP, scroll-based, glassmorphism)',
        'Optimisation Lighthouse 95+',
        'Intégrations tierces (booking, newsletter, analytics)',
        '3 mois de support + 1 session de retouches offerte',
      ],
      examples: [
        {
          name: 'EE Studio',
          desc: 'Studio créatif, Kinshasa',
          href: 'https://ee-studio.vercel.app',
        },
      ],
    },
  ],
  addons: [
    {
      icon: 'FileText',
      label: 'Rédaction de contenu',
      price: '+ 290 €',
      description:
        'Textes professionnels pour vos pages : accroches, services, à propos. Ton adapté à votre marque, optimisé SEO.',
      slug: 'redaction',
    },
    {
      icon: 'Globe',
      label: 'Site multilingue',
      price: '+ 390 €',
      description:
        'Votre site traduit en FR / NL / EN avec routing automatique. Idéal pour toucher une clientèle bruxelloise et internationale.',
      slug: 'multilingue',
    },
    {
      icon: 'FileText',
      label: 'Blog / CMS headless',
      price: '+ 490 €',
      description:
        'Ajoutez un blog éditable depuis un back-office simple. Parfait pour le SEO long terme et partager votre expertise.',
      slug: 'blog',
    },
    {
      icon: 'Calendar',
      label: 'Réservation intégrée',
      price: '+ 590 €',
      description:
        'Système de prise de rendez-vous en ligne synchronisé à votre agenda. Vos clients réservent directement depuis votre site.',
      slug: 'reservation',
    },
    {
      icon: 'Palette',
      label: 'Logo & identité visuelle',
      price: '+ 390 €',
      description:
        'Logo sur mesure, palette de couleurs, typographies et charte graphique. Une identité cohérente sur tous vos supports.',
      slug: 'branding',
    },
    {
      icon: 'Wrench',
      label: 'Maintenance mensuelle',
      price: '49 €/mois',
      description:
        "Mises à jour, sauvegardes, corrections, petites modifications de contenu. On s'occupe de tout, vous êtes tranquille.",
      slug: 'maintenance',
    },
  ],
  faq: [
    {
      q: 'Les prix affichés sont-ils définitifs ?',
      a: 'Oui. Le prix indiqué est le prix que vous payez, TVAC. Aucun frais caché. Si votre projet sort du cadre de la formule, nous vous le disons clairement avant de commencer, avec un devis détaillé.',
    },
    {
      q: 'Comment se passe le paiement ?',
      a: '30 % à la signature du devis pour lancer le projet, le solde à la livraison. Paiement sécurisé via PayPal uniquement.',
    },
    {
      q: 'Combien de temps pour livrer mon site ?',
      a: 'Essentiel : environ 7 jours. Pro : 2 à 3 semaines. Signature : 4 à 6 semaines selon le scope. Les délais sont convenus ensemble dès le départ.',
    },
    {
      q: "Le nom de domaine et l'hébergement sont-ils inclus ?",
      a: "Non — ce n'est pas ce que nous vendons. Vous achetez votre nom de domaine et votre hébergement chez les fournisseurs de votre choix ; nous vous orientons et vous aidons à brancher le site au moment de la mise en ligne.",
    },
    {
      q: 'Puis-je modifier mon site moi-même après la livraison ?',
      a: "Avec les formules Essentiel et Pro, les modifications se font via nous (tarif horaire ou maintenance mensuelle). Avec Signature, vous disposez d'un tableau de bord pour tout gérer en autonomie.",
    },
    {
      q: 'Et si mon projet ne rentre dans aucune formule ?',
      a: 'Aucun problème — contactez-nous et on construit un devis sur mesure adapté à votre vision et votre budget.',
    },
  ],
};

const pricingEn = {
  eyebrow: 'Transparent pricing',
  title: 'Three plans.',
  titleAccent: 'Zero surprises.',
  intro:
    'Pick the plan that fits your project. Every site is tailor-made for your business and delivered on time. No jargon, no hidden fees.',
  paymentLine: 'Secure payment via PayPal',
  examplesOne: 'See an example',
  examplesMany: 'Our examples',
  addonsTitle: 'Need more? Add what you need.',
  addonsIntro:
    'Each plan can be extended with à la carte options. Pick a plan above first if you want it pre-selected when you add options.',
  addonCta: 'Add to my quote',
  selectPlanCta: 'Select for add-ons',
  planSelectedCta: 'Plan selected',
  addonsLinkedHint: 'Add-ons open the quote with the « {plan} » plan.',
  clearPlanSelection: 'Clear plan choice',
  faqTitle: 'Frequently asked questions',
  finalTitle: 'A question? A project outside the box?',
  finalSub: "Let's talk directly. First call is free, no obligation.",
  finalCtaContact: 'Start my project',
  finalCtaWhatsapp: 'Chat on WhatsApp',
  plans: [
    {
      id: 'essentiel',
      name: 'Essential',
      tagline: 'Your online presence, simple and effective.',
      price: '890',
      priceNote: 'VAT incl. · one-time payment',
      cta: 'Launch my site',
      ctaQuery: 'formule=essentiel',
      highlighted: false,
      badge: null,
      features: [
        'Multi-page showcase site (up to 5 pages)',
        'Mobile-first responsive design',
        'Optimized HTML / CSS / JS development',
        'Contact form',
        'Basic SEO (tags, sitemap, meta)',
        'GDPR cookie banner',
        'Source code delivered, production-ready',
        'Checklist and guidance for going live',
        'Delivery in 7 days',
      ],
      examples: [
        {
          name: 'depan.be',
          desc: 'Plumbing & electrical repairs, Brussels',
          href: 'https://depan-be.vercel.app',
        },
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      tagline: 'A site that stands out.',
      price: '1 490',
      priceNote: 'VAT incl. · one-time payment',
      cta: 'I want this site',
      ctaQuery: 'formule=pro',
      highlighted: true,
      badge: 'Most popular',
      features: [
        'Everything in Essential',
        'Next.js + React development',
        'Custom design with dedicated visual identity',
        'Smooth animations (Framer Motion)',
        'Up to 6 routed pages',
        'Micro-interactions and transitions',
        'Advanced SEO + Google Search Console',
        'Performance tuning (Lighthouse 90+)',
        'Google Reviews integration',
        '1 month post-launch support included',
      ],
      examples: [
        {
          name: 'Bel Coiffure',
          desc: 'Barbershop, Woluwe-Saint-Lambert',
          href: 'https://bel-coiffure.vercel.app',
        },
        {
          name: 'Coiffure Cristina',
          desc: 'Salon, Neuchâtel',
          href: 'https://coiffure-cristina.vercel.app',
        },
      ],
    },
    {
      id: 'signature',
      name: 'Signature',
      tagline: 'The premium experience, driven by you.',
      price: '3 490',
      priceNote: 'VAT incl. · one-time · from',
      cta: "Let's talk",
      ctaQuery: 'formule=signature',
      highlighted: false,
      badge: null,
      features: [
        'Everything in Pro',
        'Custom backend (Next.js API / Node)',
        'PostgreSQL database (Neon / Supabase)',
        'Secure authentication (NextAuth)',
        'Private dashboard with real-time stats',
        'Self-service content management',
        'Full art direction',
        'Advanced animations (GSAP, scroll, glassmorphism)',
        'Lighthouse 95+ optimization',
        'Third-party integrations (booking, newsletter, analytics)',
        '3 months support + 1 revision session',
      ],
      examples: [
        {
          name: 'EE Studio',
          desc: 'Creative studio, Kinshasa',
          href: 'https://ee-studio.vercel.app',
        },
      ],
    },
  ],
  addons: [
    {
      icon: 'FileText',
      label: 'Copywriting',
      price: '+ €290',
      description:
        'Professional copy for your pages: hooks, services, about. Tone matched to your brand, SEO-friendly.',
      slug: 'redaction',
    },
    {
      icon: 'Globe',
      label: 'Multilingual site',
      price: '+ €390',
      description:
        'Your site in FR / NL / EN with automatic routing. Ideal for Brussels and international clients.',
      slug: 'multilingue',
    },
    {
      icon: 'FileText',
      label: 'Blog / headless CMS',
      price: '+ €490',
      description:
        'An editable blog from a simple back office. Great for long-term SEO and sharing expertise.',
      slug: 'blog',
    },
    {
      icon: 'Calendar',
      label: 'Booking integration',
      price: '+ €590',
      description:
        'Online appointment booking synced with your calendar. Clients book straight from your site.',
      slug: 'reservation',
    },
    {
      icon: 'Palette',
      label: 'Logo & visual identity',
      price: '+ €390',
      description:
        'Custom logo, colour palette, typography and brand guidelines. Consistent identity everywhere.',
      slug: 'branding',
    },
    {
      icon: 'Wrench',
      label: 'Monthly maintenance',
      price: '€49/mo',
      description:
        'Updates, backups, fixes, small content tweaks. We handle it—you relax.',
      slug: 'maintenance',
    },
  ],
  faq: [
    {
      q: 'Are the prices final?',
      a: 'Yes. The price shown is what you pay, VAT included. No hidden fees. If your project goes beyond the plan, we tell you upfront with a detailed quote.',
    },
    {
      q: 'How does payment work?',
      a: '30% when you sign off the quote to start, balance on delivery. Secure payment via PayPal only.',
    },
    {
      q: 'How long until my site is live?',
      a: 'Essential: about 7 days. Pro: 2–3 weeks. Signature: 4–6 weeks depending on scope. Timelines are agreed together from day one.',
    },
    {
      q: 'Are domain and hosting included?',
      a: "No — we don't sell those. You buy your domain and hosting from providers you choose; we guide you and help connect the site when we go live.",
    },
    {
      q: 'Can I edit the site myself later?',
      a: 'On Essential and Pro, changes go through us (hourly rate or monthly maintenance). On Signature, you get a dashboard to manage everything yourself.',
    },
    {
      q: 'What if none of the plans fit?',
      a: 'No problem—contact us and we will build a custom quote for your vision and budget.',
    },
  ],
};

for (const [file, pricing] of [
  ['messages/fr.json', pricingFr],
  ['messages/en.json', pricingEn],
]) {
  const p = path.join(root, file);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  data.pricing = pricing;
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
}

console.log('Injected pricing into fr.json and en.json');
