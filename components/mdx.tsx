import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import {
  Accordion,
  AccordionGroup,
  Card,
  CardGroup,
  Expandable,
  Frame,
  Info,
  Note,
  ParamField,
  ResponseField,
  Step,
  Steps,
  Tip,
  Warning,
} from '@/components/mintlify-compat';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Accordion,
    AccordionGroup,
    Card,
    CardGroup,
    Expandable,
    Frame,
    Info,
    ParamField,
    ResponseField,
    Note,
    Step,
    Steps,
    Tip,
    Warning,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
