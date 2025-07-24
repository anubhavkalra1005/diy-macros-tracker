import { useEffect, useState } from "react";
import { calculateMacros } from "../../utils.js";
import Calendar from "./Calendar";
import "./css/AddFoodForm.css";

export default function AddFoodForm({ macrosData, onAddFood, onDateUpdate }) {
    const [form, setForm] = useState({ name: '', unit: '', quantity: '' });
    const [selectedFood, setSelectedFood] = useState(null);

    const validateInput = (e) => {
        const value = e.target.value;
        const isValid = value && !isNaN(value) && parseFloat(value) >= 0;
        if (!isValid) {
            e.target.value = '';
            setForm({ ...form, [e.target.name]: '' });
        }
    };

    const handleFoodSelection = (e) => {
        const selected = macrosData.find(item => item.id === parseInt(e.target.value));
        setSelectedFood(selected);
        setForm({
            ...form,
            name: e.target.value,
            unit: selected?.FoodUOM.unit || '',
        });
    };

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.unit || !form.quantity) return;
        let newFood = {
            food_name: selectedFood.food_name,
            food_macros_id: selectedFood.id,
            quantity: parseFloat(form.quantity),
            FoodUOM: selectedFood.FoodUOM,
        };
        const macros = calculateMacros(parseFloat(form.quantity), selectedFood);
        newFood = { ...newFood, ...macros };
        onAddFood(newFood);
        setForm({ name: '', unit: '', quantity: '' });
    };

    return (
        <form className="macros-tracker-add-form" onSubmit={handleFormSubmit}>
            <div className="form-group" style={{ flex: 2, minWidth: 140 }}>
                <label className="form-label">Food Name</label>
                <select
                    name="food_name"
                    id="food_name"
                    value={form.name}
                    onChange={handleFoodSelection}
                    className="form-input"
                    required
                >
                    <option value="">Select Food</option>
                    {macrosData.map((item, index) => (
                        <option key={index} value={item.id}>{item.food_name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group" style={{ flex: 1, minWidth: 70 }}>
                <label className="form-label">Unit</label>
                <input
                    name="unit"
                    value={form.unit}
                    placeholder="e.g. g, kg, oz"
                    readOnly
                    disabled
                    className="form-input"
                />
            </div>

            <div className="form-group" style={{ flex: 1, minWidth: 70 }}>
                <label className="form-label">Qty</label>
                <input
                    name="quantity"
                    value={form.quantity}
                    onChange={handleFormChange}
                    onBlur={validateInput}
                    placeholder="Qty"
                    type="number"
                    required
                    className="form-input"
                />
            </div>

            <button type="submit" className="form-button">Add Food</button>
            <Calendar onDateUpdate={onDateUpdate} buttonStyle="form-button calendar-btn" />
        </form>
    );
}
