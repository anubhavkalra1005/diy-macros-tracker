import React, { useState } from 'react';
import AddFoodForm from './AddFoodForm';
import FoodItems from './FoodItems';

const foodData = [
    { id: 1, name: 'Chicken Breast', unit: 'g', qty: 100, calories: 165, protein: 31, carbs: 0, fats: 3.6 },
    { id: 2, name: 'Brown Rice', unit: 'g', qty: 100, calories: 111, protein: 2.6, carbs: 23, fats: 0.9 },
    { id: 3, name: 'Broccoli', unit: 'g', qty: 100, calories: 34, protein: 2.8, carbs: 7, fats: 0.4 },
];

export default function MacrosChart() {
    const [data, setData] = useState(foodData);

    const addFood = (newFood) => {
        setData([...data, newFood]);
        console.log('New Food Item:', newFood);
    };

    return (
        <div className="macros-chart-container" style={{ maxWidth: 900, margin: '2rem auto', padding: '1rem' }}>
            <h2 style={{ textAlign: 'center', color: '#3a86ff', marginBottom: '1.5rem' }}>Macros Chart</h2>
            {/* Add Food Form */}
            <AddFoodForm func={addFood} data={data} />
            {/* Food Items Table */}
            <FoodItems data={data} setData={setData} />
        </div>
    );
}