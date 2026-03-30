import { Category } from '../models/Category.js';
import { Product } from '../models/product.js';

export const getHeaderData = async (req, res) => {
  try {
    // Get all categories for the navigation
    const categories = await Category.find({}, 'name slug -_id').sort({ name: 1 });

    // Mock data for other header elements
    const headerData = {
      logo: {
        url: '/logo.png',
        alt: 'avfmcgdelivery Logo'
      },
      navigation: {
        categories: categories,
        links: [
          { name: 'Home', url: '/' },
          { name: 'New Arrivals', url: '/new-arrivals' },
          { name: 'Best Sellers', url: '/best-sellers' },
          { name: 'Deals', url: '/deals' },
          { name: 'Contact', url: '/contact' }
        ]
      },
      search: {
        placeholder: 'Search for shoes, watches, and more...',
        suggestions: [
          'Sports Shoes',
          'Running Shoes',
          'Smart Watches',
          'Luxury Watches',
          'Formal Shoes'
        ]
      },
      userLinks: {
        wishlist: { url: '/wishlist', label: 'Wishlist' },
        cart: { url: '/cart', label: 'Cart' },
        account: { url: '/account', label: 'Account' }
      }
    };

    res.json(headerData);
  } catch (error) {
    console.error('Error fetching header data:', error);
    res.status(500).json({ message: 'Error fetching header data', error: error.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.trim() === '') {
      return res.json({ results: [] });
    }

    const searchRegex = { $regex: query, $options: 'i' };
    const searchQuery = {
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
        { 'Category': searchRegex },
        { 'SKU Name': searchRegex },
        { 'About the Product': searchRegex },
        { 'Brand': searchRegex },
        { 'product_info.brand': searchRegex },
        { 'product_info.manufacturer': searchRegex },
        { 'product_info.clothingType': searchRegex },
        { 'product_info.footwearType': searchRegex },
        { 'product_info.accessoryType': searchRegex },
        { 'product_info.babyCareType': searchRegex },
        { 'product_info.toyType': searchRegex },
        { 'product_info.shoeMaterial': searchRegex },
        { 'product_info.material': searchRegex },
        { 'product_info.fabric': searchRegex },
        { 'product_info.shoeType': searchRegex },
        { 'product_info.watchBrand': searchRegex },
        { 'product_info.watchType': searchRegex }
      ]
    };

    const limitedResults = await Product.find(searchQuery)
      .limit(20)
      .select({
        title: 1,
        images: 1,
        price: 1,
        mrp: 1,
        discountPercent: 1,
        _id: 1,
        description: 1,
        product_info: 1,
        category: 1,
        'SKU Name': 1,
        MRP: 1,
        Price: 1,
        'About the Product': 1,
        Brand: 1,
        'Image Link': 1,
      })
      .lean();

    const normalizedResults = limitedResults.map((product) => {
      const normalized = { ...product };
      if (!normalized.title && normalized['SKU Name']) {
        normalized.title = normalized['SKU Name'];
      }
      if ((!normalized.mrp || Number.isNaN(Number(normalized.mrp))) && normalized['MRP']) {
        normalized.mrp = Number(String(normalized['MRP']).replace(/[^0-9.]/g, '')) || 0;
      }
      if ((!normalized.mrp || Number.isNaN(Number(normalized.mrp))) && normalized['Price']) {
        normalized.mrp = Number(String(normalized['Price']).replace(/[^0-9.]/g, '')) || 0;
      }
      if (!normalized.description && normalized['About the Product']) {
        normalized.description = normalized['About the Product'];
      }
      if (!normalized.product_info) {
        normalized.product_info = {};
      }
      if (!normalized.product_info.brand && normalized['Brand']) {
        normalized.product_info.brand = normalized['Brand'];
      }
      if (!normalized.images) {
        normalized.images = {};
      }
      if (!normalized.images.image1 && normalized['Image Link']) {
        normalized.images.image1 = normalized['Image Link'];
      }
      return normalized;
    });

    console.log(`Search for "${query}": Found ${normalizedResults.length} products`);
    res.json({ results: normalizedResults });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Error performing search', error: error.message });
  }
};

