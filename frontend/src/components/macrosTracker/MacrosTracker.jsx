import AddFoodForm from "./AddFoodForm";
import { useEffect, useState } from "react";
import FoodItems from "./FoodItems";

export default function MacrosTracker() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await fetch('/api/macros-chart');
                if (!response.ok) throw new Error('Failed to fetch food items');
                const foodItems = await response.json();
                console.log('Fetched Food Items:', foodItems);
                setData(foodItems);
            } catch (error) {
                console.error('Error fetching food items:', error);
            }
        };

        fetchFoodItems();
    }, []);

    return (
        <>
            <div className="macros-chart-container" style={{ maxWidth: 900, margin: '2rem auto', padding: '1rem' }}>
                <h2 style={{ textAlign: 'center', color: '#3a86ff', marginBottom: '1.5rem' }}>Macros Tracker</h2>
                {/* Add Food Form */}
                <AddFoodForm data={data} />
                {/* Food Items Table */}
                {/* <FoodItems /> */}
            </div>
        </>
    );

}