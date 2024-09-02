const express = require('express');
const router = express.Router();
const { chromium } = require('playwright');
const { Product, TempProduct, Sequelize } = require('../models');
const Op = Sequelize.Op;

// Function to scrape products
async function scrapeProducts(term, limit = 50) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`https://www.amazon.com/s?k=${encodeURIComponent(term)}`, { waitUntil: 'domcontentloaded' });

  const products = await page.evaluate((limit) => {
    const items = Array.from(document.querySelectorAll('.s-result-item[data-component-type="s-search-result"]'));
    return items.slice(0, limit).map(item => {
      const titleElement = item.querySelector('h2 a span');
      const priceWhole = item.querySelector('.a-price-whole');
      const priceFraction = item.querySelector('.a-price-fraction');
      const imageElement = item.querySelector('img.s-image');
      const linkElement = item.querySelector('h2 a');

      let price = 'N/A';
      if (priceWhole) {
        price = priceWhole.innerText.trim().replace('.', '');
        if (priceFraction) {
          price += '.' + priceFraction.innerText.trim();
        }
      }

      return {
        title: titleElement ? titleElement.innerText.trim() : 'N/A',
        price: price,
        imageUrl: imageElement ? imageElement.src : 'N/A',
        productUrl: linkElement ? 'https://www.amazon.com' + linkElement.getAttribute('href') : 'N/A',
      };
    });
  }, limit);

  await browser.close();
  return products;
}

// Route to initialize or update Bible products
router.get('/init-bible-products', async (req, res) => {
  try {
    const products = await scrapeProducts('bible', 50);
    
    // Clear existing bible products
    await Product.destroy({ where: {} });
    
    // Save new bible products
    await Product.bulkCreate(products);

    res.json({ message: 'Bible products initialized successfully', count: products.length });
  } catch (error) {
    console.error('Error initializing bible products:', error);
    res.status(500).json({ message: 'Error initializing bible products', error: error.message });
  }
});

// Route to scrape custom search terms
router.get('/scrape', async (req, res) => {
  try {
    const { term } = req.query;
    if (!term) {
      return res.status(400).json({ message: 'Search term is required' });
    }

    const products = await scrapeProducts(term, 50);

    // Clear existing temp products
    await TempProduct.destroy({ where: {} });

    // Save new temp products
    await TempProduct.bulkCreate(products);

    res.json({ message: 'Products scraped successfully', count: products.length });
  } catch (error) {
    console.error('Error scraping products:', error);
    res.status(500).json({ message: 'Error scraping products', error: error.message });
  }
});

// Route to get products
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let products;

    if (search) {
      // If there's a search term, look in TempProduct
      products = await TempProduct.findAll();
    } else {
      // If no search term, return bible products from Product
      products = await Product.findAll();
    }

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

module.exports = router;