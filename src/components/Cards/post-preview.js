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
    className="post-preview__card-container"
    key={post.id}
  >
    <Link to={post.frontmatter.path}>
      <h3 className="post-preview__title">{post.frontmatter.title}</h3>
    </Link>
    <h4 className="post-preview__date">{post.frontmatter.date}</h4>
    <div className="post-preview__content">
      <p>{post.excerpt}</p>
      <Link
        to={post.frontmatter.path}
        className="post-preview__read-link"
      >...read more
      </Link>
    </div>
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
