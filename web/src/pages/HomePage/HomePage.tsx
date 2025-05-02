// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import ArticlesCell from 'src/components/ArticlesCell'
import ProjectsCell from 'src/components/Project/ProjectsCell/ProjectsCell'

const HomePage = () => {
  return (
    <div className="home-page">
      <Metadata title="Home" description="Home page" />
      <h1>Peter Schuelke's Portfolio</h1>
      <h2>Projects</h2>
      <ProjectsCell />
      <h2>Articles</h2>
      <ArticlesCell />
    </div>
  )
}

export default HomePage
