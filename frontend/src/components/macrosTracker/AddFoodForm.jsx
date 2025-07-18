import { useEffect, useState } from "react";
import { calculateMacros } from "../../utils.js";
import Calendar from "./Calendar";

// Input style for beautified fields
const inputStyle = {
    padding: '0.6rem 1rem',
    borderRadius: 16,
    border: '1.5px solid #a1c4fd',
    outline: 'none',
    fontSize: '1rem',
    background: '#fff',
    color: '#22223b',
    boxShadow: '0 1px 4px #a1c4fd11',
    marginBottom: 0,
    transition: 'border 0.2s, box-shadow 0.2s',
};

const buttonStyle = {
    background: 'linear-gradient(90deg, #3a86ff 0%, #a1c4fd 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 24,
    padding: '0.7rem 2rem',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '1.05rem',
    marginTop: 24,
    boxShadow: '0 2px 8px #a1c4fd44',
    alignSelf: 'flex-end',
};

export default function AddFoodForm({ macrosData, onAddFood, onDateUpdate }) {

    const [form, setForm] = useState({ name: '', unit: '', quantity: '' });
    const [selectedFood, setSelectedFood] = useState(null);

    const validateInput = (e) => {
        const value = e.target.value;
        // Check if the value is a valid number and greater than or equal to 0
        const isValid = value && !isNaN(value) && parseFloat(value) >= 0;
        if (!isValid) {
            e.target.value = ''; // Clear the input if invalid
            setForm({ ...form, [e.target.name]: '' }); // Reset the field if invalid
        }
    };

    const handleFoodSelection = (e) => {
        const selectedFood = macrosData.find(item => item.id === parseInt(e.target.value));
        setSelectedFood(selectedFood);
        setForm({
            ...form,
            name: e.target.value,
            unit: selectedFood?.FoodUOM.unit || '',
        });
    };

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.unit || !form.quantity) return;
        var newFood = {
            food_name: selectedFood.food_name,
            food_macros_id: selectedFood.id,
            quantity: parseFloat(form.quantity),
            FoodUOM: selectedFood.FoodUOM,
        };
        const macros = calculateMacros(parseFloat(form.quantity), selectedFood);
        newFood = {...newFood, ...macros };
        onAddFood(newFood); // Call the parent function to add food
        // Reset the form
        setForm({ name: '', unit: '', quantity: '' });
    };

    return (
        <>
            <form className="macros-add-form"
                onSubmit={handleFormSubmit}
                style={{
                    display: 'flex',
                    gap: 16,
                    flexWrap: 'wrap',
                    marginBottom: 32,
                    background: 'linear-gradient(90deg, #e0e7ff 0%, #f8fafc 100%)',
                    borderRadius: 20,
                    padding: 24,
                    boxShadow: '0 2px 12px #a1c4fd33',
                    alignItems: 'flex-end',
                }}>
                <div style={{ flex: 2, minWidth: 140, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ color: '#3a86ff', fontWeight: 500, marginBottom: 4 }}>Food Name</label>
                    <select
                        name="food_name"
                        id="food_name"
                        value={form.name}
                        onChange={handleFoodSelection}
                        style={inputStyle}
                        required>
                        <option value="">Select Food</option>
                        { macrosData.length > 0 && macrosData.map((item, index) => (
                            <option key={index} value={item.id}>{item.food_name}</option>
                        ))}
                    </select>
                </div>
                <div style={{ flex: 1, minWidth: 90, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ color: '#3a86ff', fontWeight: 500, marginBottom: 4 }}>Unit</label>
                    <input
                        name="unit"
                        value={form.unit}
                        placeholder="e.g. g, kg, oz"
                        readOnly
                        disabled
                        style={inputStyle} />
                </div>
                <div style={{ flex: 1, minWidth: 70, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ color: '#3a86ff', fontWeight: 500, marginBottom: 4 }}>Qty</label>
                    <input name="quantity" value={form.quantity} onChange={handleFormChange} onBlur={validateInput} placeholder="Qty" type="number" required style={inputStyle} />
                </div>
                <button type="submit" style={buttonStyle}>Add Food</button>
                <Calendar onDateUpdate={onDateUpdate} buttonStyle={buttonStyle} />
            </form>
        </>
    );

}