import { CATALOG_DATABASE, CATEGORIES_LIST } from '../data/catalogData.js';

export const getCatalog = (req, res, next) => {
  try {
    const { category, search, searchType, coldChain } = req.query;

    let results = [...CATALOG_DATABASE];

    // Filter by Category
    if (category && category !== 'All Therapeutics') {
      results = results.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by Cold Chain
    if (coldChain === 'true') {
      results = results.filter(item => item.isColdChain);
    }

    // Filter by Search Query
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      if (searchType === 'brand') {
        results = results.filter(item => item.name.toLowerCase().includes(q) || item.manufacturer.toLowerCase().includes(q));
      } else if (searchType === 'molecule') {
        results = results.filter(item => item.molecule.toLowerCase().includes(q) || item.therapeuticClass.toLowerCase().includes(q));
      } else if (searchType === 'cas') {
        results = results.filter(item => item.casNumber.toLowerCase().includes(q));
      } else {
        results = results.filter(item => 
          item.name.toLowerCase().includes(q) ||
          item.molecule.toLowerCase().includes(q) ||
          item.casNumber.toLowerCase().includes(q) ||
          item.manufacturer.toLowerCase().includes(q) ||
          item.therapeuticClass.toLowerCase().includes(q)
        );
      }
    }

    res.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (err) {
    next(err);
  }
};

export const getProductById = (req, res, next) => {
  try {
    const { id } = req.params;
    const product = CATALOG_DATABASE.find(item => item.id.toLowerCase() === id.toLowerCase());

    if (!product) {
      const error = new Error(`Product with ID ${id} was not found in the pharmaceutical catalog.`);
      error.statusCode = 404;
      throw error;
    }

    res.json({
      success: true,
      data: product
    });
  } catch (err) {
    next(err);
  }
};

export const getCategories = (req, res, next) => {
  try {
    res.json({
      success: true,
      data: CATEGORIES_LIST
    });
  } catch (err) {
    next(err);
  }
};
