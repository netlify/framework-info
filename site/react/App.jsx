import React, { useState, useEffect } from 'react'

// eslint-disable-next-line import/extensions, import/no-unresolved, node/no-missing-import
import { listFrameworks } from '../../dist'

const repo = 'netlify-templates/gatsby-starter-netlify-cms'

const get = async (path = '') => {
  const response = await fetch(`https://api.github.com/repos/${repo}${path}`)
  return response.json()
}

const listFiles = async () => {
  const { default_branch: defaultBranch } = await get()
  const { tree } = await get(`/git/trees/${defaultBranch}?recursive=1`)
  return tree.map(({ path }) => path)
}

const getPackageJson = async () => {
  const { content } = await get('/contents/package.json')
  const raw = atob(content)
  return JSON.parse(raw)
}

const getContext = async () => {
  const [repoFiles, packageJson] = await Promise.all([listFiles(), getPackageJson()])
  const pathExists = (path) => {
    const normalizedPath = path.startsWith('./') ? path.slice(2) : path
    return repoFiles.includes(normalizedPath)
  }
  return { pathExists, packageJson }
}

const Framework = (framework) => <div>{JSON.stringify(framework)}</div>

export const App = () => {
  const [frameworks, setFrameworks] = useState([])

  useEffect(() => {
    const state = { canceled: false }

    const fetchFrameworks = async () => {
      const context = await getContext()
      const receivedFrameworks = await listFrameworks(context)
      if (!state.canceled) {
        setFrameworks(receivedFrameworks)
      }
    }

    fetchFrameworks()
    return () => {
      state.canceled = true
    }
  }, [])

  return frameworks.map((framework) => <Framework key={framework.name} {...framework} />)
}
