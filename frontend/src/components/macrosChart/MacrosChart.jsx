import { useEffect, useState } from 'react';
import FoodItems from './FoodItems';
import AddMacrosForm from './AddMacrosForm';
import './css/MacrosChart.css';

export default function MacrosChart() {
    const [data, setData] = useState([]);

    const addMacros = (newItem) => {
        const requestBody = { ...newItem };
        delete requestBody.FoodUOM;

        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/macros-chart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add food item');
                }
                return response.json();
            })
            .then(apiData => {
                console.log('Food item added successfully:', apiData);
                setData([...data, { ...newItem, id: apiData.id }]);
            })
            .catch(error => {
                console.error('Error adding food item:', error);
            });
    };

    const updateMacros = async (id, updatedItem) => {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/macros-chart/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedItem),
        });
        const savedItem = await res.json();
        setData(prev => prev.map(item => (item.id === id ? savedItem : item)));
        console.log('Macros updated successfully:', savedItem);
    };

    const deleteMacros = async (id) => {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/macros-chart/${id}`, {
            method: 'DELETE',
        });
        const deletedItem = await res.json();
        setData(prev => prev.filter(item => item.id !== id));
    };

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/macros-chart`)
            .then(response => response.json())
            .then(macrosMasterData => {
                console.log('Fetched Macros:', macrosMasterData);
                setData(macrosMasterData);
            });
    }, []);

    return (
        <div className="macros-chart-container">
            <h2 className="macros-chart-title">Macros Chart</h2>
            <AddMacrosForm onAddMacros={addMacros} />
            <FoodItems
                macrosData={data}
                onUpdateMacros={updateMacros}
                onDeleteMacros={deleteMacros}
            />
        </div>
    );
}
