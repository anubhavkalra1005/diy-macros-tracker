import { useEffect, useState } from "react";
import "./css/AddMacrosForm.css";

export default function AddMacrosForm({ onAddMacros }) {
    const [form, setForm] = useState({ name: '', unit: '', quantity: '', calories: '', protein: '', carbohydrates: '', fats: '' });
    const [foodUOMs, setFoodUOMs] = useState([]);

    const validateInput = (e) => {
        const value = e.target.value;
        const isValid = value && !isNaN(value) && parseFloat(value) >= 0;
        if (!isValid) {
            e.target.value = '';
            setForm({ ...form, [e.target.name]: '' });
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.unit || !form.quantity) return;
        const newFood = {
            food_name: form.name,
            uom_id: parseInt(form.unit),
            quantity: parseFloat(form.quantity),
            calories: parseFloat(form.calories) || 0,
            protein: parseFloat(form.protein) || 0,
            carbohydrates: parseFloat(form.carbohydrates) || 0,
            fats: parseFloat(form.fats) || 0,
            FoodUOM: foodUOMs.find(uom => uom.id === parseInt(form.unit)) || { unit: 'N/A' }
        };
        onAddMacros(newFood);
        setForm({ name: '', unit: '', quantity: '', calories: '', protein: '', carbohydrates: '', fats: '' });
    };

    useEffect(() => {
        fetch('/api/uoms')
            .then(response => response.json())
            .then(data => {
                setFoodUOMs(data.map(uom => ({ id: uom.id, unit: uom.unit })));
            });
    }, []);

    return (
        <form className="macros-add-form" onSubmit={handleFormSubmit}>
            <div className="form-group" style={{ flex: 2, minWidth: 140 }}>
                <label>Food Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Oats" required />
            </div>
            <div className="form-group" style={{ flex: 1, minWidth: 90 }}>
                <label>Unit</label>
                <select
                    name="unit"
                    id="unit"
                    value={form.unit}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Unit</option>
                    {foodUOMs.map((uom, index) => (
                        <option
                            key={index}
                            value={uom.id}
                            data-unit={uom.unit}
                        >
                            {uom.unit === 'gm' || uom.unit === 'kg' ? '⚖️ ' : uom.unit === 'ml' ? '💧 ' : '🍽️ '} {uom.unit}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group" style={{ flex: 1, minWidth: 70 }}>
                <label>Qty</label>
                <input name="quantity" value={form.quantity} onChange={handleChange} onBlur={validateInput} placeholder="Qty" type="number" required />
            </div>
            <div className="form-group" style={{ flex: 1, minWidth: 90 }}>
                <label>Calories</label>
                <input name="calories" value={form.calories} onChange={handleChange} onBlur={validateInput} placeholder="Calories" type="number" />
            </div>
            <div className="form-group" style={{ flex: 1, minWidth: 90 }}>
                <label>Protein</label>
                <input name="protein" value={form.protein} onChange={handleChange} onBlur={validateInput} placeholder="Protein" type="number" />
            </div>
            <div className="form-group" style={{ flex: 1, minWidth: 110 }}>
                <label>Carbohydrates</label>
                <input name="carbohydrates" value={form.carbohydrates} onChange={handleChange} onBlur={validateInput} placeholder="Carbohydrates" type="number" />
            </div>
            <div className="form-group" style={{ flex: 1, minWidth: 90 }}>
                <label>Fats</label>
                <input name="fats" value={form.fats} onChange={handleChange} onBlur={validateInput} placeholder="Fats" type="number" />
            </div>
            <button type="submit">Add Food</button>
        </form>
    );
}