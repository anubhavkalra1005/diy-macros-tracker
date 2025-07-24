import { useState, useEffect, useRef } from "react";
import "./css/QuantityPopover.css";

export default function QuantityPopover({ row, onSave, onClose }) {
    
    const popoverRef = useRef(null);
    const [qtyValue, setQtyValue] = useState(row.quantity);
    
    const handleChange = (event) => {
        setQtyValue(event.target.value);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div ref={popoverRef} className="popover-container">
            <div className="popover-arrow" />
            <label className="popover-label">Quantity</label>
            <input
                type="number"
                name="quantity"
                defaultValue={qtyValue}
                className="popover-input"
                onChange={handleChange}
            />
            <div className="popover-actions">
                <button
                    type="button"
                    onClick={() => onSave(row, qtyValue)}
                    className="popover-button save-button"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="popover-button cancel-button"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
