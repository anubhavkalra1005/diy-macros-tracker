// server/index.js
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// =============================
// 👤 USER ROUTES
// =============================

// 📥 GET all users
app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// ➕ POST a new user
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({ data: { name, email } });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// =============================
// ⚖️ UNIT OF MEASUREMENT (UOM) ROUTES
// =============================

// 📥 GET all UOMs
app.get('/api/uoms', async (req, res) => {
  try {
    const foodUOMs = await prisma.foodUOM.findMany();
    res.json(foodUOMs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food UOMs' });
  }
});

// ➕ POST a single UOM
app.post('/api/uoms', async (req, res) => {
  const { name, unit } = req.body;
  try {
    const foodUOM = await prisma.foodUOM.create({ data: { name, unit } });
    res.json(foodUOM);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add food UOM' });
  }
});

// 📦 POST multiple UOMs (bulk insert)
app.post('/api/uoms/bulk', async (req, res) => {
  const foodUOMs = req.body; // Expecting: { uoms: [ ... ] }
  console.log('Received food UOMs:', foodUOMs.uoms);
  try {
    const createdUOMs = await prisma.foodUOM.createMany({
      data: foodUOMs.uoms
    });
    res.json(createdUOMs);
  } catch (error) {
    console.error('Error adding food UOMs:', error);
    res.status(400).json({ error: 'Failed to add food UOMs' });
  }
});


// =============================
// 🍱 MACROS CHART ROUTES
// =============================

// ➕ POST a single macros chart item
app.post('/api/macros-chart', async (req, res) => {
  const macrosChartReq = req.body;
  console.log('Received food items:', macrosChartReq);
  try {
    const createdFoodItems = await prisma.macrosChartMaster.create({
      data: macrosChartReq,
      include: {
        FoodUOM: { select: { unit: true } } // Join with UOM unit
      }
    });
    res.json(createdFoodItems);
  } catch (error) {
    console.error('Error adding food items:', error);
    res.status(400).json({ error: 'Failed to add food items' });
  }
});

// 📦 POST multiple macros chart items (bulk insert)
app.post('/api/macros-chart/bulk', async (req, res) => {
  const macrosChartReq = req.body;
  console.log('Received food items:', macrosChartReq);
  try {
    const createdFoodItems = await prisma.macrosChartMaster.createMany({
      data: macrosChartReq.foodItems
    });
    res.json(createdFoodItems);
  } catch (error) {
    console.error('Error adding food items:', error);
    res.status(400).json({ error: 'Failed to add food items' });
  }
});

// ✏️ PATCH (update) a specific macros chart item by ID
app.patch('/api/macros-chart/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  console.log('Updating food item with ID:', id);
  const data = req.body;
  try {
    const updatedFoodItem = await prisma.macrosChartMaster.update({
      where: { id },
      data: {
        calories: data.calories,
        protein: data.protein,
        carbohydrates: data.carbohydrates,
        fats: data.fats
      },
      include: {
        FoodUOM: { select: { unit: true } } // Return updated item with UOM
      }
    });
    console.log('Updated food item:', updatedFoodItem);
    res.json(updatedFoodItem);
  } catch (error) {
    console.error('Error updating food item:', error);
    res.status(400).json({ error: 'Failed to update food item' });
  }
});

// ❌ DELETE a specific macros chart item by ID
app.delete('/api/macros-chart/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.macrosChartMaster.delete({
      where: { id }
    });
    res.json({ message: 'Item Deleted Successfully' });
  } catch (error) {
    console.error('Error deleting food item:', error);
    res.status(400).json({ error: 'Failed to delete food item' });
  }
});

// 📥 GET all macros chart items
app.get('/api/macros-chart', async (req, res) => {
  try {
    const foodItems = await prisma.macrosChartMaster.findMany({
      include: {
        FoodUOM: { select: { unit: true } } // Include UOM unit in response
      }
    });
    res.json(foodItems);
  } catch (error) {
    console.error('Error fetching food items:', error);
    res.status(500).json({ error: 'Failed to fetch food items' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
