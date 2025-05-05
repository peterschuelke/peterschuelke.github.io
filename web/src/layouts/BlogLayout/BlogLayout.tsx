import { Link, routes } from '@redwoodjs/router'
import './BlogLayout.pcss'

type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  return (
    <div className="blog-layout">
      <header className="blog-layout__header">
        <h1 className="blog-layout__title">
          <Link to={routes.home()}>Peter Schuelke&apos;s Profile</Link>
        </h1>
        <nav className="blog-layout__nav">
          <ul className="blog-layout__nav-list">
            <li className="blog-layout__nav-item">
              <Link to={routes.home()}>Home</Link>
            </li>
            <li className="blog-layout__nav-item">
              <Link to={routes.about()}>About</Link>
            </li>
            <li className="blog-layout__nav-item">
              <a href="/storybook/index.html" target="_blank" rel="noopener noreferrer">Storybook</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="blog-layout__main">{children}</main>
    </div>
  )
}

export default BlogLayout
