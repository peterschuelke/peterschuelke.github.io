const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

// Create public directory
const publicDir = path.join(process.cwd(), 'web', 'public', 'data')

// Create the directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

// Fallback data in case the database is not available
const fallbackData = {
  posts: [
    {
      id: 1,
      title: "Welcome to the Blog",
      body: "This is a sample article. The database is not available in this environment.",
      createdAt: new Date().toISOString()
    }
  ],
  projects: [
    {
      id: 1,
      title: "Sample Project",
      description: "This is a sample project. The database is not available in this environment.",
      summary: "A brief summary of the sample project",
      image: "/images/sample-project.png",
      link: "https://example.com",
      role: "Developer",
      skills: [],
      createdAt: new Date().toISOString()
    }
  ]
}

async function generateStaticData() {
  try {
    // GraphQL query
    const query = `
      query {
        posts {
          id
          title
          body
          createdAt
        }
        projects {
          id
          title
          description
          summary
          image
          link
          role
          skills {
            id
            title
          }
          createdAt
        }
      }
    `

    // Make the GraphQL request
    const response = await fetch('http://localhost:8911/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    let data

    if (!response.ok) {
      console.warn('Failed to fetch data from GraphQL API, using fallback data')
      data = { data: fallbackData }
    } else {
      const result = await response.json()

      if (result.errors) {
        console.warn('GraphQL errors encountered, using fallback data:', result.errors)
        data = { data: fallbackData }
      } else {
        data = result
        // Ensure we have at least the fallback data if the arrays are empty
        if (!data.data.posts || data.data.posts.length === 0) {
          data.data.posts = fallbackData.posts
        }
        if (!data.data.projects || data.data.projects.length === 0) {
          data.data.projects = fallbackData.projects
        }
      }
    }

    // Write the posts to JSON files
    const posts = data.data.posts || fallbackData.posts
    fs.writeFileSync(
      path.join(publicDir, 'articles.json'),
      JSON.stringify(posts, null, 2)
    )

    posts.forEach(post => {
      fs.writeFileSync(
        path.join(publicDir, `article-${post.id}.json`),
        JSON.stringify(post, null, 2)
      )
    })

    // Write the projects to JSON files
    const projects = data.data.projects || fallbackData.projects
    fs.writeFileSync(
      path.join(publicDir, 'projects.json'),
      JSON.stringify(projects, null, 2)
    )

    projects.forEach(project => {
      fs.writeFileSync(
        path.join(publicDir, `project-${project.id}.json`),
        JSON.stringify(project, null, 2)
      )
    })

    console.log('Static data generated successfully!')
  } catch (error) {
    console.error('Error generating static data:', error)
    // Even if there's an error, write the fallback data
    fs.writeFileSync(
      path.join(publicDir, 'articles.json'),
      JSON.stringify(fallbackData.posts, null, 2)
    )
    fallbackData.posts.forEach(post => {
      fs.writeFileSync(
        path.join(publicDir, `article-${post.id}.json`),
        JSON.stringify(post, null, 2)
      )
    })
    fs.writeFileSync(
      path.join(publicDir, 'projects.json'),
      JSON.stringify(fallbackData.projects, null, 2)
    )
    fallbackData.projects.forEach(project => {
      fs.writeFileSync(
        path.join(publicDir, `project-${project.id}.json`),
        JSON.stringify(project, null, 2)
      )
    })
    console.log('Fallback data written successfully')
  }
}

// Run the function
generateStaticData()