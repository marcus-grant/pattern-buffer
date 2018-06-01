import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

// import '../css/blog-post.scss'; // future styling

const pageTitle = 'Pattern Buffer';

// This will take among its props, an injected GraphQL query for blog posts
// TODO: Try different methods to replace dangerouslySetInnerHTML, like wrapping div
// TODO: Create proptypes
export default function Template({ data }) {
  const { markdownRemark: post } = data; // data.markdownRemark holds post data
  return (
    <div className="post__container">
      <Helmet title={`${pageTitle} - ${post.frontmatter.title}`} />
      <div className="post">
        <h1>{post.frontmatter.title}</h1>
        <div
          className="post__content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </div>
  );
}

Template.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({ post: PropTypes.object }),
  }).isRequired,
};

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        path
        title
      }
    }
  }
`;
