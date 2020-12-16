import React, { useState, useEffect } from 'react'

import { listFrameworks } from '../../dist'

const repo = 'netlify-templates/gatsby-starter-netlify-cms'

const get = async (path) => {
  const url = path ? `https://api.github.com/repos/${repo}/${path}` : `https://api.github.com/repos/${repo}`
  const response = await fetch(url)
  return response.json()
}

const listFiles = async () => {
  const { default_branch } = await get()
  const { tree } = await get(`git/trees/${default_branch}?recursive=1`)
  return tree.map(({ path }) => path)
}

const getPackageJson = async () => {
  const { content } = await get('contents/package.json')
  const raw = atob(content)
  return { packageJson: JSON.parse(raw), packageJsonPath: '' }
}

const getContext = async () => {
  const repoFiles = await listFiles()
  const locatePath = (paths) => {
    const foundPath = paths.find((path) => {
      const normalizedPath = path.startsWith('./') ? path.slice(2) : path
      return repoFiles.includes(normalizedPath)
    })
    return foundPath
  }
  return { projectDir: '.', locatePath, getPackageJson }
}

const Framework = (framework) => {
  return <div key={framework.name}>{JSON.stringify(framework)}</div>
}

export const App = () => {
  const [frameworks, setFrameworks] = useState([])

  useEffect(async () => {
    const context = await getContext()
    setFrameworks(await listFrameworks(context))
  }, [])

  return frameworks.map((framework) => <Framework {...framework} />)
}
