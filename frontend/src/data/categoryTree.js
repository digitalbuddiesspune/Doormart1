export const slugifyCategory = (value = '') =>
  value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

/** Main category → subcategory only (no leaf / sub-sub level). */
export const categoryTree = [
  {
    name: 'Beauty & Hygiene',
    subcategories: [
      { name: 'Bath & Hand Wash' },
      { name: 'Feminine Hygiene' },
      { name: 'Fragrances & Deos' },
      { name: 'Hair Care' },
      { name: 'Health & Medicine' },
      { name: 'Makeup' },
      { name: "Men's Grooming" },
      { name: 'Oral Care' },
      { name: 'Skin Care' },
    ],
  },
  {
    name: 'Beverages',
    subcategories: [
      { name: 'Coffee' },
      { name: 'Energy & Soft Drinks' },
      { name: 'Health Drink & Supplements' },
      { name: 'Tea' },
      { name: 'Water' },
      { name: 'Fruit Juices' },
    ],
  },
  {
    name: 'Cleaning & Household',
    subcategories: [
      { name: 'All Purpose Cleaners' },
      { name: 'Bins & Bathroom Ware' },
      { name: 'Car & Shoe Care' },
      { name: 'Mops, Brushes & Scrubs' },
      { name: 'Party & Festive Needs' },
      { name: 'Detergents & Dishwash' },
      { name: 'Disposables & Garbage Bags' },
      { name: 'Fresheners & Repellents' },
      { name: 'Sports & Fitness' },
      { name: 'Toys & Games' },
    ],
  },
  {
    name: 'Snacks & Branded Foods',
    subcategories: [
      { name: 'Biscuits & Cookies' },
      { name: 'Breakfast Cereals' },
      { name: 'Chocolates & Candies' },
      { name: 'Frozen Foods' },
      { name: 'Indian Mithai' },
      { name: 'Noodles / Pasta' },
      { name: 'Pickles & Chutney' },
      { name: 'Ready to Cook & Eat' },
      { name: 'Snacks & Namkeen' },
      { name: 'Spreads & Sauces' },
    ],
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
