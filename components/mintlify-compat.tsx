import * as React from 'react';
import { Callout } from 'fumadocs-ui/components/callout';
import {
  Accordion as FumaAccordion,
  Accordions as FumaAccordions,
} from 'fumadocs-ui/components/accordion';
import { Step as FumaStep, Steps as FumaSteps } from 'fumadocs-ui/components/steps';
import {
  icons as lucideIcons,
  ArrowRight,
  Rocket,
  Bot,
  BookOpen,
  MessageCircle,
  Send,
  Sparkles,
} from 'lucide-react';

/**
 * Mintlify → Fumadocs compatibility shims.
 * Lets the existing Mintlify MDX files render without rewriting markup.
 */

type CardProps = {
  title?: string;
  icon?: React.ReactNode | string;
  href?: string;
  children?: React.ReactNode;
};

// Resolve a Mintlify-style icon name (kebab or lower) to a Lucide icon.
const iconAliases: Record<string, keyof typeof lucideIcons> = {
  rocket: 'Rocket',
  bot: 'Bot',
  book: 'BookOpen',
  'book-open': 'BookOpen',
  'message-circle': 'MessageCircle',
  'paper-plane': 'Send',
  send: 'Send',
  sparkles: 'Sparkles',
};

function resolveIcon(icon: CardProps['icon']): React.ReactNode {
  if (!icon) return <Sparkles size={16} />;
  if (typeof icon !== 'string') return icon;
  const pascal = iconAliases[icon] ?? (icon.charAt(0).toUpperCase() + icon.slice(1));
  const LucideIcon = lucideIcons[pascal as keyof typeof lucideIcons];
  if (LucideIcon) return <LucideIcon size={16} />;
  return <Sparkles size={16} />;
}

export function Card({ title, href, children, icon }: CardProps) {
  const body = (
    <>
      <div className="nc-card-head">
        <span className="nc-card-icon">{resolveIcon(icon)}</span>
        {title ? <span className="nc-card-title">{title}</span> : null}
        {href ? (
          <span className="nc-card-arrow">
            <ArrowRight size={14} />
          </span>
        ) : null}
      </div>
      {children ? <div className="nc-card-body">{children}</div> : null}
    </>
  );

  if (href) {
    const external = href.startsWith('http');
    return (
      <a
        className="nc-card nc-card-interactive"
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {body}
      </a>
    );
  }
  return <div className="nc-card">{body}</div>;
}

type CardGroupProps = {
  cols?: number;
  children?: React.ReactNode;
};

export function CardGroup({ cols = 2, children }: CardGroupProps) {
  return (
    <div
      className="nc-card-group"
      style={{ ['--nc-cols' as string]: String(cols) }}
    >
      {children}
    </div>
  );
}

// Callouts ------------------------------------------------------------------

type CalloutProps = { children?: React.ReactNode; title?: string };

export function Tip({ children, title }: CalloutProps) {
  return (
    <Callout type="info" title={title}>
      {children}
    </Callout>
  );
}

export function Note({ children, title }: CalloutProps) {
  return (
    <Callout type="info" title={title}>
      {children}
    </Callout>
  );
}

export function Info({ children, title }: CalloutProps) {
  return (
    <Callout type="info" title={title}>
      {children}
    </Callout>
  );
}

export function Warning({ children, title }: CalloutProps) {
  return (
    <Callout type="warn" title={title}>
      {children}
    </Callout>
  );
}

// Steps --------------------------------------------------------------------

type StepProps = { title?: string; children?: React.ReactNode };

export function Step({ title, children }: StepProps) {
  return (
    <FumaStep>
      {title ? <h3>{title}</h3> : null}
      {children}
    </FumaStep>
  );
}

export function Steps({ children }: { children?: React.ReactNode }) {
  return <FumaSteps>{children}</FumaSteps>;
}

// Frame --------------------------------------------------------------------

export function Frame({
  children,
  caption,
}: {
  children?: React.ReactNode;
  caption?: string;
}) {
  return (
    <figure className="my-4 overflow-hidden rounded-lg border border-fd-border bg-fd-card p-2">
      {children}
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-fd-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

// API reference ------------------------------------------------------------

type ApiFieldLocation = 'path' | 'body' | 'query' | 'header';

type ParamFieldProps = {
  name?: string;
  type?: string;
  required?: boolean;
  default?: string;
  children?: React.ReactNode;
} & Partial<Record<ApiFieldLocation, string>>;

function fieldName(props: ParamFieldProps): string {
  if (props.name) return props.name;
  for (const loc of ['path', 'body', 'query', 'header'] as const) {
    const v = props[loc];
    if (typeof v === 'string') return v;
  }
  return '';
}

function fieldLocation(props: ParamFieldProps): ApiFieldLocation | null {
  for (const loc of ['path', 'body', 'query', 'header'] as const) {
    if (typeof props[loc] === 'string') return loc;
  }
  return null;
}

export function ParamField(props: ParamFieldProps) {
  const name = fieldName(props);
  const loc = fieldLocation(props);
  return (
    <div className="my-3 rounded-lg border border-fd-border bg-fd-card/40 p-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <code className="font-mono font-semibold text-fd-primary">{name}</code>
        {props.type ? (
          <span className="text-xs text-fd-muted-foreground">{props.type}</span>
        ) : null}
        {props.required ? (
          <span className="rounded bg-red-500/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-600 dark:text-red-400">
            required
          </span>
        ) : null}
        {loc ? (
          <span className="ml-auto rounded bg-fd-muted/40 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-fd-muted-foreground">
            {loc}
          </span>
        ) : null}
      </div>
      {props.children ? (
        <div className="mt-1.5 text-sm text-fd-muted-foreground">
          {props.children}
        </div>
      ) : null}
    </div>
  );
}

type ResponseFieldProps = {
  name?: string;
  type?: string;
  required?: boolean;
  children?: React.ReactNode;
};

export function ResponseField(props: ResponseFieldProps) {
  return (
    <div className="my-2 rounded-lg border border-fd-border bg-fd-card/40 p-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <code className="font-mono font-semibold text-fd-primary">
          {props.name}
        </code>
        {props.type ? (
          <span className="text-xs text-fd-muted-foreground">{props.type}</span>
        ) : null}
        {props.required ? (
          <span className="rounded bg-red-500/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-600 dark:text-red-400">
            required
          </span>
        ) : null}
      </div>
      {props.children ? (
        <div className="mt-1.5 space-y-2 text-sm text-fd-muted-foreground">
          {props.children}
        </div>
      ) : null}
    </div>
  );
}

export function Expandable({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <details className="my-2 rounded-md border border-fd-border bg-fd-card/40 px-3 py-2 text-sm [&_summary]:cursor-pointer">
      <summary className="font-medium">{title ?? 'Expand'}</summary>
      <div className="mt-2 space-y-2">{children}</div>
    </details>
  );
}

// Accordions ---------------------------------------------------------------

type AccordionProps = {
  title?: string;
  defaultOpen?: boolean;
  children?: React.ReactNode;
};

export function Accordion({ title, children, defaultOpen }: AccordionProps) {
  return (
    <FumaAccordion title={title ?? ''} id={title ?? ''}>
      {children}
    </FumaAccordion>
  );
}

export function AccordionGroup({ children }: { children?: React.ReactNode }) {
  return <FumaAccordions type="multiple">{children}</FumaAccordions>;
}
