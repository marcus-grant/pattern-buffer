import React from 'react';
// import Link from 'gatsby-link';
import PropTypes from 'prop-types';
// import Helmet from 'react-helmet';

import NewsFeed from '../components/Wrappers/feed';

// import '../css/index.css'; // add some style if you want!

// export default function Index({ data }) {
export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <NewsFeed posts={posts} />
  );
}

Index.propTypes = {
  data: PropTypes.shape({ allMarkdownRemark: PropTypes.object.isRequired }),
};

Index.defaultProps = {
  data: null,
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 160)
          id
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            path
          }
        }
      }
    }
  }
`;
