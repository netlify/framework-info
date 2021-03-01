const http = require('http')
const process = require('process')

const execa = require('execa')
const nodeStatic = require('node-static')
const puppeteer = require('puppeteer')

const versions = [
  {
    // Chromium 90
    product: 'chrome',
    version: '856583',
  },
  {
    // Chromium 66
    product: 'chrome',
    version: '533271',
  },
  {
    product: 'firefox',
    version: '88.0a1',
    host: 'https://archive.mozilla.org/pub/firefox/nightly/2021/02/2021-02-28-10-37-09-mozilla-central',
  },
  {
    product: 'firefox',
    version: '63.0a1',
    host: 'https://archive.mozilla.org/pub/firefox/nightly/2018/06/2018-06-30-22-02-40-mozilla-central',
  },
]

const getBrowserPath = async ({ product, version, host }) => {
  const browserFetcher = puppeteer.createBrowserFetcher({ product, host })
  const { executablePath } = await browserFetcher.download(version)
  return executablePath
}

const SERVER_PORT = 8080
const getServer = async () => {
  const file = new nodeStatic.Server(`${__dirname}/../dist`)
  return await new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      file.serve(req, res)
    })
    server.listen(SERVER_PORT, '127.0.0.1', () => resolve(server))
  })
}

const runCypress = async (version) => {
  const browserPath = await getBrowserPath(version)

  const folder = `${version.product}-${version.version}`
  const config = `baseUrl=http://localhost:8080,videosFolder=cypress/videos/${folder},screenshotsFolder=cypress/screenshots/${folder}`

  await execa('cypress', ['run', '--browser', browserPath, '--config', config], {
    stdio: 'inherit',
    preferLocal: true,
  })
}

const runSpecs = async () => {
  const server = await getServer()

  const errors = []
  // eslint-disable-next-line fp/no-loops
  for (const version of versions) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await runCypress(version)
    } catch (error) {
      // eslint-disable-next-line fp/no-mutating-methods
      errors.push(errors)
    }
  }

  server.close()

  process.exitCode = errors.length === 0 ? 0 : 1
}

runSpecs()
