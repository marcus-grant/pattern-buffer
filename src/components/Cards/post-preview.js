import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

/**
 * PostPreview is a failry simple component that simply renders a card
 * containing preview information about a post, with a link to read it.
 * The component de-serializes the data provided by the Gatsby...
 * ...GraphQL query that queries all pages in gatsby-node.js.
 */
const PostPreview = ({ post }) => (
  <Link className="card__link" to={post.frontmatter.path}>
    <div className="card" key={post.id}>
      <div className="post-preview__title-container">
        <h3 className="card__title">{post.frontmatter.title}</h3>
        <h4 className="post-preview__date">{post.frontmatter.date}</h4>
      </div>
      <div className="post-preview__content">
        <p>{post.excerpt}</p>
      </div>
    </div>
  </Link>
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
