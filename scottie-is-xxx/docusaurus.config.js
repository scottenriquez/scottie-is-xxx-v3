// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Scottie Enriquez',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://scottie.is',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'scottenriquez', // Usually your GitHub org/user name.
  projectName: 'scottie-is-xxx-v3', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        blog: {
          routeBasePath: '/writing',
          showReadingTime: true,
          blogSidebarTitle: 'Posts',
          blogSidebarCount: 'ALL',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'twiath',
        routeBasePath: 'discussing-fantasy-football',
        blogTitle: 'Fantasy Football',
        path: './twiath',
        blogSidebarTitle: 'Posts',
        blogSidebarCount: 'ALL',
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      navbar: {
        title: 'Scottie Enriquez',
        logo: {
          alt: 'Logo',
          src: 'img/scott-s.svg',
        },
        items: [
          {to: '/files/resume.pdf', label: 'Resume', position: 'left', target: '_blank'},
          {to: '/writing', label: 'Blog', position: 'left'},
          {to: '/discussing-fantasy-football', label: 'Fantasy Football', position: 'left'},
          {
            href: 'https://github.com/scottenriquez',
            label: 'GitHub',
            position: 'left',
          },
          {
            href: 'https://www.linkedin.com/in/scottenriquez/',
            label: 'LinkedIn',
            position: 'left',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: 'Crafted with love by Scottie in Los Angeles 💻',
        logo: {
          alt: 'Logo',
          src: 'img/scott-s.svg',
          href: '/',
          width: 160,
          height: 51,
        },
      },
      prism: {
        darkTheme: prismThemes.shadesOfPurple,
        additionalLanguages: ['bash', 'diff', 'json', 'yaml', 'csharp', 'hcl', 'toml', 'sql', 'docker', 'editorconfig', 'swift', 'markdown', 'typescript', 'jsx', 'python', 'graphql']
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
    }),
};

export default config;
