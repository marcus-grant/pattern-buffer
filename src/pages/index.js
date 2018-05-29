import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
// import Helmet from 'react-helmet';

// import '../css/index.css'; // add some style if you want!

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <div className="blog-posts">
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => (
          <div
            className="blog-post-preview"
            key={post.id}
            style={{
              border: '1px solid black',
              margin: '12px',
              padding: '6px',
            }}
          >
            <h1>
              <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
            </h1>
            <h2>{post.frontmatter.date}</h2>
            <p>{post.excerpt}</p>
          </div>
      ))}
    </div>
  );
}

Index.propTypes = {
  data: PropTypes.shape({ allMarkdownRemark: PropTypes.object.isRequired }),
}; Index.defaultProps = {
  data: null,
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;
