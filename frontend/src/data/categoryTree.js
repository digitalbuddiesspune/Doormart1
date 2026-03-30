export const slugifyCategory = (value = '') =>
  value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

/** Single main category for current catalog setup. */
export const categoryTree = [
  {
    name: 'FMCG',
    subcategories: [],
  },
];

export const navbarCategories = categoryTree.map((main) => {
  const mainSlug = slugifyCategory(main.name);
  return {
    name: main.name,
    path: `/category/${mainSlug}`,
    subcategories: main.subcategories.map((sub) => ({
      name: sub.name,
      path: `/category/${mainSlug}/${slugifyCategory(sub.name)}`,
    })),
  };
});
