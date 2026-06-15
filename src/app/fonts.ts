import { Playfair_Display, Cormorant, El_Messiri } from 'next/font/google';
import localFont from 'next/font/local';

export const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-fr-display',
  display: 'swap',
});

export const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-fr-body',
  display: 'swap',
});

export const zain = localFont({
  src: './fonts/zain-mob-long300.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-ar-display',
  display: 'swap',
});

export const komediaBlack = localFont({
  src: './fonts/komedia-black.otf',
  weight: '400',
  style: 'normal',
  variable: '--font-islamic-ar',
  display: 'swap',
});

export const elMessiri = El_Messiri({
  subsets: ['arabic'],
  weight: ['400', '500', '600'],
  variable: '--font-ar-body',
  display: 'swap',
});

export const arefRuqaa = localFont({
  src: '../../public/fonts/alfont_com_ArefRuqaaswashesfixed-Bold.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-aref-ruqaa',
  display: 'swap',
});
