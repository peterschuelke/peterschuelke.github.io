// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import styles from './HomePage.module.css'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />
      <div className={styles['home-content']}>
        <h2>Welcome to My Profile</h2>
        <p>This is my personal website built with RedwoodJS.</p>
      </div>
    </>
  )
}

export default HomePage
