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
  <div className="card" key={post.id}>
    <Link className="card__link" to={post.frontmatter.path}>
      <div className="card__content">
        <div className="card__header">
          <h1 className="card__title">{post.frontmatter.title}</h1>
        </div>
        <div className="card__body">
          <p>{post.excerpt}</p>
        </div>
        <div className="card__footer">
          <p className="card__date">{post.frontmatter.date}</p>
          <p className="card__tag">#<b>js</b> #<b>opinion</b> #<b>cs</b></p>
        </div>
      </div>
    </Link>
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
