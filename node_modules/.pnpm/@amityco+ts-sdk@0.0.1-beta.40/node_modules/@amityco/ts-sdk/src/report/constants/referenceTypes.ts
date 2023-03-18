export default {
  post: {
    domainName: 'posts',
    eventName: 'v3/post.isflagbyme',
    primaryKey: 'postId',
  },
  comment: {
    domainName: 'comments',
    eventName: 'v3/comment.isflagbyme',
    primaryKey: 'commentId',
  },
  message: {
    domainName: 'messages',
    eventName: 'v3/message.isFlaggedByMe',
    primaryKey: 'messageId',
  },
  user: {
    domainName: 'users',
    eventName: 'user.isFlagByMe',
    primaryKey: 'userId',
  },
};
