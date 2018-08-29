import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
// import Media from 'react-media';
import { RenderIfMobile } from '../components/Wrappers/Conditional/conditional';

// TODO: This should be its own set of conditional helper components
// const renderIf = (condition, children) => (condition ? children : null);

// import '../css/blog-post.scss'; // future styling

// This will take among its props, an injected GraphQL query for blog posts
// TODO: Find way to pass the title to the header
// TODO: Try different methods to replace dangerouslySetInnerHTML, like wrapping div
// TODO: Create proptypes
export default function Template({ data }) {
  const { markdownRemark: post } = data; // data.markdownRemark holds post data
  const pageTitle = 'Pattern Buffer';
  const renderPost = isMobile => (
    <div className={`post__container${isMobile ? '--mobile' : ''}`}>
      <Helmet title={`${pageTitle} - ${post.frontmatter.title}`} />
      <div
        className={`post__content${isMobile ? '--mobile' : ''}`}
        dangerouslySetInnerHTML={{ __html: post.html }} // eslint-disable-line
      />
    </div>
  );
  const postIfMobile = renderPost(true);
  const postIfNotMobile = renderPost(false);
  return (
    <RenderIfMobile isMobile={postIfMobile} notMobile={postIfNotMobile} />
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
