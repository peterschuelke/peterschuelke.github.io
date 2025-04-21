const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

// Create the static directory if it doesn't exist
const staticDir = path.join(process.cwd(), 'web', 'static', 'data')
if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir, { recursive: true })
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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    if (result.errors) {
      throw new Error(`GraphQL Error: ${JSON.stringify(result.errors)}`)
    }

    // Write the articles to a JSON file
    fs.writeFileSync(
      path.join(staticDir, 'articles.json'),
      JSON.stringify(result.data.posts, null, 2)
    )

    // Generate individual article files
    result.data.posts.forEach(post => {
      fs.writeFileSync(
        path.join(staticDir, `article-${post.id}.json`),
        JSON.stringify(post, null, 2)
      )
    })

    console.log('Static data generated successfully!')
  } catch (error) {
    console.error('Error generating static data:', error)
    process.exit(1)
  }
}

// Run the function
generateStaticData()