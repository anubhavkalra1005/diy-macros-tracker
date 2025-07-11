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
        setEditValues({ ...editValues, [e.target.name]: e.target.value });
    };

    const handleModalSave = () => {
        setData(data.map(row =>
            row.id === editRow ? {
                ...row,
                ...editValues,
                calories: Number(editValues.calories),
                protein: Number(editValues.protein),
                carbs: Number(editValues.carbs),
                fats: Number(editValues.fats)
            } : row));

        setShowModal(false);
        setEditRow(null);
        setEditValues({ calories: '', protein: '', carbs: '', fats: '' });
    };

    const handleModalClose = () => {
        setShowModal(false);
        setEditRow(null);
        setEditValues({ calories: '', protein: '', carbs: '', fats: '' });
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
                            <input
                                name="calories"
                                type="number"
                                id="modal-calories"
                                value={editValues.calories}
                                onChange={handleModalChange}
                                style={{ ...inputStyle, paddingTop: '1.3rem' }}
                                autoComplete="off"
                            />
                            <label htmlFor="modal-calories" style={floatingLabelStyle(editValues.calories)}>Calories</label>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <input
                                name="protein"
                                type="number"
                                id="modal-protein"
                                value={editValues.protein}
                                onChange={handleModalChange}
                                style={{ ...inputStyle, paddingTop: '1.3rem' }}
                                autoComplete="off"
                            />
                            <label htmlFor="modal-protein" style={floatingLabelStyle(editValues.protein)}>Protein</label>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <input
                                name="carbs"
                                type="number"
                                id="modal-carbs"
                                value={editValues.carbs}
                                onChange={handleModalChange}
                                style={{ ...inputStyle, paddingTop: '1.3rem' }}
                                autoComplete="off"
                            />
                            <label htmlFor="modal-carbs" style={floatingLabelStyle(editValues.carbs)}>Carbohydrates</label>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <input
                                name="fats"
                                type="number"
                                id="modal-fats"
                                value={editValues.fats}
                                onChange={handleModalChange}
                                style={{ ...inputStyle, paddingTop: '1.3rem' }}
                                autoComplete="off"
                            />
                            <label htmlFor="modal-fats" style={floatingLabelStyle(editValues.fats)}>Fats</label>
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