// Mock data for NEXUS Hardware - clone épuré de hardwarefr.fr

export const featuredPCs = [
  {
    id: 1,
    name: "BUILD WHITE FROST",
    series: "AIO 360 · BLANC",
    gpu: "Radeon XFX",
    cpu: "Plateforme AM5",
    ram: "DDR5 RGB",
    storage: "Watercooling NZXT",
    image: "https://customer-assets.emergentagent.com/job_hardware-connect-8/artifacts/4in8dug8_IMG_1257.png",
    tag: "BUILD CUSTOM",
    color: "#C7F84E"
  },
  {
    id: 2,
    name: "BUILD ATELIER",
    series: "TEST & VALIDATION",
    gpu: "GeForce RTX Gigabyte",
    cpu: "Watercooling AIO",
    ram: "Mémoire HyperX",
    storage: "Banc de test 72h",
    image: "https://customer-assets.emergentagent.com/job_hardware-connect-8/artifacts/pe4y21d9_IMG_1258.png",
    tag: "EN COURS",
    color: "#FF6B35"
  },
  {
    id: 3,
    name: "BUILD NEON DESK",
    series: "RGB SETUP",
    gpu: "GeForce RTX Gigabyte",
    cpu: "Arctic Liquid Freezer",
    ram: "DDR5 RGB",
    storage: "Setup gaming complet",
    image: "https://customer-assets.emergentagent.com/job_hardware-connect-8/artifacts/w2g54kmx_IMG_1259.png",
    tag: "RGB ÉDITION",
    color: "#FF3CAC"
  }
];

export const services = [
  {
    id: 1,
    title: "Montage PC sur mesure",
    desc: "Devis 100% personnalisé selon votre budget et vos besoins. Composants premium uniquement.",
    icon: "Wrench",
    cta: "Obtenir un devis"
  },
  {
    id: 2,
    title: "Dépannage informatique",
    desc: "Intervention rapide à domicile ou en atelier. Diagnostic gratuit en moins de 24h.",
    icon: "LifeBuoy",
    cta: "Demander une aide"
  },
  {
    id: 3,
    title: "Cybersécurité",
    desc: "Audit complet, protection avancée et formation. Pour particuliers & TPE/PME.",
    icon: "Shield",
    cta: "Sécuriser mon système"
  },
  {
    id: 4,
    title: "Impression 3D",
    desc: "Pièces sur mesure, prototypes et objets décoratifs. Précision millimétrique.",
    icon: "Box",
    cta: "Voir les objets"
  },
  {
    id: 5,
    title: "Setup personnalisé",
    desc: "Bureau ergonomique, éclairage RGB, gestion des câbles. Le setup de vos rêves.",
    icon: "Monitor",
    cta: "Concevoir mon setup"
  },
  {
    id: 6,
    title: "Maintenance & Suivi",
    desc: "Contrat annuel, nettoyage, mises à jour et optimisation. Performances garanties.",
    icon: "Settings",
    cta: "Souscrire"
  }
];

export const articles = [
  {
    id: 1,
    title: "RTX 5090 vs RX 9070 XT : Quel GPU pour 2026 ?",
    category: "Test",
    date: "15 Jan 2026",
    readTime: "8 min",
    excerpt: "Comparatif complet entre les deux mastodontes du gaming haut de gamme. Performances, prix, efficacité énergétique...",
    image: "https://images.unsplash.com/photo-1716967318503-05b7064afa41?crop=entropy&cs=srgb&fm=jpg&q=85",
    author: "Antoine M."
  },
  {
    id: 2,
    title: "Guide ultime du PC silencieux en 2026",
    category: "Guide",
    date: "12 Jan 2026",
    readTime: "12 min",
    excerpt: "Watercooling, ventilateurs Noctua, isolation phonique : tous nos conseils pour un PC inaudible sans compromis sur la perf.",
    image: "https://images.unsplash.com/photo-1632749042303-7f7a18ed6ff0?crop=entropy&cs=srgb&fm=jpg&q=85",
    author: "Léa D."
  },
  {
    id: 3,
    title: "Les meilleurs claviers mécaniques sous 150€",
    category: "Sélection",
    date: "10 Jan 2026",
    readTime: "6 min",
    excerpt: "Notre TOP 5 des claviers mécaniques avec switches premium, RGB et qualité de frappe exceptionnelle.",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?crop=entropy&cs=srgb&fm=jpg&q=85",
    author: "Marc V."
  },
  {
    id: 4,
    title: "Écran OLED 240Hz : la révolution gaming",
    category: "Test",
    date: "08 Jan 2026",
    readTime: "9 min",
    excerpt: "Les nouveaux écrans OLED 240Hz changent radicalement l'expérience. On a testé les 3 modèles phares du moment.",
    image: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?crop=entropy&cs=srgb&fm=jpg&q=85",
    author: "Sophie L."
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Pumpkin",
    role: "Streamer / Twitch",
    rating: 5,
    text: "Sérieux, sympathique, compétent et passionné. Réponses à toutes mes questions, respect du budget, composants de qualité. Emballage au top. Confiance 100%."
  },
  {
    id: 2,
    name: "Maxime Conjard",
    role: "Développeur indépendant",
    rating: 5,
    text: "Service client et rapidité de la commande à la réception très propre. Foncez, il n'y a pas de doute. Dommage qu'il n'y ait pas 6 étoiles !"
  },
  {
    id: 3,
    name: "Frédéric Lepeltier",
    role: "Parent d'élève",
    rating: 5,
    text: "Personne passionnée et très professionnelle. Configuration sur mesure pour la scolarité de mon fils. Respect du budget et machine magnifique. Je recommande les yeux fermés."
  },
  {
    id: 4,
    name: "Hugo Jan",
    role: "Gamer compétitif",
    rating: 5,
    text: "Prise en charge complète du début à la fin. Réponses rapides et pertinentes. Le PC est comme je l'imaginais et même mieux. Je recommande sans crainte !"
  }
];

export const stats = [
  { value: "+160", label: "Avis 5/5" },
  { value: "+500", label: "PC assemblés" },
  { value: "24h", label: "Réponse devis" },
  { value: "2 ans", label: "Garantie" }
];

export const navItems = [
  { label: "Accueil", href: "/" },
  { label: "PC sur mesure", href: "/pc-sur-mesure" },
  { label: "Configs", href: "/configs" },
  { label: "Devis", href: "/devis" }
];
