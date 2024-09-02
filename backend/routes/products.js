const express = require('express');
const router = express.Router();
const { chromium } = require('playwright');
const { Product } = require('../models');

router.get('/scrape', async (req, res) => {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://www.amazon.com/s?k=bible');

    const products = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.s-result-item[data-component-type="s-search-result"]'));
      return items.slice(0, 100).map(item => {
        const titleElement = item.querySelector('h2 a span');
        const priceElement = item.querySelector('.a-price-whole');
        const imageElement = item.querySelector('img.s-image');

        return {
          title: titleElement ? titleElement.innerText.trim() : 'N/A',
          price: priceElement ? priceElement.innerText.trim() : 'N/A',
          imageUrl: imageElement ? imageElement.src : 'N/A',
        };
      });
    });

    await browser.close();

    // Save products to the database
    await Product.bulkCreate(products, {
      updateOnDuplicate: ['price', 'imageUrl', 'updatedAt']
    });

    res.json({ message: 'Products scraped and saved successfully', count: products.length });
  } catch (error) {
    console.error('Error scraping products:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

module.exports = router;