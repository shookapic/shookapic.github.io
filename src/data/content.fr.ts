import type { Content } from './types.ts'

const fr: Content = {
  profile: {
    name: 'Cédric Roulof',
    role: 'Ingénieur logiciel',
    note: 'développement fullstack & systèmes',
    location: 'Paris, France — originaire de La Réunion',
    availability: 'Ouvert aux opportunités en France ou en télétravail',
    email: 'cedric.roulof1@gmail.com',
    github: 'https://github.com/Shookapic',
    githubLabel: 'github.com/shookapic',
    lede: `Développeur fullstack et systèmes, un an d'expérience en production dans l'e-commerce, le secteur public et l'entreprise. Je livre des applications web et des API REST, et je construis de l'outillage développeur sur LLVM/Clang. Français natif, anglais professionnel.`,
  },

  ui: {
    seeWork: 'Voir les projets',
    downloadCv: 'Télécharger le CV',
    copy: 'Copier',
    copied: 'Copié',
    cvLabel: 'CV',
    restOnGithub: 'Le reste est sur',
    skipToWork: 'Aller aux projets',
    sections: 'Sections',
    themeToLight: 'Passer au thème clair',
    themeToDark: 'Passer au thème sombre',
    language: 'Langue',
  },

  statusLabels: {
    flagship: 'principal',
    shipping: 'en cours',
    live: 'en ligne',
    archived: 'archivé',
  },

  stats: [
    { value: '3', label: 'postes fullstack livrés' },
    { value: '24', label: 'dépôts dans l’organisation CoreTrace' },
    { value: '1er', label: 'hackathon Innov4Safe, 2024' },
    { value: '3.9', label: 'moyenne en échange en Corée' },
  ],

  marquee: [
    'LLVM / Clang',
    'Analyse statique',
    'SARIF',
    'API REST',
    'React',
    'Node.js',
    'Python',
    'C++20',
    'LLM locaux',
    'AWS',
    'Tests d’intrusion',
  ],

  nav: [
    { id: 'work', label: 'Projets' },
    { id: 'experience', label: 'Expérience' },
    { id: 'stack', label: 'Stack' },
    { id: 'security', label: 'Sécurité' },
    { id: 'about', label: 'À propos' },
    { id: 'contact', label: 'Contact' },
  ],

  headings: {
    work: { label: 'Projets choisis', title: 'Quatre projets qui méritent une lecture' },
    elsewhere: { label: 'Ailleurs', title: 'Ce que j’ai construit à côté' },
    experience: { label: 'Expérience', title: 'Un an à livrer en production' },
    stack: { label: 'Stack', title: 'Ce que j’utilise au quotidien' },
    security: { label: 'Sécurité', title: 'Le versant sécurité offensive' },
    about: { label: 'À propos', title: 'D’où tout cela vient' },
    contact: { label: 'Contact', title: 'Dites-moi ce que vous construisez.' },
  },

  featured: [
    {
      name: 'CoreTrace',
      status: 'flagship',
      meta: 'Plateforme d’analyse · 2025–aujourd’hui · Apache-2.0',
      description: `Un outil d’analyse statique C et C++ libre et open source, bâti sur LLVM/Clang 20, avec une sortie SARIF pour que les résultats arrivent directement dans les IDE et les portes qualité de CI. Un orchestrateur en ligne de commande pilote la couche compilateur et un ensemble d’analyseurs spécialisés — pile, concurrence, mémoire, instrumentation à l’exécution — capables de raisonner entre unités de traduction quand le contexte projet est nécessaire. Je le co-construis dans une équipe de quatre et je suis responsable de l’interface graphique. Il suscite déjà l’intérêt de contacts industriels dans des secteurs soumis à certification : embarqué, aéronautique, défense.`,
      tech: ['C++20', 'LLVM/Clang 20', 'CMake', 'Python', 'SARIF'],
      links: [
        { label: 'L’organisation', url: 'https://github.com/CoreTrace' },
        { label: 'Orchestrateur', url: 'https://github.com/CoreTrace/coretrace' },
        { label: 'Couche compilateur', url: 'https://github.com/CoreTrace/coretrace-compiler' },
      ],
    },
    {
      name: 'Ace',
      status: 'shipping',
      meta: 'Application de bureau · v0.1.11',
      description: `Une surcouche de discussion pour Claude et ChatGPT, pensée pour la confidentialité. L’authentification OAuth native vous connecte avec vos propres comptes — sans clé d’API, sans serveur tiers — puis ajoute les réponses en flux, les pièces jointes, la dictée vocale via Whisper et votre véritable historique de conversations chez les deux fournisseurs. L’application se masque des captures d’écran, vit dans la zone de notification derrière un raccourci global et livre des mises à jour automatiques signées.`,
      tech: ['Rust', 'Tauri v2', 'React', 'TypeScript'],
      links: [
        { label: 'Code source', url: 'https://github.com/shookapic/Ace' },
        { label: 'Versions', url: 'https://github.com/shookapic/Ace/releases' },
      ],
    },
    {
      name: 'MyEditor',
      status: 'live',
      meta: 'Application web · en ligne',
      description: `Un éditeur de PDF qui fonctionne entièrement dans le navigateur. Ouvrez un document, modifiez-le et annotez-le, puis déportez l’étape de signature sur un téléphone en scannant un QR code — les deux appareils s’appairent en pair-à-pair, si bien que le fichier ne quitte jamais le navigateur où il a été ouvert.`,
      tech: ['Next.js 16', 'React 19', 'TypeScript', 'pdf-lib', 'PDF.js', 'PeerJS'],
      links: [
        { label: 'Ouvrir l’application', url: 'https://shookapic.github.io/MyEditor/' },
        { label: 'Code source', url: 'https://github.com/shookapic/MyEditor' },
      ],
    },
    {
      name: 'ASCII_Art',
      status: 'archived',
      meta: 'Deux moteurs de rendu en C++',
      description: `Des pixels en entrée, des caractères en sortie. vid2ascii transcode un mp4 en images ASCII ; irl2ascii fait la même chose en direct depuis une webcam, dans le terminal, et vite.`,
      tech: ['C++', 'OpenCV', 'CMake'],
      links: [{ label: 'Code source', url: 'https://github.com/shookapic/ASCII_Art' }],
    },
  ],

  sideProjects: [
    {
      name: 'StreaMe',
      description: "Recopie d'écran iPhone vers Windows à très faible latence — décodage matériel, rendu GPU zéro-copie, 1080p60 sous 100 ms en LAN.",
      tech: ['C++20', 'Direct3D 11', 'Media Foundation', 'React'],
      url: 'https://github.com/Shookapic/StreaMe',
    },
    {
      name: 'TinyVM',
      description: "Une machine virtuelle 64 bits écrite de zéro — jeu d'instructions maison, assembleur et interpréteur de bytecode.",
      tech: ['C++', "Conception d'ISA", 'Bytecode'],
      url: 'https://github.com/Shookapic/TinyVM',
    },
    {
      name: 'Flowfy',
      description: 'Une alternative à Zapier : connecter des services et automatiser les workflows entre eux.',
      tech: ['Node', 'React'],
      url: 'https://github.com/Shookapic/Flowfy',
    },
    {
      name: 'TheBrickler',
      description: 'Un jeu idle multiplateforme livré en navigateur, desktop et mobile depuis une seule base de code.',
      tech: ['TypeScript', 'React', 'Phaser 3', 'Electron', 'Capacitor'],
      url: 'https://github.com/Shookapic/TheBrickler',
    },
    {
      name: 'Minishell',
      description: 'Un shell UNIX écrit en C — parsing, pipes, redirections, gestion des jobs, sans bibliothèque.',
      tech: ['C', 'POSIX'],
      url: 'https://github.com/Shookapic/Minishell',
    },
    {
      name: 'MyHunter',
      description: 'Duck Hunt reconstruit de zéro en C avec CSFML, en une semaine.',
      tech: ['C', 'CSFML'],
      url: 'https://github.com/Shookapic/MyHunter',
    },
  ],

  experience: [
    {
      company: 'Groupe Caille',
      title: 'Développeur fullstack',
      stack: 'Python · React · MySQL',
      place: 'La Réunion, France',
      period: 'Avr — Août 2025',
      bullets: [
        'Réécriture d’une application interne critique de WinDev vers une stack Python et React, avec de meilleures performances et une interface modernisée.',
        'Migration de la base de production d’Oracle vers MySQL, en préservant l’intégrité des données tout en réduisant les coûts de licence.',
        'Entretiens avec les référents de plusieurs services pour cartographier les besoins et orienter les décisions UI/UX.',
      ],
    },
    {
      company: 'Régal Vanille',
      title: 'Développeur fullstack',
      stack: 'Node.js · React · MySQL · AWS',
      place: 'La Réunion, France',
      period: 'Sep 2024 — Fév 2025',
      bullets: [
        'Construction d’une plateforme e-commerce de bout en bout — back-end Node.js, front-end React, données MySQL.',
        'Réarchitecture de l’hébergement sur AWS, avec une meilleure disponibilité du site.',
      ],
    },
    {
      company: 'Département de La Réunion (DSID)',
      title: 'Développeur fullstack',
      stack: 'PHP Laravel · Vue.js · C++',
      place: 'La Réunion, France',
      period: 'Août — Déc 2023',
      bullets: [
        'Déploiement d’un grand modèle de langage auto-hébergé pour les besoins internes, incluant la préparation du jeu de données et le fine-tuning.',
        'Conception et implémentation des API REST exposant le modèle aux applications internes.',
      ],
    },
  ],

  stack: [
    { group: 'Langages', items: ['C', 'C++20', 'Python', 'JavaScript', 'TypeScript', 'PHP', 'Rust', 'SQL', 'HLSL'] },
    { group: 'Front-end', items: ['React', 'Vue.js', 'Next.js', 'HTML', 'CSS', 'Figma'] },
    { group: 'Back-end & données', items: ['Node.js', 'Laravel', 'Conception d’API REST', 'MySQL', 'Oracle', 'Migrations'] },
    { group: 'Systèmes', items: ['LLVM', 'Clang', 'Analyse statique', 'SARIF', 'CMake', 'Linux'] },
    { group: 'IA / ML', items: ['Fine-tuning de LLM', 'llama.cpp', 'Déploiement de LLM locaux'] },
    { group: 'DevOps & cloud', items: ['Docker', 'AWS', 'DigitalOcean', 'CI/CD', 'GitHub Actions', 'Git', 'SSH'] },
    { group: 'Sécurité', items: ['Tests d’intrusion', 'Burp Suite', 'Hydra', 'CTF', 'Remédiation'] },
    { group: 'Jeux vidéo', items: ['Unreal Engine 5', 'Unity', 'Three.js'] },
  ],

  security: {
    lede: `La sécurité offensive, c’est là que j’ai commencé et là que je passe encore mes soirées. Je l’ai enseignée, je l’ai pratiquée en compétition, et je tiens le compte sur TryHackMe — un relevé public et vérifiable plutôt qu’une ligne sur un CV.`,
    profileUrl: 'https://tryhackme.com/p/sh00kapic',
    profileLabel: 'tryhackme.com/p/sh00kapic',
    profileCta: 'Le profil complet est sur',
    stats: [
      { value: '0x9', label: 'rang TryHackMe', note: 'Mage' },
      { value: 'Top 4%', label: 'classement mondial', note: 'rang n° 86 794' },
      { value: '103', label: 'rooms terminées' },
      { value: '14', label: 'badges obtenus' },
    ],
    hallTitle: 'Panthéon',
    hall: [
      {
        title: '0x9 — Mage',
        meta: 'TryHackMe · niveau 59',
        detail: `Neuvième palier de la plateforme, dans les 4 % les mieux classés. 103 rooms terminées sur les parcours offensifs et défensifs, et 14 badges en chemin.`,
        url: 'https://tryhackme.com/p/sh00kapic',
      },
      {
        title: 'Chisel — top 10 des plus rapides',
        meta: 'Epitech · 2025',
        detail: `Un programme de sécurité offensive de trois semaines : trouver la vulnérabilité, l’exploiter, rédiger la remédiation. Terminé parmi les dix plus rapides de la promotion.`,
      },
      {
        title: 'Cybersécurité, enseignée',
        meta: 'Epitech · 2024',
        detail: `Conception et animation du module d’introduction à la cybersécurité pour les première année — le moyen le plus rapide de savoir si l’on comprend vraiment une attaque.`,
      },
    ],
  },

  education: [
    {
      school: 'Keimyung University — campus de Seongso',
      detail: 'Semestre d’échange, développement de jeux vidéo · Corée du Sud · moyenne 3,9 / 4,0',
      period: 'Août 2025 — 2026',
    },
    {
      school: 'Epitech',
      detail: 'Master en informatique (RNCP niveau 7), Expert en ingénierie logicielle · 5e année',
      period: 'Sep 2022 — 2027',
    },
  ],

  highlights: [
    {
      year: '2024',
      label: 'Grand prix du hackathon Innov4Safe, Préfecture de La Réunion — un système intelligent qui remonte automatiquement les données de terrain pendant les épisodes cycloniques.',
    },
  ],

  about: {
    paragraphs: [
      'J’ai commencé par les jeux et les terminaux, et j’ai fini sur les compilateurs. Le fil conducteur, c’est un goût pour les outils qui disent la vérité sur votre programme — un analyseur statique rapide, un diagnostic lisible, un build qui échoue pour une raison sur laquelle on peut agir.',
      'Côté professionnel, j’ai livré trois produits fullstack : une application interne réécrite pour sortir de WinDev, une plateforme e-commerce sur AWS, et un LLM auto-hébergé avec les API REST pour l’atteindre. Le point commun : prendre ce qui fait déjà tourner une entreprise et le rendre plus rapide, moins cher, ou simplement maintenable.',
      'Aujourd’hui l’essentiel de mon temps va à CoreTrace, où je suis responsable de l’interface graphique dans une équipe de quatre. Je termine un master à Epitech, installé à Paris après un semestre d’échange en Corée du Sud, et je suis ouvert aux opportunités en France comme en télétravail.',
    ],
    educationTitle: 'Formation',
    recognitionTitle: 'Distinctions',
    languagesLabel: 'Langues',
    languagesValue: 'Français (natif), anglais (professionnel)',
    basedLabel: 'Basé à',
  },

  contact: { title: 'Dites-moi ce que vous construisez.' },

  cvs: [
    { lang: 'EN', code: 'en', label: 'English', file: '/assets/EN-Cedric_Roulof_CV.pdf' },
    { lang: 'FR', code: 'fr', label: 'Français', file: '/assets/FR-Cedric_Roulof_CV.pdf' },
  ],
}

export default fr
