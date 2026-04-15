import '../global.css';
import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';
import { i18nUI } from '@/lib/layout.shared';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s · NebulaClaw',
    default: 'NebulaClaw — AI community automation',
  },
  description:
    'NebulaClaw is an AI-powered community automation platform — context-aware Agents that answer, moderate, and report on Telegram, Discord, and beyond.',
  icons: { icon: '/favicon.png' },
};

export default async function Layout({ params, children }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  return (
    <html
      lang={lang}
      className={`${inter.className} dark`}
      suppressHydrationWarning
    >
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <RootProvider
          theme={{ defaultTheme: 'dark', enableSystem: false }}
          i18n={i18nUI.provider(lang)}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
