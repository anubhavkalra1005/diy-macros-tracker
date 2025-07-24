import { useState, useEffect } from 'react';
import "./css/EditMacrosModal.css";

export default function EditMacrosModal({ item, onClose, onSave }) {
    const [formData, setFormData] = useState(item);

    useEffect(() => {
        setFormData(item); // update when item changes
    }, [item]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    const validateInput = (e) => {
        const value = e.target.value;
        const isValid = value && !isNaN(value) && parseFloat(value) >= 0;
        if (!isValid) {
            e.target.value = '';
            setFormData({ ...formData, [e.target.name]: 0 });
        }
    };

    // Helper for floating label
    const getLabelClass = (value) =>
        value ? "macros-modal-label" : "macros-modal-label inactive";

    return (
        <div className="macros-modal-overlay">
            <div className="macros-modal">
                <h3>Edit Macros</h3>
                <div className="macros-modal-form">
                    <div className="macros-modal-input-group">
                        <input
                            name="calories"
                            type="number"
                            id="modal-calories"
                            value={formData.calories}
                            onChange={handleChange}
                            onBlur={validateInput}
                            className="macros-modal-input"
                            autoComplete="off"
                        />
                        <label htmlFor="modal-calories" className={getLabelClass(formData.calories)}>
                            Calories
                        </label>
                    </div>
                    <div className="macros-modal-input-group">
                        <input
                            name="protein"
                            type="number"
                            id="modal-protein"
                            value={formData.protein}
                            onChange={handleChange}
                            onBlur={validateInput}
                            className="macros-modal-input"
                            autoComplete="off"
                        />
                        <label htmlFor="modal-protein" className={getLabelClass(formData.protein)}>
                            Protein
                        </label>
                    </div>
                    <div className="macros-modal-input-group">
                        <input
                            name="carbohydrates"
                            type="number"
                            id="modal-carbohydrates"
                            value={formData.carbohydrates}
                            onChange={handleChange}
                            onBlur={validateInput}
                            className="macros-modal-input"
                            autoComplete="off"
                        />
                        <label htmlFor="modal-carbohydrates" className={getLabelClass(formData.carbohydrates)}>
                            Carbohydrates
                        </label>
                    </div>
                    <div className="macros-modal-input-group">
                        <input
                            name="fats"
                            type="number"
                            id="modal-fats"
                            value={formData.fats}
                            onChange={handleChange}
                            onBlur={validateInput}
                            className="macros-modal-input"
                            autoComplete="off"
                        />
                        <label htmlFor="modal-fats" className={getLabelClass(formData.fats)}>
                            Fats
                        </label>
                    </div>
                </div>
                <div className="macros-modal-actions">
                    <button className="save-btn" onClick={handleSubmit}>Save</button>
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}