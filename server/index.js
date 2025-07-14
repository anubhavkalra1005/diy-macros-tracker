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
    const foodUOMs = await prisma.food_UOM.findMany();
    res.json(foodUOMs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food UOMs' });
  }
});

app.post('/api/add-food-uom', async (req, res) => {
  const { name, unit } = req.body;
  try {
    const foodUOM = await prisma.food_UOM.create({ data: { name, unit } });
    res.json(foodUOM);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add food UOM' });
  }
});

app.post('/api/add-food-uoms', async (req, res) => {
  const foodUOMs = req.body; // Expecting an array of food UOMs
  console.log('Received food UOMs:', foodUOMs.uoms);
  try {
    const createdUOMs = await prisma.food_UOM.createMany({
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
  console.log('Received food items:', foodItems);
  try {
    const createdFoodItems = await prisma.macros_chart_master.createMany({
      data: macrosChartReq.foodItems
    });
    res.json(createdFoodItems);
  } catch (error) {
    console.error('Error adding food items:', error);
    res.status(400).json({ error: 'Failed to add food items' });
  }
});

app.patch('/api/update-macros-chart-master', async (req, res) => {
  const { id, data } = req.body;
  try {
    const updatedFoodItem = await prisma.macros_chart_master.update({
      where: { id },
      data: {
        calories: data.calories,
        protein: data.protein,
        carbs: data.carbs,
        fats: data.fats
      }
    });
    res.json(updatedFoodItem);
  } catch (error) {
    console.error('Error updating food item:', error);
    res.status(400).json({ error: 'Failed to update food item' });
  }
});

app.post('/api/get-macros-chart-master', async (req, res) => {
  try {
    const foodItems = await prisma.macros_chart_master.findMany();
    res.json(foodItems);
  } catch (error) {
    console.error('Error fetching food items:', error);
    res.status(500).json({ error: 'Failed to fetch food items' });
  }
});

app.post('/api/user-specific-macros-chart', async (req, res) => {
  const requestPayload = req.body;
  try {
    const userSpecificMacros = await prisma.macros_chart.createMany({
      data: requestPayload.data
    });
    res.json(userSpecificMacros);
  } catch (error) {
    console.error('Error adding user-specific macros chart:', error);
    res.status(400).json({ error: 'Failed to add user-specific macros chart' });
  }
  
});

app.get('/api/user-specific-macros-chart/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  try {
    const userMacrosChart = await prisma.macros_chart.findMany({
      where: { userId }
    });
    res.json(userMacrosChart);
  } catch (error) {
    console.error('Error fetching user-specific macros chart:', error);
    res.status(500).json({ error: 'Failed to fetch user-specific macros chart' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
