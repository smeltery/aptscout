export const pages = [
  {
    slug: '',
    file: 'README',
    title: 'Overview',
    group: 'Start here',
    description: 'What aptscout does and how listings become local history.',
  },
  {
    slug: 'quick-start',
    file: 'quick-start',
    title: 'Quick start',
    group: 'Start here',
    description: 'Install, scrape, and find your first apartment.',
  },
  {
    slug: 'web-ui',
    file: 'web-ui',
    title: 'Local web UI',
    group: 'Guides',
    description: 'Browse properties, filter units, and compare prices.',
  },
  {
    slug: 'data',
    file: 'data',
    title: 'Data and history',
    group: 'Guides',
    description: 'SQLite storage, availability, backups, and retention.',
  },
  {
    slug: 'providers',
    file: 'providers',
    title: 'Properties and providers',
    group: 'Guides',
    description: 'Supported properties and how to add a parser.',
  },
  {
    slug: 'troubleshooting',
    file: 'troubleshooting',
    title: 'Troubleshooting',
    group: 'Guides',
    description: 'Recover from scraping, browser, and database problems.',
  },
  {
    slug: 'commands',
    file: 'commands',
    title: 'Command reference',
    group: 'Reference',
    description: 'CLI commands, filters, flags, and examples.',
  },
  {
    slug: 'development',
    file: 'development',
    title: 'Development',
    group: 'Contributing',
    description: 'Flox, Bun, CI, pre-commit hooks, and release checks.',
  },
];
export const docHref = (slug: string) => (slug ? `/docs/${slug}` : '/docs');
