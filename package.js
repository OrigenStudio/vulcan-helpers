Package.describe({
  name: 'origenstudio:vulcan-helpers',
  summary: 'Vulcan generic helpers',
  version: '0.0.1',
  git: 'https://github.com/OrigenStudio/vulcan-helpers',
});

Package.onUse(api => {
  api.versionsFrom(['METEOR@1.0']);

  api.use([
    // Vulcan packages
    'vulcan:core@1.11.0',
  ]);

  api.mainModule('lib/client/main.js', 'client');
  api.mainModule('lib/server/main.js', 'server');
});
