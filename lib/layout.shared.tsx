import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { i18n } from '@/lib/i18n';
import { defineI18nUI } from 'fumadocs-ui/i18n';

export const i18nUI = defineI18nUI(i18n, {
  en: {
    displayName: 'English',
  },
  zh: {
    displayName: '中文',
    toc: '目录',
    search: '搜索文档',
    lastUpdate: '最后更新于',
    searchNoResult: '没有结果',
    previousPage: '上一页',
    nextPage: '下一页',
    chooseLanguage: '选择语言',
  },
});

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <img
            src="/logo/wordmark.png"
            alt="NebulaClaw"
            className="nc-logo-dark"
            style={{ height: '1.5rem', width: 'auto' }}
          />
          <img
            src="/logo/wordmark-light.png"
            alt="NebulaClaw"
            className="nc-logo-light"
            style={{ height: '1.5rem', width: 'auto' }}
          />
        </>
      ),
      url: `/${locale}`,
    },
    links: [
      {
        type: 'main',
        text: locale === 'zh' ? '文档' : 'Documentation',
        url: `/${locale}/docs`,
      },
      {
        type: 'main',
        text: locale === 'zh' ? '控制台' : 'Console',
        url: 'https://app.nebulaclaw.ai',
        external: true,
      },
    ],
  };
}
