// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import ProjectsList from 'src/components/Project/ProjectsList'
import './HomePage.pcss'

const HomePage = () => {
  return (
    <div className="home-page">
      <Metadata title="Home" description="Home page" />
      <h1>Peter Schuelke's Portfolio</h1>
      <h2>Projects</h2>
      <ProjectsList />
    </div>
  )
}

export default HomePage
