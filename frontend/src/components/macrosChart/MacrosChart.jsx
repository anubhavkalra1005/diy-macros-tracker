import React, { useEffect, useState } from 'react';
import AddFoodForm from './AddFoodForm';
import FoodItems from './FoodItems';

export default function MacrosChart() {
    const [data, setData] = useState([]);
    const [counter, setCounter] = useState(0);

    const addFood = (newFood) => {
        setData([...data, newFood]);
        var requestBody = {...newFood};
        delete requestBody.Food_UOM;
        // Send the new food item to the server
        fetch('/api/macros-chart-master', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to add food item');
            }
            return response.json();
        }).then(data => {
            console.log('Food item added successfully:', data);
            setCounter(counter + 1);
        }).catch(error => {
            console.error('Error adding food item:', error);
        });

        // Log the new food item to the console
        console.log('New Food Item:', newFood);
    };

    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await fetch('/api/get-macros-chart-master');
                if (!response.ok) throw new Error('Failed to fetch food items');
                const foodItems = await response.json();
                console.log('Fetched Food Items:', foodItems);
                setData(foodItems);
            } catch (error) {
                console.error('Error fetching food items:', error);
            }
        };

        fetchFoodItems();
    }, [counter]);

    return (
        <div className="macros-chart-container" style={{ maxWidth: 900, margin: '2rem auto', padding: '1rem' }}>
            <h2 style={{ textAlign: 'center', color: '#3a86ff', marginBottom: '1.5rem' }}>Macros Chart</h2>
            {/* Add Food Form */}
            <AddFoodForm func={addFood} data={data} />
            {/* Food Items Table */}
            <FoodItems data={data} setData={setData} prevCounter={counter} setCounter={setCounter} />
        </div>
    );
}