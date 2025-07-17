import { useEffect, useState } from 'react';
import FoodItems from './FoodItems';
import AddMacrosForm from './AddMacrosForm';

export default function MacrosChart() {
    const [data, setData] = useState([]);
    // const [counter, setCounter] = useState(0);

    const addMacros = (newItem) => {
        var requestBody = { ...newItem };
        delete requestBody.FoodUOM;
        fetch('/api/macros-chart', {
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
            setData([...data, { ...newItem, id: apiData.id }]);
        }).catch(error => {
            console.error('Error adding food item:', error);
        });
    };

    const updateMacros = async (id, updatedItem) => {
        const res = await fetch(`/api/macros-chart/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedItem),
        });
        const savedItem = await res.json();

        setData(prev =>
            prev.map(item => (item.id === id ? savedItem : item))
        );
        // setCounter(counter + 1);
        console.log('Macros updated successfully:', savedItem);
    };

    const deleteMacros = async (id) => {
        const res = await fetch(`/api/macros-chart/${id}`, {
            method: 'DELETE',
        });
        const deletedItem = await res.json();
        setData(prev => prev.filter(item => item.id !== id));
    };

    useEffect(() => {
        fetch('/api/macros-chart')
            .then(response => response.json())
            .then(macrosMasterData => {
                console.log('Fetched Macros:', macrosMasterData);
                setData(macrosMasterData);
            });
    }, []);

    return (
        <div className="macros-chart-container" style={{ maxWidth: 900, margin: '2rem auto', padding: '1rem' }}>
            <h2 style={{ textAlign: 'center', color: '#3a86ff', marginBottom: '1.5rem' }}>Macros Chart</h2>
            {/* Add Food Form */}
            <AddMacrosForm onAddMacros={addMacros} />
            {/* Food Items Table */}
            <FoodItems macrosData={data} onUpdateMacros={updateMacros} onDeleteMacros={deleteMacros} />
        </div>
    );
}