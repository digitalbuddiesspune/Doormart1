import { Product } from '../models/product.js';
import Order from '../models/Order.js';
import { Address } from '../models/Address.js';
import User from '../models/User.js';

const slugify = (value = '') =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const parseCurrency = (value) => {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  const parsed = Number(String(value).replace(/[^0-9.]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
};

// Helper function to find product in the unified collection
async function findProductById(productId) {
  if (!productId) {
    return null;
  }
  
  // Convert to string if it's an ObjectId
  const idString = productId.toString ? productId.toString() : productId;
  
  return Product.findById(idString).lean();
}

// Helper function to populate order items with products from all collections
async function populateOrderItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return [];
  }
  
  return Promise.all(
    items.map(async (item) => {
      try {
        // Handle both ObjectId and string product IDs
        const productId = item.product?.toString ? item.product.toString() : item.product;
        
        if (!productId) {
          console.warn(`[populateOrderItems] Item missing product ID:`, item);
          return {
            ...item,
            product: { _id: null, title: 'Product not found' },
          };
        }
        
        const product = await findProductById(productId);
        
        if (!product) {
          console.warn(`[populateOrderItems] Product not found for ID: ${productId}`);
        }
        
        // item is already a plain object from .lean(), so just spread it
        return {
          ...item,
          product: product || { _id: productId, title: 'Product not found' },
        };
      } catch (err) {
        console.error(`[populateOrderItems] Error processing item:`, err);
        return {
          ...item,
          product: { _id: item.product, title: 'Error loading product' },
        };
      }
    })
  );
}

export async function createProduct(req, res) {
  try {
    const body = req.body || {};
    const mainCategory = body.mainCategory || body.Category || body.category || '';
    const subCategory = body.subCategory || body['Sub-Category'] || body.subcategory || '';
    const subSubCategory = body.subSubCategory || body['Sub-sub-Category'] || body.subSubCategory || '';
    const title = body.title || body.skuName || body['SKU Name'] || '';
    const mrpValue = parseCurrency(body.mrp ?? body.MRP);
    const discountPercent = Number(body.discountPercent || 0);
    const description = body.description || body['About the Product'] || body.aboutProduct || '';
    const productInfo = body.product_info || {};
    const images = body.images || {};
    const categoryId = body.categoryId;

    if (!title || !mrpValue || !mainCategory) {
      return res.status(400).json({ message: 'title (or SKU Name), mrp, and category are required' });
    }

    const payload = {
      title,
      mrp: mrpValue,
      discountPercent,
      description,
      category: mainCategory,
      subcategory: subCategory,
      subSubCategory,
      taxonomy: {
        mainCategory,
        mainCategorySlug: slugify(mainCategory),
        subCategory,
        subCategorySlug: slugify(subCategory),
        subSubCategory,
        subSubCategorySlug: slugify(subSubCategory),
      },
      sourceData: {
        source: body.source || 'manual',
        productLink: body.productLink || body['Product Link'] || '',
        eanCode: body.eanCode || body['EAN Code'] || '',
        skuName: body.skuName || body['SKU Name'] || title,
        skuSize: body.skuSize || body['SKU Size'] || '',
        imageLink: body.imageLink || body['Image Link'] || images.image1 || '',
        aboutProduct: body.aboutProduct || body['About the Product'] || description,
        raw: body,
      },
      product_info: {
        brand: productInfo.brand || body.brand || body.Brand || '',
        manufacturer: productInfo.manufacturer || body.brand || body.Brand || '',
        
        /* ---- Kids Clothing ---- */
        clothingType: productInfo.clothingType || '',
        gender: productInfo.gender || '',
        ageGroup: productInfo.ageGroup || '',
        availableSizes: Array.isArray(productInfo.availableSizes) ? productInfo.availableSizes : 
                       (productInfo.availableSizes ? [productInfo.availableSizes] : []),
        fabric: productInfo.fabric || '',
        color: productInfo.color || '',
        
        /* ---- Footwear ---- */
        footwearType: productInfo.footwearType || '',
        shoeMaterial: productInfo.shoeMaterial || '',
        soleMaterial: productInfo.soleMaterial || '',
        
        /* ---- Kids Accessories ---- */
        accessoryType: productInfo.accessoryType || '',
        material: productInfo.material || '',
        
        /* ---- Baby Care ---- */
        babyCareType: productInfo.babyCareType || '',
        ageRange: productInfo.ageRange || '',
        safetyStandard: productInfo.safetyStandard || '',
        quantity: productInfo.quantity || '',
        
        /* ---- Toys ---- */
        toyType: productInfo.toyType || '',
        batteryRequired: productInfo.batteryRequired || false,
        batteryIncluded: productInfo.batteryIncluded || false,
        
        /* ---- Universal ---- */
        includedComponents: productInfo.includedComponents || '',
        
        // Legacy fields for backward compatibility
        SareeLength: productInfo.SareeLength || '',
        SareeMaterial: productInfo.SareeMaterial || productInfo.fabric || productInfo.material || '',
        SareeColor: productInfo.SareeColor || productInfo.color || '',
        IncludedComponents: productInfo.IncludedComponents || productInfo.includedComponents || '',
        shoeSize: productInfo.shoeSize || productInfo.availableSizes?.[0] || '',
        shoeColor: productInfo.shoeColor || productInfo.color || '',
        shoeType: productInfo.shoeType || productInfo.footwearType || '',
        watchBrand: productInfo.watchBrand || '',
        movementType: productInfo.movementType || '',
        caseMaterial: productInfo.caseMaterial || '',
        bandMaterial: productInfo.bandMaterial || '',
        waterResistance: productInfo.waterResistance || '',
        watchType: productInfo.watchType || '',
      },
      images: {
        image1: images.image1 || body.imageLink || body['Image Link'],
        image2: images.image2,
        image3: images.image3,
      },
    };

    if (categoryId) payload.categoryId = categoryId;

    // Unified collection for new taxonomy-driven products.
    const product = await Product.create(payload);
    
    return res.status(201).json(product);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create product', error: err.message });
  }
}

export async function updateOrderStatus(req, res) {
  try {
    const { id } = req.params;
    let { status, orderStatus } = req.body || {};
    const newStatus = (status || orderStatus || '').toString().toLowerCase();

    const allowed = new Set(['created','confirmed','on_the_way','delivered','failed','paid']);
    if (!allowed.has(newStatus)) {
      return res.status(400).json({ message: 'Invalid status', allowed: Array.from(allowed) });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { $set: { status: newStatus } },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.json(order);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update order status', error: err.message });
  }
}

export async function adminListProducts(req, res) {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    const normalized = products.map((p) => ({
      ...p,
      title: p.title || p['SKU Name'] || p.sourceData?.skuName || '',
      category: p.category || p.Category || p.sourceData?.raw?.Category || '',
      description: p.description || p['About the Product'] || p.sourceData?.aboutProduct || '',
      mrp: Number(p.mrp || p.MRP || p.Price || 0) || 0,
      product_info: {
        ...(p.product_info || {}),
        brand: p.product_info?.brand || p.Brand || p.sourceData?.raw?.Brand || '',
      },
      images: {
        ...(p.images || {}),
        image1: p.images?.image1 || p['Image Link'] || p.sourceData?.imageLink || '',
      },
      sourceData: {
        ...(p.sourceData || {}),
        skuName: p.sourceData?.skuName || p['SKU Name'] || p.title || '',
        skuSize: p.sourceData?.skuSize || p['SKU Size'] || '',
        aboutProduct: p.sourceData?.aboutProduct || p['About the Product'] || p.description || '',
        imageLink: p.sourceData?.imageLink || p['Image Link'] || p.images?.image1 || '',
      },
    }));
    return res.json(normalized);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to list products', error: err.message });
  }
}

export async function deleteProductById(req, res) {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to delete product', error: err.message });
  }
}

export async function adminListOrders(req, res) {
  try {
    console.log('[adminListOrders] Fetching all orders...');
    
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .lean();

    console.log(`[adminListOrders] Found ${orders.length} orders`);

    // Get unique user IDs
    const userIds = Array.from(new Set(orders.map(o => String(o.user)).filter(Boolean)));
    
    // Fetch users and addresses
    const [users, addresses] = await Promise.all([
      userIds.length > 0 ? User.find({ _id: { $in: userIds } }).select('name email').lean() : [],
      userIds.length > 0 ? Address.find({ userId: { $in: userIds } }).lean() : [],
    ]);

    // Create maps for quick lookup
    const userMap = Object.fromEntries(users.map(u => [String(u._id), u]));
    const addrMap = Object.fromEntries(addresses.map(a => [String(a.userId), a]));

    // Populate orders with user data, addresses, and products
    const enriched = await Promise.all(
      orders.map(async (order) => {
        try {
          // Populate user
          const user = order.user ? userMap[String(order.user)] : null;
          
          // Populate order items with products
          const populatedItems = await populateOrderItems(order.items || []);
          
          // Get address (prefer shippingAddress, fallback to user's address)
          const address = order.shippingAddress || (order.user ? (addrMap[String(order.user)] || null) : null);
          
          return {
            ...order,
            user: user || { _id: order.user, name: 'Unknown', email: '' },
            items: populatedItems,
            address: address,
          };
        } catch (err) {
          console.error(`[adminListOrders] Error processing order ${order._id}:`, err);
          return {
            ...order,
            user: order.user ? userMap[String(order.user)] : { _id: order.user, name: 'Unknown', email: '' },
            items: order.items || [],
            address: order.shippingAddress || null,
          };
        }
      })
    );

    console.log(`[adminListOrders] Successfully processed ${enriched.length} orders`);
    return res.json(enriched);
  } catch (err) {
    console.error('[adminListOrders] Error:', err);
    return res.status(500).json({ message: 'Failed to list orders', error: err.message });
  }
}

export async function adminStats(req, res) {
  try {
    const [revenueAgg] = await Order.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } },
    ]);
    const totalRevenue = revenueAgg?.total || 0;
    const totalOrders = revenueAgg?.count || 0;
    
    const totalProducts = await Product.countDocuments();
    
    return res.json({ totalRevenue, totalOrders, totalProducts });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to load stats', error: err.message });
  }
}

export async function adminListAddresses(req, res) {
  try {
    const addrs = await Address.find({}).sort({ createdAt: -1 }).populate('userId', 'name email').lean();
    return res.json(addrs);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to list addresses', error: err.message });
  }
}

export async function adminUpdateAddress(req, res) {
  try {
    const { id } = req.params;
    const {
      fullName,
      mobileNumber,
      pincode,
      locality,
      address,
      addressLine1,
      addressLine2,
      city,
      state,
      landmark,
      alternatePhone,
      addressType,
    } = req.body || {};

    const updates = {};
    if (fullName !== undefined) updates.fullName = fullName;
    if (mobileNumber !== undefined) updates.mobileNumber = mobileNumber;
    if (pincode !== undefined) updates.pincode = pincode;
    if (locality !== undefined) updates.locality = locality;
    if (address !== undefined) updates.address = address;
    if (addressLine1 !== undefined) updates.addressLine1 = addressLine1;
    if (addressLine2 !== undefined) updates.addressLine2 = addressLine2;
    if (city !== undefined) updates.city = city;
    if (state !== undefined) updates.state = state;
    if (landmark !== undefined) updates.landmark = landmark;
    if (alternatePhone !== undefined) updates.alternatePhone = alternatePhone;
    if (addressType !== undefined) updates.addressType = addressType;

    const doc = await Address.findByIdAndUpdate(id, { $set: updates }, { new: true });
    if (!doc) return res.status(404).json({ message: 'Address not found' });
    return res.json(doc);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update address', error: err.message });
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const body = req.body || {};
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updates = {};
    const title = body.title || body.skuName || body['SKU Name'];
    const mrp = body.mrp ?? body.MRP ?? body.Price;
    const description = body.description || body.aboutProduct || body['About the Product'];
    const category = body.category || body.Category || body.mainCategory;
    const subcategory = body.subcategory || body.subCategory || body['Sub-Category'];
    const subSubCategory = body.subSubCategory || body['Sub-sub-Category'];
    const imageLink = body.imageLink || body['Image Link'];
    const brand = body.brand || body.Brand || body.product_info?.brand;

    if (typeof title !== 'undefined') updates.title = title;
    if (typeof mrp !== 'undefined') updates.mrp = parseCurrency(mrp);
    if (typeof description !== 'undefined') updates.description = description;
    if (typeof category !== 'undefined') updates.category = category;
    if (typeof subcategory !== 'undefined') updates.subcategory = subcategory;
    if (typeof subSubCategory !== 'undefined') updates.subSubCategory = subSubCategory;
    if (typeof body.discountPercent !== 'undefined') {
      updates.discountPercent = Number(body.discountPercent) || 0;
    }
    if (body.images || typeof imageLink !== 'undefined') {
      const currentImages = existingProduct.images || {};
      const nextImage1 = body.images?.image1 || imageLink || currentImages.image1 || '';
      if (nextImage1) {
        updates.images = {
          image1: nextImage1,
          image2: body.images?.image2 || currentImages.image2 || '',
          image3: body.images?.image3 || currentImages.image3 || '',
        };
      }
    }

    updates.sourceData = {
      ...(existingProduct.sourceData?.toObject ? existingProduct.sourceData.toObject() : existingProduct.sourceData || {}),
      source: body.source || existingProduct.sourceData?.source || 'manual',
      productLink: body.productLink || body['Product Link'] || existingProduct.sourceData?.productLink || '',
      eanCode: body.eanCode || body['EAN Code'] || existingProduct.sourceData?.eanCode || '',
      skuName: body.skuName || body['SKU Name'] || title || existingProduct.sourceData?.skuName || existingProduct.title || '',
      skuSize: body.skuSize || body['SKU Size'] || existingProduct.sourceData?.skuSize || '',
      imageLink: imageLink || body.images?.image1 || existingProduct.sourceData?.imageLink || existingProduct.images?.image1 || '',
      aboutProduct: body.aboutProduct || body['About the Product'] || description || existingProduct.sourceData?.aboutProduct || existingProduct.description || '',
      raw: body,
    };

    const nextMain = category || existingProduct.category || existingProduct.taxonomy?.mainCategory || '';
    const nextSub = subcategory || existingProduct.subcategory || existingProduct.taxonomy?.subCategory || '';
    const nextSubSub = subSubCategory || existingProduct.subSubCategory || existingProduct.taxonomy?.subSubCategory || '';
    updates.taxonomy = {
      mainCategory: nextMain,
      mainCategorySlug: slugify(nextMain),
      subCategory: nextSub,
      subCategorySlug: slugify(nextSub),
      subSubCategory: nextSubSub,
      subSubCategorySlug: slugify(nextSubSub),
    };

    updates.product_info = {
      ...(existingProduct.product_info?.toObject ? existingProduct.product_info.toObject() : existingProduct.product_info || {}),
      ...(body.product_info || {}),
      brand: brand || existingProduct.product_info?.brand || '',
      manufacturer: body.product_info?.manufacturer || brand || existingProduct.product_info?.manufacturer || '',
    };

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No updatable fields provided' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    return res.json(updatedProduct);
  } catch (err) {
    console.error('[admin.updateProduct] Failed:', err);
    return res.status(500).json({ message: 'Failed to update product', error: err.message });
  }
}
