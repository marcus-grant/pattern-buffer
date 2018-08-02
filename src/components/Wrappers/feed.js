// import Link from 'gatsby-link';
import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';

import PostPreview from '../Cards/post-preview';
import BREAKPOINTS from '../../consts/responsive-breakpoints';

// TODO: Deserialize data here or in index?
// TODO: Implement more filters, more complex fileters and user defined ones.
/**
 * NewsFeed is essentially the content part of the index of the site.
 * Here all posts are queried, sorted and rendered as PostPreviews.
 * The width of the site will eventually determine how many columns are used.
 * Eventually when more posts with tags and dates are created, filtering &
 * sorting controls will be implemented, probably on the Sidebar.
 */
// TODO: Consider refactoring by putting the separator rendering and logic
// ...in PostPreview
const newsFeedFromCondition = (posts, isMobile) => (
  <div className="feed__container">
    <div className="blog-posts">
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
          .map(post => [
            (isMobile && <div key={`post-sep-${post.node.id}`} className="table-item__separator" />),
            <PostPreview key={post.node.id} post={post.node} isMobile={isMobile} />,
          ])}
    </div>
    { isMobile && <div className="table-item__separator" /> }
  </div>
);

const NewsFeed = ({ posts }) => (
  <Media query={`(max-width: ${BREAKPOINTS.tablet}px)`}>
    {isMobile => newsFeedFromCondition(posts, isMobile)}
  </Media>
);

NewsFeed.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    node: PropTypes.shape({
      excerpt: PropTypes.string,
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
        path: PropTypes.string.isRequired,
      }),
      id: PropTypes.string.isRequired,
    }).isRequired,
  })),
};

NewsFeed.defaultProps = {
  posts: null,
};


export default NewsFeed;
