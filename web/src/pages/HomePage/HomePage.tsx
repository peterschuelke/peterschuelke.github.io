// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useState } from 'react'
import ProjectsList from 'src/components/Project/ProjectsList'
import Hero from 'src/components/Hero/Hero'

import './HomePage.pcss'

const HomePage = () => {
  const [isContentVisible, setIsContentVisible] = useState(false)

  return (
    <div className="home-page">
      <Metadata title="Home" description="Home page" />
      <Hero onAnimationComplete={() => setIsContentVisible(true)} />
      <div className={`container--normal content ${isContentVisible ? 'content--visible' : ''}`}>
        <h2>My Work</h2>
        <ProjectsList />
      </div>
    </div>
  )
}

export default HomePage
