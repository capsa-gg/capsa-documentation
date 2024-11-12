import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Capsa',
  tagline: 'An Unreal Engine logging solution',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://capsa.gg',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'capsa-gg', // Usually your GitHub org/user name.
  projectName: 'capsa-documentation', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  themes: ['@docusaurus/theme-mermaid'],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // https://docusaurus.io/docs/next/markdown-features/diagrams
  markdown: {
    mermaid: true,
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/capsa-gg/capsa-documentation/tree/main/docs',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/capsa-gg/capsa-documentation/tree/main/blog',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/icon.png',
    navbar: {
      title: 'Capsa',
      logo: {
        alt: 'Capsa',
        src: 'img/icon.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/capsa-gg',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Maintainers',
          items: [
            {
              label: 'Companion Group',
              href: 'https://companiongroup.io',
            },
            {
              label: 'Luciano Nooijen',
              href: 'https://lucianonooijen.com',
            },
            {
              label: 'Mark Jawdoszak',
              href: 'https://linkedin.com/in/markjawdoszak',
            },
          ],
        },
        {
          title: 'Socials',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/companion-group-ltd',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/capsa-gg',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} capsa.gg by Companion Group Ltd.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
