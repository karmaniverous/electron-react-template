import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { App } from './App';

describe('App', () => {
  it('renders app title and greeting', () => {
    expect(renderToStaticMarkup(<App />)).toBe(
      '<main><h1>electron-react-template</h1><span>Hello World</span></main>',
    );
  });
});
