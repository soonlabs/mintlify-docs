import * as React from 'react';
import { Callout } from 'fumadocs-ui/components/callout';
import { Card as FumaCard, Cards as FumaCards } from 'fumadocs-ui/components/card';
import {
  Accordion as FumaAccordion,
  Accordions as FumaAccordions,
} from 'fumadocs-ui/components/accordion';
import { Step as FumaStep, Steps as FumaSteps } from 'fumadocs-ui/components/steps';

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

export function Card({ title, href, children, icon: _icon }: CardProps) {
  return (
    <FumaCard title={title ?? ''} href={href}>
      {children}
    </FumaCard>
  );
}

type CardGroupProps = {
  cols?: number;
  children?: React.ReactNode;
};

export function CardGroup({ children }: CardGroupProps) {
  return <FumaCards>{children}</FumaCards>;
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
