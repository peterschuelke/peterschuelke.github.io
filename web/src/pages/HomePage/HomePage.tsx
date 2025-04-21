// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useQuery } from '@redwoodjs/web'
import { gql } from '@apollo/client'

import styles from './HomePage.module.css'
import { Success as ArticlesSuccess } from 'src/components/ArticlesCell/ArticlesCell'

const HomePage = () => {
  const { data, loading, error } = useQuery(gql`
    query ArticlesQuery {
      articles: posts {
        id
        title
        body
        createdAt
      }
    }
  `)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="home-page">
      <Metadata title="Home" description="Home page" />
      <h1>Welcome to the Blog</h1>
      <ArticlesSuccess articles={data?.articles} />
    </div>
  )
}

export default HomePage
