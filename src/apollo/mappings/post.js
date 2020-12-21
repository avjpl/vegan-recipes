export const mapPost = (post) => ({
  id: post.sys.id,
  title: post.fields.title,
  slug: post.fields.slug,
  body: post.fields.body,
  publishDate: post.fields.publishDate,
});
