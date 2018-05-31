import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import './post-preview.scss';

/**
 * PostPreview is a failry simple component that simply renders a card
 * containing preview information about a post, with a link to read it.
 * The component de-serializes the data provided by the Gatsby...
 * ...GraphQL query that queries all pages in gatsby-node.js.
 */
const PostPreview = ({ post }) => (
  <div
    className="blog-post__preview"
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
);

PostPreview.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    excerpt: PropTypes.string,
    frontmatter: PropTypes.shape({
      path: PropTypes.string.isRequired,
      title: PropTypes.string,
      date: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default PostPreview;
