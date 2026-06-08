// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) =>
  blogs.reduce((sum, item) => (sum += item.likes), 0);

const favoriteBlog = (blogs) => {
  let favorite = blogs[0];

  blogs.forEach((blog) => {
    if (blog.likes > favorite.likes) {
      favorite = blog;
    }
  });

  return favorite;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
