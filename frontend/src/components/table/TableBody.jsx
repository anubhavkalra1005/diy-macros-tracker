import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function TableBody({ data, handleEditClick, handleDeleteClick }) {
    return (
        <tbody>
            {data.map((row, index) => (
                <tr key={index}>
                    <td style={{ padding: 10 }}>{row.food_name}</td>
                    <td style={{ padding: 10 }}>{row.FoodUOM.unit}</td>
                    <td style={{ padding: 10 }}>{row.quantity}</td>
                    <td style={{ padding: 10 }}>{row.calories}</td>
                    <td style={{ padding: 10 }}>{row.protein}</td>
                    <td style={{ padding: 10 }}>{row.carbohydrates}</td>
                    <td style={{ padding: 10 }}>{row.fats}</td>
                    <td style={{ padding: 10, textAlign: 'center' }}>
                        <button onClick={() => handleEditClick(row)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3a86ff' }}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button onClick={() => handleDeleteClick(row.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3a86ff' }}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    );
}