const MAP: Record<string, Record<string, string[]>> = {
  jardin: {
    burgundy: ['/templates/jardin/left003burgundy.webp', '/templates/jardin/right002burgundy.webp'],
    blue:     ['/templates/jardin/left003blue.webp',     '/templates/jardin/right002blue.webp'],
    purple:   ['/templates/jardin/left003purple.webp',   '/templates/jardin/right002purple.webp'],
    _default: ['/templates/jardin/left003burgundy.webp', '/templates/jardin/right002burgundy.webp'],
  },
  golden: {
    _default: ['/templates/golden/UP004.webp', '/templates/golden/DOWN004.webp'],
  },
  galaxy: {
    burgundy: ['/templates/galaxy/up001.webp',       '/templates/galaxy/down001.webp'],
    violet:   ['/templates/galaxy/uppurple001.webp',  '/templates/galaxy/down001.webp'],
    navy:     ['/templates/galaxy/upnavy001.webp',    '/templates/galaxy/down001.webp'],
    _default: ['/templates/galaxy/up001.webp',       '/templates/galaxy/down001.webp'],
  },
  elegance: {
    _default: ['/templates/elegance/leftelegance001.webp', '/templates/elegance/rightelegance001.webp'],
  },
  gala: {
    burgundy: ['/templates/gala/upburgundyrosa.webp', '/templates/gala/downburgundyrosa.webp'],
    blue:     ['/templates/gala/upblue001.webp',      '/templates/gala/downblue001.webp'],
    green:    ['/templates/gala/upgreen002.webp',     '/templates/gala/downgreen002.webp'],
    purple:   ['/templates/gala/uppurple002.webp',    '/templates/gala/downpurple002.webp'],
    _default: ['/templates/gala/upburgundyrosa.webp', '/templates/gala/downburgundyrosa.webp'],
  },
  islamic: {
    gold:     ['/templates/islamic/left002.webp',      '/templates/islamic/right002.webp'],
    sky:      ['/templates/islamic/blueleft002.webp',  '/templates/islamic/blueright002.webp'],
    pink:     ['/templates/islamic/pinkleft002.webp',   '/templates/islamic/pinkright002.webp'],
    _default: ['/templates/islamic/left002.webp',      '/templates/islamic/right002.webp'],
  },
  kabyle: {
    _default: ['/templates/kabyle/upbeige.webp', '/templates/kabyle/downbeige.webp'],
  },
  rosa: {
    burgundy: ['/templates/rosa/upburgundyrosa.webp', '/templates/rosa/downburgundyrosa.webp'],
    blue:     ['/templates/rosa/upbluerosa.webp',     '/templates/rosa/downbluerosa.webp'],
    purple:   ['/templates/rosa/upburgundyrosa.webp', '/templates/rosa/downburgundyrosa.webp'],
    gold:     ['/templates/rosa/upgoldrosa.webp',      '/templates/rosa/downgoldrosa.webp'],
    _default: ['/templates/rosa/upburgundyrosa.webp', '/templates/rosa/downburgundyrosa.webp'],
  },
  'royal-bordeaux': {
    burgundy: ['/templates/royal-bordeaux/up001.webp',      '/templates/royal-bordeaux/down001.webp'],
    blue:     ['/templates/royal-bordeaux/blueup001.webp',  '/templates/royal-bordeaux/down001.webp'],
    green:    ['/templates/royal-bordeaux/upgreen001.webp',  '/templates/royal-bordeaux/down001.webp'],
    purple:   ['/templates/royal-bordeaux/uppurple001.webp', '/templates/royal-bordeaux/down001.webp'],
    _default: ['/templates/royal-bordeaux/up001.webp',      '/templates/royal-bordeaux/down001.webp'],
  },
  mariage: {
    _default: ['/templates/mariage/up001.webp', '/templates/mariage/down001.webp'],
  },
};

export function getEnvelopeImageUrls(variant: string, colorId?: string | null): string[] {
  const colors = MAP[variant];
  if (!colors) return [];
  return (colorId && colors[colorId]) || colors._default || [];
}
