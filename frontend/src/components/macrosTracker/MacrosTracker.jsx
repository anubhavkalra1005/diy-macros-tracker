import AddFoodForm from "./AddFoodForm";
import { useEffect, useState } from "react";
import FoodItems from "./FoodItems";
import { calculateMacros } from "../../utils";
import PieChart from "./PieChart";
import "./css/MacrosTracker.css";

export default function MacrosTracker({ currUser = 0 }) {
    const [macrosMasterData, setMacrosMasterData] = useState([]);
    const [macrosTrackerData, setMacrosTrackerData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today

    const updateSelectedDate = (date) => {
        setSelectedDate(date);
    };

    const addFood = (newItem) => {
        var { food_name, FoodUOM, ...requestBody } = newItem;
        requestBody = { ...requestBody, date: selectedDate, user_id: currUser };
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
            setMacrosTrackerData([...macrosTrackerData, { ...newItem, id: apiData.id }]);
        }).catch(error => {
            console.error('Error adding food item:', error);
        });
    };

    const updateFood = async (actualRow, updatedQuantity) => {
        const res = await fetch(`/api/macros-tracker/${actualRow.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...calculateMacros(updatedQuantity, actualRow), quantity: updatedQuantity }),
        });
        const updatedItem = await res.json();

        setMacrosTrackerData(prev =>
            prev.map(item => (item.id === actualRow.id ? flattenMacrosTrackerData(updatedItem) : item))
        );
    };

    const deleteFood = async (id) => {
        const res = await fetch(`/api/macros-tracker/${id}`, {
            method: 'DELETE',
        });
        await res.json();
        setMacrosTrackerData(prev => prev.filter(item => item.id !== id));
    };

    const flattenMacrosTrackerData = (item) => {
        return {
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
        };
    };

    useEffect(() => {
        fetch('/api/macros-chart')
            .then(response => response.json())
            .then(macrosMasterData => {
                setMacrosMasterData(macrosMasterData);
            });
    }, []);

    useEffect(() => {
        fetch(`/api/macros-tracker?userId=${currUser}&date=${selectedDate}`)
            .then(response => response.json())
            .then(macrosTrackerData => {
                macrosTrackerData = macrosTrackerData.map(item => flattenMacrosTrackerData(item));
                setMacrosTrackerData(macrosTrackerData);
            });
    }, [currUser, selectedDate]);

    return (
        <>
            <div className="macros-tracker-chart-container">
                <h2 className="macros-tracker-chart-title">Macros Tracker</h2>
                <AddFoodForm macrosData={macrosMasterData} onAddFood={addFood} onDateUpdate={updateSelectedDate} />
                <FoodItems
                    macrosTrackerData={macrosTrackerData}
                    onUpdateMacrosTracker={updateFood}
                    onDeleteMacrosTracker={deleteFood}
                />
                {macrosTrackerData.length > 0 && (
                    <div className="macros-tracker-pie-section">
                        <PieChart macrosTrackerData={macrosTrackerData} />
                    </div>
                )}
                {/* <div className="macros-tracker-flex-row">
                    <div className="macros-tracker-table-section">
                    </div>
                </div> */}
            </div>
        </>
    );
}