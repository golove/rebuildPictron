if (process.env.VITE_APP_VERSION === undefined) {
  const now = new Date;
  process.env.VITE_APP_VERSION = `${now.getUTCFullYear() - 2000}.${now.getUTCMonth() + 1}.${now.getUTCDate()}-${now.getUTCHours() * 60 + now.getUTCMinutes()}`;
}

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  productName: 'pictron',
  appId: 'com.golove.pictron',
  copyright: 'copyright 2021 golove',
  dmg: {
    icon: 'buildResources/icons/icon.icns',
    contents: [
      {
        x: 192,
        y: 344
      },
      {
        x: 448,
        y: 344,
        type: 'link',
        path: '/Applications'
      }
    ]
  },
  mac: {
    target: [
      {
        target: 'dmg',
        arch: [
          'x64',
          'arm64',
          'universal'
        ]
      }
    ],
    category: 'public.app-category.utility'
  },
  linux: {
    category: 'Utility',
    target: [
      'AppImage',
      'deb'
    ]
  },
  directories: {
    output: 'dist',
    buildResources: 'buildResources',
  },
  files: [
    'packages/**/dist/**',
  ],
  extraMetadata: {
    version: process.env.VITE_APP_VERSION,
  },
};

module.exports = config;
