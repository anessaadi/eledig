'use client';

import React from 'react';
import type { ReactNode } from 'react';
import KabyleEnvelope from './KabyleEnvelope';
import type { InviteData, InviteStyle } from './InvitationTemplate';

const AR = 'var(--font-ar-display), serif';
const AR_BODY = 'var(--font-ar-body), serif';
const FR = 'var(--font-fr-display), Georgia, serif';
const FR_BODY = 'var(--font-fr-body), Georgia, serif';

const MONTHS_FR = [
  'JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN',
  'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE',
];
const MONTHS_AR = [
  'جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان',
  'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

const DAYS_FR = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const DAYS_AR = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

const PROGRAMME_FR = [
  { time: '18h00', label: 'Cérémonie de Nikah' },
  { time: '19h00', label: 'Dîner & Fête' },
  { time: '20h00', label: 'Soirée dansante' },
];
const PROGRAMME_AR = [
  { time: '18:00', label: 'مراسم النكاح' },
  { time: '19:00', label: 'العشاء والاحتفال' },
  { time: '20:00', label: 'حفل الرقص' },
];
const TEXT_LABELS = {
  fr: { programme: 'Programme', resumeTitle: 'Résumé', dateLabel: 'Date', venueLabel: 'Lieu', timeLabel: 'Heure' },
  ar: { programme: 'البرنامج', resumeTitle: 'ملخص', dateLabel: 'التاريخ', venueLabel: 'المكان', timeLabel: 'التوقيت' },
};

function buildCalendar(dateStr: string) {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = d.getMonth();
  const highlight = d.getDate();
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const flat: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) flat.push(null);
  for (let i = 1; i <= daysInMonth; i++) flat.push(i);
  while (flat.length % 7 !== 0) flat.push(null);
  const weeks: (number | null)[][] = [];
  for (let i = 0; i < flat.length; i += 7) weeks.push(flat.slice(i, i + 7));
  return { weeks, highlight };
}

const S = {
  pageBg: 'linear-gradient(180deg, #fdf8ef 0%, #ede0c8 100%)',
  envelopeUp: '/templates/kabyle/upbeige.webp',
  envelopeDown: '/templates/kabyle/downbeige.webp',
  accent: '#8b5e3c',
  accentLight: '#c9965a',
  text: '#3d2810',
  dim: '#7a4f2a',
  bannerBg: '#3d1e08',
  bannerText: '#f0e0c5',
  btnText: '#1e0e05',
};

function KabyleDecoration({ color }: { color: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1992.54 248.1"
      fill={color} aria-hidden="true"
      style={{ width: '100%', maxWidth: '220px', height: 'auto', opacity: 0.8 }}>
      <g><g>
        <path d="M1992.54,123C1738.64,134.07,1484.78,146,1229,147.9l21.41-24.33-20.84-24.52C1484.81,102.49,1738.76,109.75,1992.54,123Zm-673.62.36c8.39,4.71,16,10,24.37,13.32,4.88,1.92,11.77,2.4,16.42.41,7.11-3.05,13-8.79,19.85-13.64-5.66-4-10.94-7.39-15.86-11.26-6.58-5.18-14.29-4.17-20.73-1.93C1334.65,113.15,1327.25,118.67,1318.92,123.36Zm8.78-14.1c-20.54-1.64-20.54-1.63-36.71,6.33-2.23,1.1-4.57,2-6.8,3.11-2.85,1.41-5.64,2.94-8.75,4.57,17.45,12.11,37.59,17.6,52.2,14.23l-26.14-14Zm65.15,27.28c7.07,2.41,11.68-1.1,16.53-4.32,11.78-7.83,12.12-8.1,22.95.83,4.34,3.58,8.45,3.22,14.3,3.18l-18.86-13L1447.18,111c-6.13-.93-10.71-1.07-14.84,2.34-2.55,2.11-5.51,3.71-8.12,5.77-2.4,1.9-4.48,2.29-7.11.27-3.16-2.42-6.91-4.13-9.86-6.75-4.44-4-9.25-2.93-15.31-2.46l21.26,13.25Zm93-23.32c-4.42-1.51-8-2.41-11,1.76-1.55,2.16-4.51,3.3-6.79,5-1.36,1-2.62,2.11-4.11,3.32l11.4,8.57-1.56,2.19-17.46-10.67,17.14-10.78h-17.68c0,.48,0,1,0,1.45h8l.36,1.21-14.4,8,13.9,9.21-8.3.61,0,1.69c9.83,1.8,19.77.47,29.64.89l.63-1.56c-4.31-3.61-8.63-7.21-13.09-10.93Zm8.58,20.71c13.7,4,22.83-3.1,31.37-10.68-7.79-9.6-17.67-13.53-30.65-10l12.8,10.35Zm-204-24.2c-.08-.22-.16-.43-.23-.65h-43.32c1.59,1.32,2.48,2.69,3.33,2.67,6.44-.17,10.34,4.52,15.17,7.48a4.6,4.6,0,0,0,3.66.55C1276.21,116.56,1283.29,113.11,1290.41,109.73Zm.63,28.56c-2.33-1.28-3.37-1.91-4.47-2.44-5.07-2.44-10.38-4.49-15.16-7.42-3.23-2-5.62-1.94-8.58.06s-6,3.52-9,5.32c-2.11,1.26-4.16,2.6-7.15,4.48Zm75.77-1.78c5.2,2,20.32-5.77,27-13.9-9.9-2.74-15-14.62-27.34-12.48l19.78,13.5Zm215.44-4.85c.15-.42.31-.83.47-1.24l-8.75-7,9.92-7.91h-22.8l10.33,7.84-10,8.34Zm-35.54-8.27c-10.21-9.28-14.54-11.15-21.25-9.22l13,8.67-15.66,10.47C1533.15,135.14,1538.35,126.12,1546.71,123.39Zm16.78-.12c-10.78-8.9-11.41-9.23-16.86-8.53l10.46,8.51c-2.52,1.82-4.64,3.38-6.79,4.91s-4.23,3-6.78,4.74C1549.16,134,1553.61,131.72,1563.49,123.27Zm50.75.38c-8.94-7.7-10-8-14.29-3.29l5,2.85-5.46,4.87C1606.84,132.19,1609.05,124.94,1614.24,123.65Zm-117-.45-6.68-5.71-7.51,5.66C1490.42,129.36,1490.42,129.36,1497.2,123.2Zm-83.1-12.91c7.7,6.83,9.92,6.87,17.08,0Zm16,26.24c-8.52-7.38-11.09-7.28-16.34,0Zm153.45-13.29c5.72,5.85,5.72,5.85,11.14,0C1589,118.2,1589,118.2,1583.56,123.24Zm39-.13c4.17,5.75,6.14,5.73,9.89-.09C1627.76,117.54,1627,117.54,1622.59,123.11Zm12.86-.18,3.91,5.58,5.44-5.15c-1.29-1.37-2.28-2.47-3.33-3.5a12,12,0,0,0-1.71-1.17c-.83.67-1.64,1.23-2.33,1.91S1636,122.31,1635.45,122.93Z"/>
        <path d="M0,122.82C254.48,110.88,509,102.49,765.11,99c-4,4.71-7.38,8.63-10.75,12.54s-6.7,7.77-10.3,11.94l20.47,23.41C746.35,150.85,28.64,128.48,0,122.82Zm669.58,14.66c19.53,4.78,34.62-4.11,50.22-13.95-16.21-8.79-31-19.35-50.45-13.8l24,14Zm-32.46-1.61.31,1.29c6,0,12.63,1.65,17.81-.39,7.68-3,14.32-8.68,21.78-13.45-13.17-7.28-24.44-18.58-41.64-13.2,3.36,2.14,7.16,3.49,9.29,6.17,3.74,4.69,7,3.92,10.84.45l8.28,6.33c-6.29,6-6.3,6.06-13.48,3.79-4.31-1.37-5.57.36-4.43,4.15ZM530,123.32c6.14,4.1,12,8.14,18,11.89a4.77,4.77,0,0,0,4.23-.1c5.32-3.63,10.42-7.55,16.21-11.82-5.93-4.18-11.19-8.17-16.78-11.61-1.23-.76-4-.07-5.5.86C540.82,115.83,535.68,119.5,530,123.32Zm29.06,12.3c16.91,2.22,20.32,1,36.18-12.31-5.2-4-9.89-9.59-15.82-11.68-5.71-2-12.69-.43-19.12-.43l-.21,1.5c5.36,3.47,10.71,7,16.26,10.56Zm55.13-12.5L594.5,136.65c13.62,2.48,19.36-9.23,29.46-12.73-10.18-10.75-21.87-15.77-30.11-13.24Zm27.52.19c-7.24-4.5-14.11-9.16-21.39-13.06-2.5-1.33-6-.76-9.08-1.06-.07.43-.13.85-.2,1.28l20.29,12.81-19.44,12.84c.17.46.35.91.52,1.37,2.87-.37,6.17,0,8.51-1.25C628,132.33,634.69,127.76,641.73,123.31Zm104.89,15.11.48-1.11c-4.13-2.31-8.77-4-12.27-7.08-5.71-4.95-10.33-3.35-15.7.33-4.09,2.8-8.79,4.72-13.22,7l.38.83ZM705.09,109l-.25.76c4.53,2.25,9.53,3.89,13.51,6.88,6.43,4.86,11.71,3.75,17.54-.84,3.14-2.47,7-4,10.58-5.92L746,109ZM431.71,130.42l.54,1.44H455l-11.13-8.39,10.86-8H430.12l10.93,7.75Zm88.61-18.7c-11.63-1.06-17.58,6.89-25.71,11.24,19.4,13.65,15.79,13.3,25.36,11.7L503.84,123.4ZM495.93,134.2l-15-10.79,15.28-10.67c-11.26-2.76-16.88,5.91-25.57,10.53C479.51,127,484.25,136.89,495.93,134.2Zm37.78,1L516.6,123.3l16-10.87c-3.26-.88-6.58-1.51-8.67-.2-5,3.16-9.39,7.23-14.71,11.47C517.71,126.77,521.78,137.44,533.71,135.21Zm-76.86-12.1c7.61,3.47,11.4,11.66,20.59,9.51l-12-9.25,13.36-10C468.58,111.69,464.79,120.23,456.85,123.11Zm-43.71-3.48c-4.27-4.39-6.16-3.83-13.82,3.56,8.1,7.13,8.73,7.35,13,4.34l-4.48-4.14ZM431,123.49c-6.58-6.46-7.42-6.43-12.84.28l6.15,5.22Zm-52-.33c4.73,6.19,5.94,6.14,11.49-.23C384.3,117.41,384.3,117.41,379,123.16Zm-9.1,5c2.31-1.72,4.11-3,5.8-4.32L370.77,118l-5.47,5.15Z"/>
        <path d="M973.21,196c1.57-10.43,10.9-15.26,16-23.92q-21.45-24-43.59-48.71c14.38-15.69,28.74-31.38,43-46.92-3.48-8.7-14.85-12.18-14.39-23C979.4,52,983,53.1,986.14,57c3.44,4.24,7.38,8.08,11.58,12.62,4.08-4.37,8.12-8.26,11.61-12.6,3-3.73,6.4-4.93,12.23-3.19-.95,2.54-1.4,5.38-2.92,7.45-3.73,5.08-7.94,9.81-12.54,15.39l41.95,46.73-42.94,48.54c4.71,5.54,9.12,10.88,13.72,16,2,2.27,3.75,4.53,1.91,7.46-1.18,1.88-7.29.88-9.41-1.35-3.67-3.85-7.31-7.75-10.94-11.65-2.12-2.28-4.06-2.43-6.23.08-2.95,3.39-6.46,6.34-9.06,10C982.23,196.42,978.78,197.32,973.21,196Zm26.61-62.63c9.92.65,12.76,7.3,14.41,14.79h5.23c-1-11.12-6.24-16.49-19.08-19.89-1.21-7.23-1.12-7,5-9.57,8.17-3.43,12.28-10,13.72-18.77h-5c-3.46,11.14-6.87,14.56-14.58,14.34v-14c-3.79-1.18-5.16-.07-5,3.4s0,7.18,0,11.84c-3-1.29-5.63-1.65-6.91-3.18-3.18-3.8-5.73-8.14-9-12.88a15.06,15.06,0,0,0-1.93,0,5.9,5.9,0,0,0-1.48.58c1.84,10.9,7.63,18.12,18.53,20.17,1.3,5.43.39,8.45-5.45,10.1-8.48,2.41-13.15,9.54-13.32,17.84h5.08c2-9.23,6.28-13.64,14.31-14.4v14.41h5.38Z"/>
        <path d="M1198.77,122.41l-26.57,24A61,61,0,0,0,1147,124.2L1174,100.34C1180.44,109.05,1188,118.05,1198.77,122.41ZM1180,123.69l-7.29-7.43-6.4,7.73,6.79,6.15Z"/>
        <path d="M793.84,123.35c12.1-5.67,20.72-13.74,27.92-24.47,7,10.6,14.87,19.55,27.92,24.21-12,5.88-21.08,13.56-27.95,25.19A60.66,60.66,0,0,0,793.84,123.35Zm20.51.12,7.41,6.56,7.09-6.58-7.23-6.85Z"/>
        <path d="M899.35,151.8c1.64-8.72,9.59-13.13,13.22-20.91-10.2-1.7-21.92,2.81-29.3-7.75,7.63-8.9,18.87-4.14,28.84-6.31-3.75-7.29-10.79-12.19-12.53-20.43,4.47-1.33,7.49-.5,10.19,3.18,4.73,6.42,9.92,12.51,15,18.66,3.1,3.74,3.32,7.19.1,11.12-5.07,6.16-10.13,12.37-14.59,19C907.56,152.37,904.46,153.23,899.35,151.8Z"/>
        <path d="M1096,96.73l-13.26,20.1c9.68,2,21-3,28.46,6.46-7.22,9.57-18.12,6.83-28.68,7.28,2.67,8.18,10.67,12.94,12.42,21.26-4.79,1.25-7.92.69-10.75-3.37-4.94-7.07-10.84-13.47-15.87-20.48-1.21-1.68-1.69-5.46-.64-6.9,5.48-7.49,11.56-14.55,17.45-21.74C1088.56,95.21,1088.6,95.23,1096,96.73Z"/>
        <path d="M1057.46,145.18c7,9.4,16.19,16.69,20.51,27.82-4.65,1.32-7.73.83-10.54-2.89a117.61,117.61,0,0,0-13.55-15.25c-2.23-2.07-6-2.48-9.73-3.88l16.38-18.83C1063.44,138.55,1060.2,141.71,1057.46,145.18Z"/>
        <path d="M932.75,131.24c5.75,6.54,11.5,13.08,17.17,19.55-.58.69-.71.93-.8.92-8.49-1-11.77,5.73-16.2,10.78-2.2,2.49-4.87,4.69-6.55,7.49-2.45,4.1-5.6,4.53-10.51,3,1.26-2.65,2-5.4,3.66-7.47,5.42-6.91,11.14-13.58,16.94-20.55-1.77-4-3.67-8.39-5.58-12.75Z"/>
        <path d="M1058.17,113l-13.85-15.82C1058,96.5,1061.09,84.38,1068,77c2.7-2.9,4.57-4.25,9.4-2.75-1,2.79-1.33,6-3,8.24-5,7-10.49,13.67-15.88,20.57C1061.78,106.27,1064.24,109.33,1058.17,113Z"/>
        <path d="M916,74.23c5-1.11,7.58-.76,10,3.07a124.32,124.32,0,0,0,14.14,18c1.78,1.92,5.49,2,8.94,3.17l-13.79,14.82c-2.77-2.39-3.52-4.43-1.13-6.7,2.17-2.07,1.11-3.68-.37-5.54-5-6.24-10-12.46-14.63-18.92C917.64,80,917.14,77.17,916,74.23Z"/>
        <path d="M933.4,181.93,955.2,157l10.46,11.29c-.38.54-.6,1-.73,1-8.11-1.53-13.26,3-17.3,9C944.32,183.12,940.18,183.73,933.4,181.93Z"/>
        <path d="M1060.94,182.13c-6.54,1.07-11.32,1.53-14.82-3.75-4-6-8.87-10.86-17.58-9.84l10.16-11.1Z"/>
        <path d="M1059.23,67.16c-3.36,4.26-6.14,8.6-9.74,12.1s-8.11,6.24-12.21,9.31l1.35,2.12-8.83-9.42c.59-.49,1-1,1.24-1,7.06,1.42,10.87-3,14.35-8C1048.6,67.73,1052.65,65.26,1059.23,67.16Z"/>
        <path d="M964.06,81.62l-8.81,8.2c-3.34-3.18-7.24-6.46-10.62-10.21s-6.28-8-9.85-12.62c5.17-.79,9.39-1.55,12.19,3.37.64,1.14,1.79,2,2.51,3.08C952.82,78.61,956.8,82.49,964.06,81.62Z"/>
        <path d="M1007,39.76,997.59,51l-9.75-10.94,9.66-10.93Z"/>
        <path d="M997.66,0l9.24,11-9.36,10.55-9.78-10.31Z"/>
        <path d="M988,237l9.55-10.37,9.68,10.23-9.54,11.21Z"/>
        <path d="M997.5,197.17,1007,208l-9.48,10.54L987.9,208Z"/>
        <path d="M984.63,231.57l-9.64-8.7,9.25-10,8.73,9.62C990.19,225.5,987.47,228.46,984.63,231.57Z"/>
        <path d="M1019.44,25.52c-3.21,3.38-5.9,6.23-8.55,9-9.95-7.45-10-9.75-.2-18.24Z"/>
        <path d="M984.24,16l8.85,9.33-8.91,9.53-8.68-9.27Z"/>
        <path d="M1010.53,232l-8.34-9.48,7.89-9.1,8.95,9.34Z"/>
        <path d="M1370.48,123.57c-4.84,3.8-9,7.32-13.46,10.44-1.2.84-3.24.47-4.89.66-.19-.61-.38-1.21-.56-1.81a28.8,28.8,0,0,0,4.46-3.19c1.86-1.92,4.8-4.24,4.68-6.24s-3.33-3.94-5.28-5.79c-.88-.84-2.15-1.29-2.93-2.19-.19-.23.78-2.13,1.31-2.17a5.85,5.85,0,0,1,3.57.84C1361.7,117.08,1365.89,120.23,1370.48,123.57Z"/>
        <path d="M1353,123.44c-7.67,7.85-7.67,7.85-17.9.34C1343.5,115.25,1345.58,115.19,1353,123.44Z"/>
        <path d="M1518.61,123.19a17.63,17.63,0,0,1-1.64,1.43,38.93,38.93,0,0,1-10.11,5.27l7.4-6.88-10.38-8.29,1-1.44Z"/>
        <path d="M1263.15,134.76c6.71-5.24,7.75-5.21,11,0Z"/>
        <path d="M549.71,129.26l-8.1-5.71,7.93-5.87,7.73,5.57Z"/>
        <path d="M584.13,123.21l-13.22-8.63c5.29-1.58,13.44,2.71,18.06,9-5.72,3.26-10,9-16.94,10l-.89-1.32Z"/>
        <path d="M732.65,134.63H721.7C726.24,129.83,728,129.78,732.65,134.63Z"/>
        <path d="M720.53,112.26h11.92C728.36,117.78,726.21,117.79,720.53,112.26Z"/>
      </g></g>
    </svg>
  );
}

function KabyleFrame({ color, children }: { color: string; children: ReactNode }) {
  return (
    <div style={{ position: 'relative', padding: '34px 26px' }}>
      <svg
        viewBox="0 0 320 180"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect x="8" y="8" width="304" height="164" rx="0" ry="0"
          fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
        {/* corner cross ornaments */}
        {([[8, 8], [312, 8], [8, 172], [312, 172]] as [number, number][]).map(([cx, cy], i) => (
          <g key={i}>
            <line x1={cx - 10} y1={cy} x2={cx + 10} y2={cy} stroke={color} strokeWidth="1.5" opacity="0.65" />
            <line x1={cx} y1={cy - 10} x2={cx} y2={cy + 10} stroke={color} strokeWidth="1.5" opacity="0.65" />
          </g>
        ))}
        {/* top/bottom centre diamonds */}
        <path d="M155,5 L160,0 L165,5 L160,10 Z" fill={color} opacity="0.5" />
        <path d="M155,175 L160,180 L165,175 L160,170 Z" fill={color} opacity="0.5" />
      </svg>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

function Flower({ color }: { color: string }) {
  return (
    <svg
      style={{ position: 'absolute', top: '3px', left: '50%', transform: 'translateX(-50%)', width: '42px', height: '42px', zIndex: 0, color }}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <g fill="currentColor">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse key={deg} cx="50" cy="26" rx="15" ry="24" transform={`rotate(${deg} 50 50)`} />
        ))}
      </g>
    </svg>
  );
}

export default function KabyleTemplate({
  data,
  style,
  locale,
}: {
  data: InviteData;
  style: InviteStyle;
  locale: 'fr' | 'ar';
}) {
  const isAr = locale === 'ar';
  const heroImage = `/templates/kabyle/TMP008${isAr ? 'AR' : 'FR'}BEIGE.png`;
  const closingImage = `/templates/kabyle/TMP008${isAr ? 'AR' : 'FR'}2BEIGE.png`;
  const dir = isAr ? 'rtl' : 'ltr';
  const displayFont = isAr ? AR : FR;
  const bodyFont = isAr ? AR_BODY : FR_BODY;

  const d = new Date(data.date);
  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  const monthLabel = isAr ? MONTHS_AR[month] : MONTHS_FR[month];
  const formattedDate = `${day} ${monthLabel} ${year}`;
  const tl = TEXT_LABELS[locale];
  const programme = isAr ? PROGRAMME_AR : PROGRAMME_FR;
  const DAYS = isAr ? DAYS_AR : DAYS_FR;
  const { weeks, highlight } = buildCalendar(data.date);
  const calMonthLabel = isAr ? `${MONTHS_AR[month]} ${year}` : `${MONTHS_FR[month]} ${year}`;

  const mapQuery = encodeURIComponent(
    [data.venue, data.city].filter(Boolean).join(', ') || 'Casablanca, Morocco'
  );

  return (
    <div dir={dir} style={{ backgroundImage: 'url(/templates/kabyle/backgroundkabyle.png)', backgroundSize: 'cover', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', color: S.text, fontFamily: bodyFont }}>
      <KabyleEnvelope upSrc={S.envelopeUp} downSrc={S.envelopeDown} />

      {/* Hero */}
      <div className="relative w-full" style={{ margin: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroImage} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2" style={{ animation: 'scroll-reveal 0.5s ease 2s both, scroll-hint 1.6s ease-in-out 2.5s infinite' }}>
          <div className="flex flex-col items-center gap-1">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: '#000000' }} aria-hidden="true">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: '#000000', opacity: 0.5 }} className="-mt-4" aria-hidden="true">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <main style={{ maxWidth: '480px', margin: '0 auto', padding: '0 24px 72px' }}>

        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <h1 style={{ fontFamily: displayFont, fontSize: 'clamp(32px, 9vw, 42px)', fontStyle: isAr ? 'normal' : 'italic', color: S.text, lineHeight: 1.1 }}>
            {isAr ? 'احفظ التاريخ' : 'Retenez la Date'}
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '18px' }}>
            <KabyleDecoration color={S.accent} />
          </div>
        </div>

        {/* Calendar */}
        <p style={{ fontFamily: bodyFont, fontStyle: isAr ? 'normal' : 'italic', fontSize: '17px', letterSpacing: '0.16em', textAlign: 'center', marginTop: '24px', color: S.dim }}>
          {calMonthLabel}
        </p>
        <table style={{ width: '100%', maxWidth: '360px', margin: '16px auto 0', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {DAYS.map((d) => (
                <th key={d} style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: '13px', letterSpacing: '0.05em', paddingBottom: '12px', textAlign: 'center', color: S.dim }}>
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, wi) => (
              <tr key={wi}>
                {week.map((d, di) =>
                  d === highlight ? (
                    <td key={di} style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: '15px', textAlign: 'center', padding: '10px 0', position: 'relative', color: S.bannerText }}>
                      <Flower color={S.accent} />
                      <span style={{ position: 'relative', zIndex: 10 }}>{d}</span>
                    </td>
                  ) : (
                    <td key={di} style={{ fontFamily: bodyFont, fontWeight: 500, fontSize: '15px', textAlign: 'center', padding: '10px 0', color: S.dim }}>
                      {d && <span>{d}</span>}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: '32px', background: S.bannerBg, borderRadius: '3px', padding: '20px 24px', textAlign: 'center' }}>
          <p style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 'clamp(17px, 4.8vw, 22px)', letterSpacing: '0.12em', color: S.bannerText }}>
            {`${day} ${monthLabel} ${year}`}
          </p>
          {data.time && (
            <p style={{ fontFamily: FR_BODY, fontSize: '12px', letterSpacing: '0.15em', color: S.bannerText, marginTop: '7px', opacity: 0.8 }}>
              {isAr ? `ابتداءً من ${data.time}` : `À PARTIR DE ${data.time.toUpperCase()}`}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <KabyleDecoration color={S.accent} />
        </div>
        <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(28px, 8vw, 36px)', fontStyle: isAr ? 'normal' : 'italic', textAlign: 'center', marginTop: '14px', color: S.text, lineHeight: 1.1 }}>
          {isAr ? 'الموقع' : 'Localisation'}
        </h2>

        <iframe
          style={{ width: '100%', maxWidth: '380px', display: 'block', margin: '24px auto 0', borderRadius: '4px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
          title="Localisation" height="220" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapQuery}&z=13&output=embed`}
        />

        {(data.venue || data.city) && (
          <p style={{ fontFamily: bodyFont, fontSize: '14px', textAlign: 'center', marginTop: '16px', color: S.dim, letterSpacing: '0.05em', lineHeight: 1.45 }}>
            {data.venue && <span style={{ fontWeight: 600 }}>{data.venue}</span>}
            {data.venue && data.city && <br />}
            {data.city}
          </p>
        )}

        {/* Programme */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <KabyleDecoration color={S.accent} />
        </div>
        <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(26px, 7.5vw, 34px)', fontStyle: isAr ? 'normal' : 'italic', textAlign: 'center', marginTop: '14px', color: S.text, fontWeight: isAr ? 400 : 700, lineHeight: 1.1 }}>
          {tl.programme}
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '28px' }}>
          <div style={{ display: 'inline-grid', gridTemplateColumns: 'max-content 10px max-content', alignItems: 'start' }} dir={dir}>
            {programme.map((item, i) => (
              <React.Fragment key={i}>
                <span style={{ fontFamily: bodyFont, fontSize: '16px', color: S.dim, textAlign: isAr ? 'left' : 'right', paddingInlineEnd: '12px', paddingTop: '2px' }}>
                  {item.time}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: S.accent, flexShrink: 0, marginTop: '4px' }} />
                  {i < programme.length - 1 && (
                    <div style={{ width: '2px', flexGrow: 1, minHeight: '32px', background: `linear-gradient(to bottom, ${S.accent}, ${S.accent}33)` }} />
                  )}
                </div>
                <span style={{ fontFamily: bodyFont, fontSize: '20px', color: S.text, paddingInlineStart: '12px', paddingBottom: '20px', lineHeight: 1.3 }}>
                  {item.label}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Résumé */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <KabyleDecoration color={S.accent} />
        </div>
        <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(26px, 7.5vw, 34px)', fontStyle: isAr ? 'normal' : 'italic', textAlign: 'center', marginTop: '14px', color: S.text, fontWeight: isAr ? 400 : 700, lineHeight: 1.1 }}>
          {tl.resumeTitle}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '28px' }}>
          <div style={{ background: S.bannerBg, borderRadius: '4px', padding: '18px 20px', textAlign: 'center' }}>
            <p style={{ fontFamily: bodyFont, fontSize: '12px', letterSpacing: '0.1em', color: S.accentLight, textTransform: 'uppercase', marginBottom: '6px' }}>{tl.dateLabel}</p>
            <p style={{ fontFamily: bodyFont, fontSize: '18px', fontWeight: 600, color: S.bannerText }}>{formattedDate}</p>
          </div>
          <div style={{ background: S.bannerBg, borderRadius: '4px', padding: '18px 20px', textAlign: 'center' }}>
            <p style={{ fontFamily: bodyFont, fontSize: '12px', letterSpacing: '0.1em', color: S.accentLight, textTransform: 'uppercase', marginBottom: '6px' }}>{tl.timeLabel}</p>
            <p style={{ fontFamily: bodyFont, fontSize: '18px', fontWeight: 600, color: S.bannerText }}>{data.time || '—'}</p>
          </div>
          <div style={{ background: S.bannerBg, borderRadius: '4px', padding: '18px 20px', textAlign: 'center' }}>
            <p style={{ fontFamily: bodyFont, fontSize: '12px', letterSpacing: '0.1em', color: S.accentLight, textTransform: 'uppercase', marginBottom: '6px' }}>{tl.venueLabel}</p>
            <p style={{ fontFamily: bodyFont, fontSize: '18px', fontWeight: 600, color: S.bannerText }}>
              {[data.venue, data.city].filter(Boolean).join(' — ') || '—'}
            </p>
          </div>
        </div>

      </main>

      {/* Closing image — full width */}
      <div style={{ marginTop: '70px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={closingImage} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>
    </div>
  );
}
