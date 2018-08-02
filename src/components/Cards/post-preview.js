import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

/**
 * PostPreview is a failry simple component that simply renders a card
 * containing preview information about a post, with a link to read it.
 * The component de-serializes the data provided by the Gatsby...
 * ...GraphQL query that queries all pages in gatsby-node.js.
 *
 * The 'react-media' media query components require passing through
 * a conditional rendering function that renders child components a
 * certain way when a media query is met. For this reason helper functions
 * that handle these conditional rendering modes are used inside a very
 * simple PostPreview component to handle this behavior.
 */
// const bemClassFromBlockElem = (b, e) => {
//   return `${b}__${e}`;
// };
//
// const nonMobileClassFromElem = (e) => {
//   return bemClassFromBlockElem('card', e);
// };

const previewAsCards = post => (
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
          <p className="card__tag">
            #<b>tagA</b> #<b>tagB</b> #<b>tagC</b>
          </p>
        </div>
      </div>
    </Link>
  </div>
);

const previewAsTableItem = post => (
  <div className="table-item" key={post.id}>
    <Link className="table-item__link" to={post.frontmatter.path}>
      <div className="table-item__content">
        <div className="table-item__header">
          <h1 className="table-item__title">{post.frontmatter.title}</h1>
        </div>
        <div className="table-item__body">
          <p>{post.excerpt}</p>
        </div>
        <div className="table-item__footer">
          <p className="table-item__date">{post.frontmatter.date}</p>
          <p className="table-item__tag">
            #<b>tagA</b> #<b>tagB</b> #<b>tagC</b>
          </p>
        </div>
      </div>
    </Link>
  </div>
);

const conditionalPostPreview = (post, isMobile) => {
  if (isMobile) return previewAsTableItem(post);
  return previewAsCards(post);
};

const PostPreview = ({ post, isMobile }) => conditionalPostPreview(post, isMobile);

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
  isMobile: PropTypes.bool,
}; PropTypes.defaultProps = { isMobile: false };

export default PostPreview;
