import AddFoodForm from "./AddFoodForm";
import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import FoodItems from "./FoodItems";

export default function MacrosTracker({ currUser = 0 }) {

    const [macrosMasterData, setMacrosMasterData] = useState([]);
    const [macrosTrackerData, setMacrosTrackerData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today

    const updateSelectedDate = (date) => {
        setSelectedDate(date);
    };

    const addFood = (newItem) => {
        var { food_name, FoodUOM, ...requestBody } = newItem; // Removing food_name and FoodUOM from requestBody
        requestBody = { ...requestBody, date: selectedDate, user_id: currUser }; // Add user_id and date to requestBody
        console.log('Request Body:', requestBody);
        console.log('New Item:', newItem);
        fetch('/api/macros-tracker', {
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
        }).then(apiData => {
            console.log('Food item added successfully:', apiData);
            setMacrosTrackerData([...macrosTrackerData, { ...newItem, id: apiData.id }]);
            console.log('Updated Macros Tracker Data:', macrosTrackerData);
        }).catch(error => {
            console.error('Error adding food item:', error);
        });
    };

    const updateFood = async (id, updatedItem) => {
        const res = await fetch(`/api/macros-tracker/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...updatedItem, date: selectedDate }),
        });
        const savedItem = await res.json();

        setMacrosData(prev =>
            prev.map(item => (item.id === id ? savedItem : item))
        );
        console.log('Macros updated successfully:', savedItem);
    };

    const deleteFood = async (id) => {
        const res = await fetch(`/api/macros-tracker/${id}`, {
            method: 'DELETE',
        });
        const deletedItem = await res.json();
        setMacrosData(prev => prev.filter(item => item.id !== id));
    };

    const flattenMacrosTrackerData = (rawResults) => {
        return rawResults.map(item => ({
            id: item.id,
            food_macros_id: item.food_macros_id,
            quantity: item.quantity,
            calories: item.calories,
            protein: item.protein,
            carbohydrates: item.carbohydrates,
            fats: item.fats,
            user_id: item.user_id,
            date: item.date,
            food_name: item.MacrosChartMaster?.food_name,
            FoodUOM: item.MacrosChartMaster?.FoodUOM
        }));
    };

    useEffect(() => {
        fetch('/api/macros-chart')
            .then(response => response.json())
            .then(macrosMasterData => {
                console.log('Fetched Macros:', macrosMasterData);
                setMacrosMasterData(macrosMasterData);
            });
    }, []);

    useEffect(() => {
        console.log('Selected Date:', selectedDate);
        fetch(`/api/macros-tracker?userId=${currUser}&date=${selectedDate}`)
            .then(response => response.json())
            .then(macrosTrackerData => {
                macrosTrackerData = flattenMacrosTrackerData(macrosTrackerData);
                console.log('Fetched Macros Tracker:', macrosTrackerData);
                setMacrosTrackerData(macrosTrackerData);
            });
    }, [currUser, selectedDate]);

    return (
        <>
            <div className="macros-chart-container" style={{ maxWidth: 900, margin: '2rem auto', padding: '1rem' }}>
                <h2 style={{ textAlign: 'center', color: '#3a86ff', marginBottom: '1.5rem' }}>Macros Tracker</h2>
                {/* Add Food Form */}
                <AddFoodForm macrosData={macrosMasterData} onAddFood={addFood} onDateUpdate={updateSelectedDate} />
                {/* Food Items Table */}
                <FoodItems
                    macrosTrackerData={macrosTrackerData}
                    onUpdateMacrosTracker={updateFood}
                    onDeleteMacrosTracker={deleteFood}
                />
            </div>
        </>
    );

}