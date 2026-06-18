import React from 'react';

function extractCoords(url: string): [string, string] | null {
  const atMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (atMatch) return [atMatch[1], atMatch[2]];
  const qMatch = url.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (qMatch) return [qMatch[1], qMatch[2]];
  return null;
}

export function MapBlock({ mapUrl, mapLinkUrl }: { mapUrl?: string; mapLinkUrl?: string }) {
  const linkUrl = mapLinkUrl ?? mapUrl;
  if (!mapUrl) return null;

  if (mapUrl.includes('/maps/embed') || mapUrl.includes('output=embed')) {
    return (
      <iframe
        src={mapUrl}
        style={{ width: '100%', maxWidth: '380px', height: '220px', display: 'block', margin: '24px auto 0', borderRadius: '4px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
        title="Localisation"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  const coords = extractCoords(mapUrl);

  if (coords) {
    const [lat, lng] = coords;
    const latF = parseFloat(lat);
    const lngF = parseFloat(lng);
    const osmSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lngF - 0.008},${latF - 0.005},${lngF + 0.008},${latF + 0.005}&layer=mapnik&marker=${lat},${lng}`;
    const googleHref = linkUrl ?? `https://maps.google.com/maps?q=${lat},${lng}`;

    return (
      <div style={{ position: 'relative', width: '100%', maxWidth: '380px', margin: '24px auto 0', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
        <iframe
          src={osmSrc}
          style={{ width: '100%', height: '220px', border: 'none', display: 'block', pointerEvents: 'none' }}
          title="Localisation"
          loading="lazy"
        />
        <a
          href={googleHref}
          target="_blank"
          rel="noreferrer"
          style={{ position: 'absolute', inset: 0 }}
          aria-label="Voir sur Google Maps"
        />
      </div>
    );
  }

  return (
    <a
      href={linkUrl ?? mapUrl}
      target="_blank"
      rel="noreferrer"
      style={{ display: 'block', textAlign: 'center', margin: '24px auto 0', padding: '12px 20px', maxWidth: '380px', borderRadius: '4px', background: 'rgba(0,0,0,0.06)', color: '#555', textDecoration: 'none', fontSize: '14px' }}
    >
      📍 Voir sur Google Maps
    </a>
  );
}