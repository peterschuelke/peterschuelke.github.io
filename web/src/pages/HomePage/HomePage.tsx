// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import ArticlesCell from 'src/components/ArticlesCell'

const HomePage = () => {
  return (
    <div className="home-page">
      <Metadata title="Home" description="Home page" />
      <h1>Welcome to the Blog</h1>
      <ArticlesCell />
    </div>
  )
}

export default HomePage
