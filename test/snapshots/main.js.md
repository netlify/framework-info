# Snapshot report for `test/main.js`

The actual snapshot is saved in `main.js.snap`.

Generated by [AVA](https://ava.li).

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
      name: 'Sapper',
      plugins: [],
      staticAssetsDirectory: 'static',
    }

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
        name: 'Sapper',
        plugins: [],
        staticAssetsDirectory: 'static',
      },
    ]
