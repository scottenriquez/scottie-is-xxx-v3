// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Scottie Enriquez',
  tagline: 'Computer Scientist in Los Angeles, California',
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
          showReadingTime: true,
          blogSidebarTitle: 'Posts',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
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
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/files/resume.pdf', label: 'Resume', position: 'left', target: '_blank'},
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
        copyright: 'All opinions expressed here are my own.'
      },
      prism: {
        theme: prismThemes.dracula,
        darkTheme: prismThemes.dracula,
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
