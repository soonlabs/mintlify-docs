import Link from 'next/link';

const t = {
  en: {
    tagline: 'AI-powered community automation',
    description:
      'Replace rigid /command bots with a context-aware AI Agent that answers, moderates, and reports — in plain English.',
    primary: 'Get Started',
    secondary: 'Read the Docs',
  },
  zh: {
    tagline: 'AI 驱动的社区自动化平台',
    description:
      '告别死板的 /命令 机器人 —— 一个理解上下文的 AI Agent 帮你回答、审核、洞察社区动态。',
    primary: '开始使用',
    secondary: '查看文档',
  },
} as const;

export default async function HomePage({
  params,
}: PageProps<'/[lang]'>) {
  const { lang } = await params;
  const locale = (lang === 'zh' ? 'zh' : 'en') as keyof typeof t;
  const copy = t[locale];

  return (
    <main
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4rem 1.5rem',
        gap: '1.25rem',
      }}
    >
      <h1
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.25rem)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          background:
            'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 50%, #6D28D9 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        NebulaClaw
      </h1>
      <p style={{ fontSize: '1.25rem', fontWeight: 600, opacity: 0.95 }}>
        {copy.tagline}
      </p>
      <p
        style={{
          maxWidth: '36rem',
          fontSize: '1rem',
          opacity: 0.7,
          lineHeight: 1.6,
        }}
      >
        {copy.description}
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
        <a
          href="https://app.nebulaclaw.ai/login"
          style={{
            padding: '0.625rem 1.25rem',
            borderRadius: '0.5rem',
            background: '#8B5CF6',
            color: 'white',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          {copy.primary}
        </a>
        <Link
          href={`/${locale}/docs`}
          style={{
            padding: '0.625rem 1.25rem',
            borderRadius: '0.5rem',
            border: '1px solid currentColor',
            fontWeight: 600,
            textDecoration: 'none',
            opacity: 0.8,
          }}
        >
          {copy.secondary}
        </Link>
      </div>
    </main>
  );
}
