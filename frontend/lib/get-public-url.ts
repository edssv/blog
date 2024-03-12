export const getPublicUrl = {
  blog(id: number) {
    return `/blog/${id}`;
  },
  privacy() {
    return '/privacy';
  },
  terms() {
    return '/terms';
  },
  home() {
    return '/';
  }
};
