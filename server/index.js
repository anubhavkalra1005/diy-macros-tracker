// server/index.js
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// GET all users
app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// POST a new user
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({ data: { name, email } });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/get-uoms', async (req, res) => {
  try {
    const foodUOMs = await prisma.foodUOM.findMany();
    res.json(foodUOMs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food UOMs' });
  }
});

app.post('/api/add-food-uom', async (req, res) => {
  const { name, unit } = req.body;
  try {
    const foodUOM = await prisma.foodUOM.create({ data: { name, unit } });
    res.json(foodUOM);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add food UOM' });
  }
});

app.post('/api/add-food-uoms', async (req, res) => {
  const foodUOMs = req.body; // Expecting an array of food UOMs
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

app.post('/api/macros-chart-master', async (req, res) => {
  const macrosChartReq = req.body;
  console.log('Received food items:', macrosChartReq);
  try {
    const createdFoodItems = await prisma.macrosChartMaster.create({
      data: macrosChartReq
    });
    res.json(createdFoodItems);
  } catch (error) {
    console.error('Error adding food items:', error);
    res.status(400).json({ error: 'Failed to add food items' });
  }
});

app.post('/api/create-bulk-macros-chart-master', async (req, res) => {
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

app.patch('/api/update-macros-chart-master/:id', async (req, res) => {
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
      }
    });
    res.json(updatedFoodItem);
  } catch (error) {
    console.error('Error updating food item:', error);
    res.status(400).json({ error: 'Failed to update food item' });
  }
});

app.delete('/api/delete-macros-chart-master/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.macrosChartMaster.delete({
      where: { id }
    });
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting food item:', error);
    res.status(400).json({ error: 'Failed to delete food item' });
  }
});

app.get('/api/get-macros-chart-master', async (req, res) => {
  try {
    const foodItems = await prisma.macrosChartMaster.findMany({
      include: {
        FoodUOM: { select: { unit: true } }
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
