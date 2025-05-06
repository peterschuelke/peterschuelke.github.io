// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import ProjectsList from 'src/components/Project/ProjectsList'
import Hero from 'src/components/Hero/Hero'

import './HomePage.pcss'

const HomePage = () => {
  return (
    <div className="home-page">
      <Metadata title="Home" description="Home page" />
      <Hero/>
      <h2>My Work</h2>
      <ProjectsList />
    </div>
  )
}

export default HomePage
