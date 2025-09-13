// index.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/downloads', express.static(path.join(__dirname, 'downloads')));

app.get('/api/products', (req, res) => {
  const productsPath = path.join(__dirname, 'products.json');
  if (!fs.existsSync(productsPath)) return res.status(404).json({ error: "products.json یافت نشد" });

  const rawData = fs.readFileSync(productsPath);
  try {
    const products = JSON.parse(rawData);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "خطا در خواندن JSON محصولات" });
  }
});

app.get('/', (req, res) => res.send("Backend فروشگاه آماده است!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend آماده روی پورت ${PORT}`);
});
