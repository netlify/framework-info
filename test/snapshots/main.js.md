# Snapshot report for `test/main.js`

The actual snapshot is saved in `main.js.snap`.

Generated by [AVA](https://avajs.dev).

## Should detect frameworks

> Snapshot 1

    [
      {
        build: {
          commands: [
            'sapper export',
          ],
          directory: '__sapper__/export',
        },
        category: 'frontend_framework',
        dev: {
          commands: [
            'sapper dev',
          ],
          pollingStrategies: [
            {
              name: 'TCP',
            },
            {
              name: 'HTTP',
            },
          ],
          port: 3000,
        },
        env: {},
        id: 'sapper',
        logo: {
          dark: 'https://framework-info.netlify.app/logos/sapper/default.svg',
          default: 'https://framework-info.netlify.app/logos/sapper/default.svg',
          light: 'https://framework-info.netlify.app/logos/sapper/default.svg',
        },
        name: 'Sapper',
        package: {
          name: 'sapper',
          version: '3.4.3',
        },
        plugins: [],
        staticAssetsDirectory: 'static',
      },
    ]

## Should return the version of each framework when multiple are detected

> Snapshot 1

    [
      {
        build: {
          commands: [
            'vuepress build',
          ],
          directory: '.vuepress/dist',
        },
        category: 'static_site_generator',
        dev: {
          commands: [
            'vuepress dev',
          ],
          pollingStrategies: [
            {
              name: 'TCP',
            },
            {
              name: 'HTTP',
            },
          ],
          port: 8080,
        },
        env: {},
        id: 'vuepress',
        logo: {
          dark: 'https://framework-info.netlify.app/logos/vuepress/default.svg',
          default: 'https://framework-info.netlify.app/logos/vuepress/default.svg',
          light: 'https://framework-info.netlify.app/logos/vuepress/default.svg',
        },
        name: 'VuePress',
        package: {
          name: 'vuepress',
          version: '4.5.6',
        },
        plugins: [],
        staticAssetsDirectory: undefined,
      },
      {
        build: {
          commands: [
            'vue-cli-service build',
          ],
          directory: 'dist',
        },
        category: 'frontend_framework',
        dev: {
          commands: [
            'vue-cli-service serve',
          ],
          pollingStrategies: [
            {
              name: 'TCP',
            },
            {
              name: 'HTTP',
            },
          ],
          port: 8080,
        },
        env: {},
        id: 'vue',
        logo: {
          dark: 'https://framework-info.netlify.app/logos/vue/default.svg',
          default: 'https://framework-info.netlify.app/logos/vue/default.svg',
          light: 'https://framework-info.netlify.app/logos/vue/default.svg',
        },
        name: 'Vue.js',
        package: {
          name: '@vue/cli-service',
          version: '1.2.3',
        },
        plugins: [],
        staticAssetsDirectory: undefined,
      },
    ]

## Should return the version of a framework that is not detected by npm package

> Snapshot 1

    [
      {
        build: {
          commands: [
            'bundle exec middleman build',
          ],
          directory: 'build',
        },
        category: 'static_site_generator',
        dev: {
          commands: [
            'bundle exec middleman server',
          ],
          pollingStrategies: [
            {
              name: 'TCP',
            },
            {
              name: 'HTTP',
            },
          ],
          port: 4567,
        },
        env: {},
        id: 'middleman',
        logo: {
          dark: 'https://framework-info.netlify.app/logos/middleman/default.svg',
          default: 'https://framework-info.netlify.app/logos/middleman/default.svg',
          light: 'https://framework-info.netlify.app/logos/middleman/default.svg',
        },
        name: 'Middleman',
        package: {
          name: undefined,
          version: 'unknown',
        },
        plugins: [],
        staticAssetsDirectory: undefined,
      },
    ]

## Should return the version of the framework when the installed package is hoisted to the root project directory

> Snapshot 1

    [
      {
        build: {
          commands: [
            'next build',
          ],
          directory: '.next',
        },
        category: 'static_site_generator',
        dev: {
          commands: [
            'next',
          ],
          pollingStrategies: [
            {
              name: 'TCP',
            },
          ],
          port: 3000,
        },
        env: {},
        id: 'next',
        logo: {
          dark: 'https://framework-info.netlify.app/logos/nextjs/dark.svg',
          default: 'https://framework-info.netlify.app/logos/nextjs/light.svg',
          light: 'https://framework-info.netlify.app/logos/nextjs/light.svg',
        },
        name: 'Next.js',
        package: {
          name: 'next',
          version: '3.2.1',
        },
        plugins: [
          '@netlify/plugin-nextjs',
        ],
        staticAssetsDirectory: undefined,
      },
    ]

## Should allow getting a specific framework

> Snapshot 1

    {
      build: {
        commands: [
          'sapper export',
        ],
        directory: '__sapper__/export',
      },
      category: 'frontend_framework',
      dev: {
        commands: [
          'sapper dev',
        ],
        pollingStrategies: [
          {
            name: 'TCP',
          },
          {
            name: 'HTTP',
          },
        ],
        port: 3000,
      },
      env: {},
      id: 'sapper',
      logo: {
        dark: 'https://framework-info.netlify.app/logos/sapper/default.svg',
        default: 'https://framework-info.netlify.app/logos/sapper/default.svg',
        light: 'https://framework-info.netlify.app/logos/sapper/default.svg',
      },
      name: 'Sapper',
      package: {
        name: 'sapper',
        version: 'unknown',
      },
      plugins: [],
      staticAssetsDirectory: 'static',
    }
