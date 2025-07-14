import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function TableBody({data, handleEditClick}) {
    return (
        <tbody>
            {data.map(row => (
                <tr key={row.id}>
                    <td style={{ padding: 10 }}>{row.name}</td>
                    <td style={{ padding: 10 }}>{row.unit}</td>
                    <td style={{ padding: 10 }}>{row.qty}</td>
                    <td style={{ padding: 10 }}>{row.calories}</td>
                    <td style={{ padding: 10 }}>{row.protein}</td>
                    <td style={{ padding: 10 }}>{row.carbs}</td>
                    <td style={{ padding: 10 }}>{row.fats}</td>
                    <td style={{ padding: 10, textAlign: 'center' }}>
                        <button onClick={() => handleEditClick(row)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3a86ff' }}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    );
}