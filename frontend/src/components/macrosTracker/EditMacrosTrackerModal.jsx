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

function floatingLabelStyle(value) {
    return {
        position: 'absolute',
        left: 18,
        top: value ? -10 : -12,
        fontSize: value ? '0.85rem' : '1rem',
        color: value ? '#3a86ff' : '#888',
        background: '#fff',
        padding: value ? '0 4px' : '0 8px',
        pointerEvents: 'none',
        transition: 'all 0.18s',
        zIndex: 2,
    };
}

export default function EditMacrosModal({ data, setData, setShowModal, editRow, setEditRow, editValues, setEditValues }) {

    const handleModalChange = (e) => {
        setEditValues({ ...editValues, [e.target.name]: parseFloat(e.target.value) });
    };

    const handleModalSave = () => {
        setData(data.map(row =>
            row.id === editRow ? {
                ...row,
                ...editValues,
                food_name: editValues.calories,
                unit: editValues.protein,
                quantity: parseFloat(editValues.carbohydrates),
            } : row));

        // fetch(`/api/macros-chart/${editRow}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(editValues),
        // }).then(response => {
        //     if (!response.ok) {
        //         throw new Error('Failed to update food item');
        //     }
        //     return response.json();
        // }).then(data => {
        //     console.log('Food item updated successfully:', data);
        //     // Update the local state with the new values
        //     // setData(data.map(item => item.id === row.id ? { ...item, ...editValues } : item));
        // }).catch(error => {
        //     console.error('Error updating food item:', error);
        // });

        setShowModal(false);
        setEditRow(null);
        setEditValues({ food_name: '', unit: '', quantity: '' });
    };

    const handleModalClose = () => {
        setShowModal(false);
        setEditRow(null);
        setEditValues({ food_name: '', unit: '', quantity: '' });
    };

    return (
        <>
            <div className="macros-modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
                <div className="macros-modal" style={{ background: '#fff', borderRadius: 20, padding: 36, minWidth: 340, boxShadow: '0 4px 24px #a1c4fd44', position: 'relative' }}>
                    <h3 style={{ color: '#3a86ff', marginBottom: 20, fontWeight: 700, textAlign: 'center' }}>Edit Macros</h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 18,
                        marginBottom: 8
                    }}>
                        <div style={{ position: 'relative' }}>
                            <select
                                name="food_name"
                                id="model_food_name"
                                value={editValues.foodName}
                                onChange={handleModalChange}
                                style={{ ...inputStyle, paddingTop: '1.3rem' }}
                            >
                                <option value="">Select Food</option>
                            </select>
                            <label htmlFor="model_food_name" style={floatingLabelStyle(editValues.food_name)}>Food Name</label>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <input
                                name="unit"
                                type="text"
                                id="model_unit"
                                value={editValues.unit}
                                readOnly
                                disabled
                                style={{ ...inputStyle, paddingTop: '1.3rem' }}
                            />
                            <label htmlFor="model_unit" style={floatingLabelStyle(editValues.unit)}>Unit</label>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <input
                                name="quantity"
                                type="number"
                                id="model_quantity"
                                value={editValues.quantity}
                                onChange={handleModalChange}
                                style={{ ...inputStyle, paddingTop: '1.3rem' }}
                                autoComplete="off"
                            />
                            <label htmlFor="model_quantity" style={floatingLabelStyle(editValues.quantity)}>Quantity</label>
                        </div>
                    </div>
                    <div style={{ marginTop: 32, display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
                        <button onClick={handleModalSave} style={{ background: 'linear-gradient(90deg, #3a86ff 0%, #a1c4fd 100%)', color: '#fff', border: 'none', borderRadius: 24, padding: '0.7rem 2rem', cursor: 'pointer', fontWeight: 600, fontSize: '1.05rem', boxShadow: '0 2px 8px #a1c4fd44' }}>Save</button>
                        <button onClick={handleModalClose} style={{ background: '#eee', color: '#222', border: 'none', borderRadius: 24, padding: '0.7rem 2rem', cursor: 'pointer', fontWeight: 500, fontSize: '1.05rem' }}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    );

}