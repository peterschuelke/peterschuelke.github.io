export const loadStaticData = async (path: string) => {
  try {
    const response = await fetch(`/data/${path}`)
    if (!response.ok) {
      throw new Error(`Failed to load static data: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error loading static data:', error)
    return null
  }
}

export const loadArticles = async () => {
  return loadStaticData('articles.json')
}

export const loadArticle = async (id: number) => {
  return loadStaticData(`article-${id}.json`)
}

export const loadProject = async (id) => {
  return loadStaticData(`project-${id}.json`)
}

export const loadProjects = async () => {
  return loadStaticData('projects.json')
}