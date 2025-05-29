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
const projects = [{
  id: 1,
  title: "NBA League Pass",
  slug: "nba-league-pass",
  description: "A streaming platform for NBA games",
  summary: "Built a streaming platform for NBA games",
  problem: "NBA needed a modern streaming platform to reach global audiences",
  solution: "Developed a scalable streaming platform with real-time stats",
  execution: "Led front-end development using React and GraphQL",
  results: "Successfully launched in 180+ countries",
  image: "/images/nba-league-pass.png",
  link: "https://www.nba.com/leaguepass",
  role: "Lead Frontend Developer",
  skills: [{
    id: 1,
    title: "React"
  }, {
    id: 2,
    title: "GraphQL"
  }, {
    id: 3,
    title: "TypeScript"
  }]
}, {
  id: 2,
  title: "CrossFit Games",
  slug: "crossfit-games",
  description: "The official CrossFit Games website",
  summary: "Built the official CrossFit Games website",
  problem: "CrossFit needed a modern website for their annual games",
  solution: "Developed a responsive website with live scoring",
  execution: "Led front-end development using React and Redux",
  results: "Successfully launched for the 2020 CrossFit Games",
  image: "/images/crossfit-games.png",
  link: "https://games.crossfit.com",
  role: "Lead Frontend Developer",
  skills: [{
    id: 1,
    title: "React"
  }, {
    id: 2,
    title: "Redux"
  }, {
    id: 3,
    title: "TypeScript"
  }]
}, {
  id: 3,
  title: "CHOP Patient Portal",
  slug: "chop-patient-portal",
  description: "A patient portal for Children's Hospital of Philadelphia",
  summary: "Built a patient portal for CHOP",
  problem: "CHOP needed a modern patient portal",
  solution: "Developed a secure patient portal with real-time updates",
  execution: "Led front-end development using React and GraphQL",
  results: "Successfully launched for all CHOP patients",
  image: "/images/chop-patient-portal.png",
  link: "https://www.chop.edu",
  role: "Lead Frontend Developer",
  skills: [{
    id: 1,
    title: "React"
  }, {
    id: 2,
    title: "GraphQL"
  }, {
    id: 3,
    title: "TypeScript"
  }]
}];
const loadProject = async (slug) => {
  return projects.find((p) => p.slug === slug);
};
const loadProjects = async () => {
  return projects;
};
export {
  loadProjects as a,
  loadProject as b,
  loadArticle as l
};
//# sourceMappingURL=staticData-CwXKAj_M.js.map
