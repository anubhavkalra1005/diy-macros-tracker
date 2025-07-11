import { useState } from "react";

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

export default function AddFoodForm(props) {

    const [form, setForm] = useState({ name: '', unit: '', qty: '', calories: '', protein: '', carbs: '', fats: '' });

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.unit || !form.qty) return;
        const data = props.data || [];
        const maxId = data.length > 0 ? Math.max(...data.map(item => item.id)) : 0; // Get the maximum ID from existing data
        const newFood = {
            id: maxId + 1, // Increment the maximum ID for the new food item
            name: form.name,
            unit: form.unit,
            qty: parseFloat(form.qty),
            calories: parseFloat(form.calories) || 0,
            protein: parseFloat(form.protein) || 0,
            carbs: parseFloat(form.carbs) || 0,
            fats: parseFloat(form.fats) || 0
        };
        props.func(newFood); // Call the parent function to add food
        // Reset the form
        setForm({ name: '', unit: '', qty: '', calories: '', protein: '', carbs: '', fats: '' });
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
                    <input name="name" value={form.name} onChange={handleFormChange} placeholder="e.g. Chicken Breast" required style={inputStyle} />
                </div>
                <div style={{ flex: 1, minWidth: 90, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ color: '#3a86ff', fontWeight: 500, marginBottom: 4 }}>Unit</label>
                    <input name="unit" value={form.unit} onChange={handleFormChange} placeholder="g, ml, etc." required style={inputStyle} />
                </div>
                <div style={{ flex: 1, minWidth: 70, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ color: '#3a86ff', fontWeight: 500, marginBottom: 4 }}>Qty</label>
                    <input name="qty" value={form.qty} onChange={handleFormChange} placeholder="Qty" type="number" required style={inputStyle} />
                </div>
                <div style={{ flex: 1, minWidth: 90, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ color: '#3a86ff', fontWeight: 500, marginBottom: 4 }}>Calories</label>
                    <input name="calories" value={form.calories} onChange={handleFormChange} placeholder="Calories" type="number" style={inputStyle} />
                </div>
                <div style={{ flex: 1, minWidth: 90, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ color: '#3a86ff', fontWeight: 500, marginBottom: 4 }}>Protein</label>
                    <input name="protein" value={form.protein} onChange={handleFormChange} placeholder="Protein" type="number" style={inputStyle} />
                </div>
                <div style={{ flex: 1, minWidth: 110, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ color: '#3a86ff', fontWeight: 500, marginBottom: 4 }}>Carbohydrates</label>
                    <input name="carbs" value={form.carbs} onChange={handleFormChange} placeholder="Carbohydrates" type="number" style={inputStyle} />
                </div>
                <div style={{ flex: 1, minWidth: 90, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ color: '#3a86ff', fontWeight: 500, marginBottom: 4 }}>Fats</label>
                    <input name="fats" value={form.fats} onChange={handleFormChange} placeholder="Fats" type="number" style={inputStyle} />
                </div>
                <button type="submit" style={buttonStyle}>Add Food</button>
            </form>
        </>
    );

}