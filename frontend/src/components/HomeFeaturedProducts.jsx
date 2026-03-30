import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSarees } from '../services/api';
import { navbarCategories as appNavbarCategories } from '../data/categoryTree';
import { getProductImage, placeholders } from '../utils/imagePlaceholder';

const normalizeToTitleCase = (s) => {
  const input = (s ?? '').toString().trim();
  const t = input.replace(/-/g, ' ').toLowerCase();
  return t.replace(/\b\w/g, (c) => c.toUpperCase());
};

const getProductPrice = (p) => {
  const parsedPrice = Number(p?.price ?? 0) || 0;
  if (parsedPrice > 0) return parsedPrice;
  const parsedMrp = Number(p?.mrp ?? p?.originalPrice ?? p?.finalPrice ?? 0) || 0;
  return parsedMrp;
};

const getProductBrand = (p) =>
  p?.product_info?.brand ||
  p?.brand ||
  p?.product_info?.manufacturer ||
  p?.manufacturer ||
  p?.product_info?.brandName ||
  'DoorMart';

const getProductTitle = (p) => p?.title || p?.name || p?.product_info?.title || 'Untitled Product';

const getProductShortDescription = (p) =>
  String(
    p?.shortDescription ||
      p?.description ||
      p?.product_info?.shortDescription ||
      p?.product_info?.description ||
      ''
  ).trim();

const extractMainSlug = (path = '') => {
  const parts = path.split('/').filter(Boolean);
  // /category/:mainSlug
  return parts[1] || '';
};

const extractSubSlug = (path = '') => {
  const parts = path.split('/').filter(Boolean);
  // /category/:mainSlug/:subSlug
  return parts[2] || '';
};

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const navCategories = appNavbarCategories;

  const MAX_FEATURED_PRODUCTS = 100;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categoryProducts, setCategoryProducts] = useState(
    /** @type {Array<{ category: any, products: any[] }>} */ ([])
  );

  const loadForCategory = async (category) => {
    const mainSlug = extractMainSlug(category.path);
    const requestMainCategory = normalizeToTitleCase(mainSlug);

    // 1) Try main category only
    let data = await fetchSarees(null, null, requestMainCategory);
    let priced = (Array.isArray(data) ? data : []).filter((p) => getProductPrice(p) > 0);

    // 2) If empty, fall back to the first configured subcategory (if any)
    if (priced.length === 0 && Array.isArray(category.subcategories) && category.subcategories.length > 0) {
      const firstSubPath = category.subcategories[0]?.path || '';
      const subSlug = extractSubSlug(firstSubPath);
      if (subSlug) {
        data = await fetchSarees(subSlug, null, requestMainCategory);
        priced = (Array.isArray(data) ? data : []).filter((p) => getProductPrice(p) > 0);
      }
    }

    return priced.slice(0, MAX_FEATURED_PRODUCTS);
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError('');
        setCategoryProducts([]);

        const results = [];
        // Fetch sequentially so we don't overwhelm backend.
        // eslint-disable-next-line no-restricted-syntax
        for (const cat of navCategories) {
          // eslint-disable-next-line no-await-in-loop
          const prods = await loadForCategory(cat);
          if (prods.length > 0) results.push({ category: cat, products: prods });
        }

        if (!cancelled) setCategoryProducts(results);
      } catch (e) {
        if (!cancelled) setError('Failed to load featured products');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mergedProducts = useMemo(() => {
    const seen = new Set();
    const out = [];
    for (const entry of categoryProducts) {
      for (const p of entry.products) {
        const key = p?._id ?? p?.title;
        if (!key || seen.has(key)) continue;
        seen.add(key);
        out.push(p);
      }
    }
    return out.slice(0, MAX_FEATURED_PRODUCTS);
  }, [categoryProducts]);

  return (
    <section className="px-2 sm:px-4 md:px-6 lg:px-8 w-full bg-white">
      <div className="max-w-[1600px] mx-auto py-8 sm:py-10 md:py-12">
        <div className="px-1 sm:px-2">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl text-black font-extrabold uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}
          >
            Featured Products
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Auto-selected categories that have products
          </p>
        </div>

        {error && (
          <div className="px-1 sm:px-2 mt-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="mt-4 px-1 sm:px-2">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm animate-pulse"
                >
                  <div className="w-full aspect-[3/4] bg-gray-100" />
                  <div className="p-3">
                    <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : categoryProducts.length === 0 ? (
            <div className="text-center py-14 text-gray-600">
              No products available.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
              {mergedProducts.map((p) => (
                <div
                  key={p._id || p.title}
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/product/${p._id}`)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') navigate(`/product/${p._id}`);
                  }}
                  className="group bg-white overflow-hidden shadow-sm transition-all duration-300 cursor-pointer border border-gray-100 hover:shadow-md hover:translate-y-[-2px]"
                >
                  <div className="relative w-full aspect-[3/4] bg-white overflow-hidden flex items-center justify-center">
                    <img
                      src={getProductImage(p, 'image1') || placeholders.productList}
                      alt={getProductTitle(p)}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        // Prevent infinite error loop
                        e.target.onerror = null;
                        e.target.src = placeholders.productList;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-3 sm:p-4">
                    <p className="text-sm font-bold text-black line-clamp-2 mb-2">
                      {getProductTitle(p)}
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-2 min-h-[1.25rem]">
                      {getProductShortDescription(p) || '\u00A0'}
                    </p>
                    <div className="mt-3 flex items-end justify-between gap-2">
                      <p className="text-xs font-semibold text-[#5c9404] uppercase tracking-wide line-clamp-1">
                        {getProductBrand(p)}
                      </p>
                      <p className="text-sm font-extrabold text-green-600">
                        ₹{Math.round(getProductPrice(p)).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

