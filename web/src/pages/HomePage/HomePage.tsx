// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import ProjectsCell from 'src/components/Project/ProjectsCell'
import styles from './HomePage.module.pcss'

const HomePage = () => {
  return (
    <div className={styles.homeContent}>
      <Metadata title="Home" description="Home page" />
      <h1>Peter Schuelke's Portfolio</h1>
      <h2>Projects</h2>
      <ProjectsCell />
    </div>
  )
}

export default HomePage
