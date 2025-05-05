import { Link, routes } from '@redwoodjs/router'
import styles from './BlogLayout.module.pcss'

type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  return (
    <div className={styles.layout}>
      <header>
        <h1>
          <Link to={routes.home()}>Peter Schuelke&apos;s Profile</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to={routes.home()}>Home</Link>
            </li>
            <li>
              <Link to={routes.about()}>About</Link>
            </li>
            <li>
              <a href="/storybook/index.html" target="_blank" rel="noopener noreferrer">Storybook</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default BlogLayout
