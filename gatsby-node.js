const path = require('path')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const projectPostTemplate = path.resolve(`src/templates/projectTemplate.js`)

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              cover
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: projectPostTemplate,
        context: {
          // additional data can be passed via context
          cover: node.frontmatter.cover.replace('/images/uploads/', ''),
        },
      })
    })
  })
}
