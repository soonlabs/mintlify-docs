import Link from 'next/link';
import { Bot, MessageSquare, ShieldCheck, BarChart3, ArrowRight, Sparkles } from 'lucide-react';

const t = {
  en: {
    eyebrow: 'AI-powered community automation',
    heading: 'Bots that actually understand your community',
    description:
      'Replace rigid /command bots with a context-aware AI Agent that answers questions, moderates messages, and surfaces operational insight — in plain English, no code.',
    primary: 'Get Started',
    secondary: 'Read the Docs',
    features: [
      { icon: Bot, title: 'AI Agent', desc: 'Natural-language Bot that understands context, not keywords.' },
      { icon: ShieldCheck, title: 'Smart Moderation', desc: 'Describe rules in plain English. Mute / kick / ban on auto.' },
      { icon: MessageSquare, title: 'Multi-Channel', desc: 'Telegram today. Discord and Slack on the roadmap.' },
      { icon: BarChart3, title: 'Insights', desc: 'Live sentiment, activity and usage analytics out of the box.' },
    ],
  },
  zh: {
    eyebrow: 'AI 驱动的社区自动化',
    heading: '真正懂你社区的 Bot',
    description: '告别死板的 /命令 机器人 —— 一个理解上下文的 AI Agent 帮你回答、审核、洞察社区动态。自然语言配置，5 分钟上线。',
    primary: '开始使用',
    secondary: '查看文档',
    features: [
      { icon: Bot, title: 'AI Agent', desc: '理解语义而非关键词的 Bot，像真人一样处理对话。' },
      { icon: ShieldCheck, title: '智能审核', desc: '用自然语言描述规则，自动 mute / kick / ban。' },
      { icon: MessageSquare, title: '多渠道', desc: 'Telegram 已上线，Discord 和 Slack 规划中。' },
      { icon: BarChart3, title: '数据洞察', desc: '实时情绪分析、活跃度、用量指标开箱即用。' },
    ],
  },
} as const;

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  const locale = (lang === 'zh' ? 'zh' : 'en') as keyof typeof t;
  const copy = t[locale];

  return (
    <main className="nc-home">
      {/* decorative background */}
      <div className="nc-home-bg" aria-hidden />
      <div className="nc-home-grid" aria-hidden />

      <section className="nc-hero">
        <span className="nc-eyebrow">
          <Sparkles size={14} />
          {copy.eyebrow}
        </span>
        <h1 className="nc-heading">{copy.heading}</h1>
        <p className="nc-desc">{copy.description}</p>

        <div className="nc-cta">
          <a href="https://app.nebulaclaw.ai/login" className="nc-btn nc-btn-primary">
            {copy.primary} <ArrowRight size={16} />
          </a>
          <Link href={`/${locale}/docs`} className="nc-btn nc-btn-ghost">
            {copy.secondary}
          </Link>
        </div>
      </section>

      <section className="nc-features">
        {copy.features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="nc-feature-card">
            <div className="nc-feature-icon">
              <Icon size={18} />
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
