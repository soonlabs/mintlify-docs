import { loader } from 'fumadocs-core/source';
import { i18n } from '@/lib/i18n';
import { docs } from 'collections/server';
import { icons } from 'lucide-react';
import { createElement } from 'react';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  i18n,
  icon(iconName) {
    if (!iconName) return;
    if (iconName in icons) {
      return createElement(icons[iconName as keyof typeof icons]);
    }
  },
});
