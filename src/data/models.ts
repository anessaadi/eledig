export type Bilingual = { fr: string; ar: string };

export type ModelColor = {
  id: string;
  label: Bilingual;
  hex: string;   // dot / brand shade
  bg: string;    // invitation background (light)
  ink: string;   // invitation text (dark, legible)
};

export type ImageSlot = { key: string; label: string };

export type Model = {
  slug: string;
  name: Bilingual;
  description: Bilingual;
  price: number;          // in DZD
  languages: ('fr' | 'ar')[];
  variant: 'jardin' | 'royal-bordeaux' | 'islamic' | 'rosa' | 'elegance' | 'kabyle' | 'golden' | 'gala' | 'mariage' | 'galaxy';
  colors: ModelColor[];
  image?: string;         // path relative to /public, e.g. /models/layla.jpg
  /** 3-digit number string used to derive product showcase images:
   *  /productpics/template {productNum} {colorId}.webp */
  productNum?: string;
  colorImages?: Record<string, { heroImage: string; closingImage: string; envelopeDown: string; envelopeUp: string }>;
  imageSlots?: ImageSlot[];
};

// Soft French-stationery theme palettes (dot / background / text)
const THEME = {
  bordeaux: { hex: '#8B1E32', bg: '#F1E6E8', ink: '#7A1828' },
  beige:    { hex: '#8b5e3c', bg: '#FDF8EF', ink: '#3d2810' },
  noir:     { hex: '#c9a055', bg: '#111111', ink: '#ffffff' },
  black:    { hex: '#111111', bg: '#111111', ink: '#c9a055' },
  rose:     { hex: '#B99A9A', bg: '#F4EDED', ink: '#6E4A4A' },
  gold:     { hex: '#C8B08A', bg: '#F7F2EA', ink: '#6B5A3C' },
  sage:     { hex: '#AEB9A1', bg: '#F1F4EE', ink: '#41513C' },
  navy:     { hex: '#072b60', bg: '#EDF0F8', ink: '#072b60' },
  sky:      { hex: '#3a8aad', bg: '#E8F4F8', ink: '#091e30' },
  burgundy: { hex: '#9b1c3e', bg: '#FDF2F4', ink: '#6B1228' },
  blue:     { hex: '#1a56db', bg: '#EEF2FF', ink: '#1E3A8A' },
  green:    { hex: '#2e7d32', bg: '#E8F5E9', ink: '#1b5e20' },
  purple:   { hex: '#7b1fa2', bg: '#F3E5F5', ink: '#4a148c' },
  pink:     { hex: '#c06080', bg: '#FDF0F4', ink: '#5a1028' },
  plum:     { hex: '#a03878', bg: '#F8EEF6', ink: '#5a0840' },
  violet:   { hex: '#7040c0', bg: '#F0E8FF', ink: '#3a1060' },
  midnight: { hex: '#4060c0', bg: '#E8EEFF', ink: '#1a2860' },
};

const C = (
  key: keyof typeof THEME,
  label: Bilingual,
): ModelColor => ({ id: key, label, ...THEME[key] });

export const MODELS: Model[] = [
  {
    slug: 'jardin-blush',
    productNum: '009',
    name: { fr: 'Jardin', ar: 'جاردان' },
    description: {
      fr: 'Enveloppe gauche-droite, palette naturelle inspirée des jardins en fleurs.',
      ar: 'ظرف يفتح يميناً ويساراً، بألوان طبيعية مستوحاة من الحدائق المزهرة.',
    },
    price: 8900,
    languages: ['fr', 'ar'],
    variant: 'jardin',
    image: '/templates/jardin/templatecard.webp',
    colors: [
      C('burgundy', { fr: 'Bordeaux', ar: 'بوردو' }),
      C('blue',     { fr: 'Bleu',     ar: 'أزرق' }),
      C('purple',   { fr: 'Violet',   ar: 'بنفسجي' }),
    ],
    imageSlots: [
      { key: 'heroImage',    label: 'Image héro' },
      { key: 'closingImage', label: 'Image de fermeture' },
    ],
  },
  {
    slug: 'galaxy',
    productNum: '003',
    name: { fr: 'Galaxy', ar: 'غالاكسي' },
    description: {
      fr: 'Une vidéo galactique en fond, un voile bordeaux et une incrustation de texte cinématographique.',
      ar: 'فيديو مجري في الخلفية، طبقة بوردو، وتراكب نصي سينمائي.',
    },
    price: 8900,
    languages: ['fr', 'ar'],
    variant: 'galaxy',
    image: '/templates/galaxy/templatecard.webp',
    colors: [
      C('burgundy', { fr: 'Bordeaux',  ar: 'بوردو'    }),
      C('violet',   { fr: 'Violet',    ar: 'بنفسجي'   }),
      C('navy',     { fr: 'Bleu nuit', ar: 'أزرق ليلي' }),
    ],
    imageSlots: [
      { key: 'image1', label: 'Image 1 (héro)' },
      { key: 'image2', label: 'Image 2 (milieu)' },
      { key: 'image3', label: 'Image 3 (fermeture)' },
    ],
  },
  {
    slug: 'mariage',
    productNum: '010',
    name: { fr: 'Mariage', ar: 'زواج' },
    description: {
      fr: 'Un faire-part cinématographique avec vidéo plein écran, voile noir et touches dorées.',
      ar: 'دعوة سينمائية بفيديو بملء الشاشة، وطبقة سوداء شفافة، ولمسات ذهبية.',
    },
    price: 8900,
    languages: ['fr', 'ar'],
    variant: 'mariage',
    image: '/templates/mariage/templatecard.webp',
    colors: [
      C('noir', { fr: 'Noir & Or', ar: 'أسود وذهبي' }),
    ],
    imageSlots: [
      { key: 'bottomImage', label: 'Image de fermeture' },
    ],
  },
  {
    slug: 'kabyle',
    productNum: '008',
    name: { fr: 'Kabyle', ar: 'قبايلي' },
    description: {
      fr: 'Un faire-part aux motifs géométriques berbères, dans une palette naturelle beige et terre.',
      ar: 'دعوة بزخارف هندسية أمازيغية في لوحة ألوان بيج وطيني طبيعية.',
    },
    price: 8900,
    languages: ['fr', 'ar'],
    variant: 'kabyle',
    image: '/templates/kabyle/template.webp',
    colors: [
      C('beige', { fr: 'Beige', ar: 'بيج' }),
    ],
    imageSlots: [
      { key: 'heroImage',    label: 'Image héro' },
      { key: 'closingImage', label: 'Image de fermeture' },
    ],
  },
  {
    slug: 'golden',
    productNum: '007',
    name: { fr: 'Golden', ar: 'غولدن' },
    description: {
      fr: 'Un faire-part luxueux aux reflets dorés, disponible en bordeaux chaud ou bleu saphir.',
      ar: 'دعوة فاخرة بلمسات ذهبية، متاحة بدرجة البوردو الدافئة أو الأزرق الياقوتي.',
    },
    price: 8900,
    languages: ['fr', 'ar'],
    variant: 'golden',
    image: '/templates/golden/templatecard.webp',
    colors: [
      C('burgundy', { fr: 'Bordeaux', ar: 'بوردو' }),
      C('blue',     { fr: 'Bleu',     ar: 'أزرق' }),
      C('green',    { fr: 'Vert',     ar: 'أخضر' }),
      C('black',    { fr: 'Noir',     ar: 'أسود' }),
    ],
    imageSlots: [
      { key: 'heroImage',    label: 'Image héro' },
      { key: 'closingImage', label: 'Image de fermeture' },
    ],
  },
  {
    slug: 'gala',
    productNum: '006',
    name: { fr: 'Gala', ar: 'غالا' },
    description: {
      fr: 'Élégance formelle pour un grand événement, en bordeaux profond ou bleu nuit.',
      ar: 'أناقة رسمية لمناسبة كبرى، بالبوردو العميق أو الأزرق الليلي.',
    },
    price: 8900,
    languages: ['fr', 'ar'],
    variant: 'gala',
    image: '/templates/gala/templatecard.webp',
    colors: [
      C('burgundy', { fr: 'Bordeaux', ar: 'بوردو' }),
      C('blue',     { fr: 'Bleu',     ar: 'أزرق' }),
      C('green',    { fr: 'Vert',     ar: 'أخضر' }),
      C('purple',   { fr: 'Violet',   ar: 'بنفسجي' }),
    ],
    imageSlots: [
      { key: 'heroImage',    label: 'Image héro' },
      { key: 'closingImage', label: 'Image de fermeture' },
    ],
  },
  {
    slug: 'dentelle',
    productNum: '001',
    name: { fr: 'Dentelle', ar: 'دونتال' },
    description: {
      fr: "Fond bordeaux profond avec animation d'enveloppe en images, typographie Cormorant, calendrier dynamique et image hero plein écran.",
      ar: 'خلفية بوردو داكنة مع رسوم متحركة للظرف، طباعة Cormorant، تقويم ديناميكي وصورة رئيسية بملء الشاشة.',
    },
    price: 8900,
    languages: ['fr', 'ar'],
    variant: 'royal-bordeaux',
    image: '/templates/royal-bordeaux/dentelle.webp',
    colors: [
      C('green',    { fr: 'Vert',     ar: 'أخضر' }),
      C('blue',     { fr: 'Bleu',     ar: 'أزرق' }),
      C('burgundy', { fr: 'Bordeaux', ar: 'بوردو' }),
      C('purple',   { fr: 'Violet',   ar: 'بنفسجي' }),
    ],
    imageSlots: [
      { key: 'heroImage',    label: 'Image héro' },
      { key: 'closingImage', label: 'Image de fermeture' },
    ],
  },
  {
    slug: 'rosa',
    productNum: '004',
    name: { fr: 'Rosa', ar: 'روزا' },
    description: {
      fr: 'Un faire-part romantique aux teintes florales, disponible en bordeaux chaud ou bleu élégant.',
      ar: 'دعوة رومانسية بألوان زهرية، متاحة بدرجة البوردو الدافئة أو الأزرق الأنيق.',
    },
    price: 8900,
    languages: ['fr', 'ar'],
    variant: 'rosa',
    image: '/templates/rosa/rosatemplate.webp',
    colors: [
      C('burgundy', { fr: 'Bordeaux', ar: 'بوردو' }),
      C('blue',     { fr: 'Bleu',     ar: 'أزرق' }),
      C('purple',   { fr: 'Violet',   ar: 'بنفسجي' }),
      C('gold',     { fr: 'Or',       ar: 'ذهبي' }),
    ],
    imageSlots: [
      { key: 'heroImage',    label: 'Image héro' },
      { key: 'closingImage', label: 'Image de fermeture' },
    ],
  },
  {
    slug: 'elegance',
    productNum: '005',
    name: { fr: 'Élégance', ar: 'اليجونص' },
    description: {
      fr: 'Un faire-part raffiné aux lignes épurées, disponible en bordeaux chaud ou bleu élégant.',
      ar: 'دعوة راقية بخطوط أنيقة، متاحة بدرجة البوردو الدافئة أو الأزرق الأنيق.',
    },
    price: 8900,
    languages: ['fr', 'ar'],
    variant: 'elegance',
    image: '/templates/elegance/elegancetemplate.webp',
    colors: [
      C('burgundy', { fr: 'Bordeaux', ar: 'بوردو' }),
      C('blue',     { fr: 'Bleu',     ar: 'أزرق' }),
      C('green',    { fr: 'Vert',     ar: 'أخضر' }),
      C('purple',   { fr: 'Violet',   ar: 'بنفسجي' }),
    ],
    imageSlots: [
      { key: 'heroImage',    label: 'Image héro' },
      { key: 'closingImage', label: 'Image de fermeture' },
    ],
  },
  {
    slug: 'islamic-or',
    productNum: '002',
    name: { fr: 'Islamique', ar: 'إسلامي' },
    image: '/templates/islamic/islamic.webp',
    description: {
      fr: "Inspiré de l'architecture islamique : arc en ogive, calligraphie Bismillah, arabesques et deux palettes — or chaud ou bleu ciel.",
      ar: 'مستوحى من الفن الإسلامي: قوس مدبب، خط البسملة، زخارف عربية، ولونان — ذهبي أو سماوي.',
    },
    price: 8900,
    languages: ['fr', 'ar'],
    variant: 'islamic',
    colors: [
      C('gold', { fr: 'Or',   ar: 'ذهبي' }),
      C('sky',  { fr: 'Ciel', ar: 'سماوي' }),
      C('pink', { fr: 'Rose', ar: 'وردي' }),
    ],
    imageSlots: [
      { key: 'heroImage',    label: 'Image héro' },
      { key: 'closingImage', label: 'Image de fermeture' },
    ],
  },
];

export function getModel(slug: string) {
  return MODELS.find((m) => m.slug === slug);
}
