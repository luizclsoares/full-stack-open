// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) =>
  blogs.reduce((sum, item) => (sum += item.likes), 0);

module.exports = {
  dummy,
  totalLikes,
};
