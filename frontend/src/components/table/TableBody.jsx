import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import QuantityPopover from '../macrosTracker/QuantityPopover';

export default function TableBody({ data, handleEditClick, handleSave, handleDeleteClick, mode }) {

    const [editRowId, setEditRowId] = useState(null);

    const handleSaveClick = (row, updatedQuantity) => {
        handleSave(row, updatedQuantity);
        setEditRowId(null);
    };

    return (
        <>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <td style={{ padding: 10 }} data-label="Food Name">🥗 {row.food_name}</td>
                        <td style={{ padding: 10 }} data-label="Unit">📏 {row.FoodUOM.unit}</td>
                        <td style={{ padding: 10, position: 'relative' }} data-label="Quantity">
                            🔢 {row.quantity}
                            {(mode === 'popover' && editRowId === row.id) && (
                                <QuantityPopover row={row} onSave={handleSaveClick} onClose={() => setEditRowId(null)} />
                            )}
                        </td>
                        <td style={{ padding: 10 }} data-label="Calories">🔥 {row.calories}</td>
                        <td style={{ padding: 10 }} data-label="Protein">🍗 {row.protein}</td>
                        <td style={{ padding: 10 }} data-label="Carbs">🍚 {row.carbohydrates}</td>
                        <td style={{ padding: 10 }} data-label="Fats">🥑 {row.fats}</td>
                        <td style={{ padding: 10, textAlign: 'center' }} className="actions">
                            <button
                                onClick={() => { mode === 'popover' ? setEditRowId(row.id) : handleEditClick(row) }}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3a86ff' }}
                                data-text="Edit">
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                                onClick={() => handleDeleteClick(row.id)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3a86ff' }}
                                data-text="Delete">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </>
    );
}