import 'react';

// <ask-chat>: the chat widget served by https://ask.tonytang.dev/widget.js.
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'ask-chat': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        site: string;
        locale: string;
        api?: string;
        sitekey?: string;
      };
    }
  }
}
