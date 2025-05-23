const loadStaticData = async (path) => {
  try {
    const response = await fetch(`/data/${path}`);
    if (!response.ok) {
      throw new Error(`Failed to load static data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error loading static data:", error);
    return null;
  }
};
const loadArticle = async (id) => {
  return loadStaticData(`article-${id}.json`);
};
const loadProject = async (id) => {
  return loadStaticData(`project-${id}.json`);
};
const loadProjects = async () => {
  return loadStaticData("projects.json");
};
export {
  loadProjects as a,
  loadProject as b,
  loadArticle as l
};
//# sourceMappingURL=staticData-DnxBRx36.js.map
