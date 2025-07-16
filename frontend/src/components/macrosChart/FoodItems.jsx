import { useState } from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import EditMacrosModal from "./EditMacrosModal";

export default function FoodItems({ data, setData, prevCounter, setCounter }) {
    const [showModal, setShowModal] = useState(false);
    const [editRow, setEditRow] = useState(null);
    const [editValues, setEditValues] = useState({ calories: '', protein: '', carbohydrates: '', fats: '' });

    const handleEditClick = (row) => {

        console.log('Edit clicked for row:', row);
        setShowModal(true);
        // Here you can set the state to pre-fill the modal with the row data
        setEditRow(row.id);
        setEditValues({
            calories: parseFloat(row.calories),
            protein: parseFloat(row.protein),
            carbohydrates: parseFloat(row.carbohydrates),
            fats: parseFloat(row.fats)
        });

        setCounter(prevCounter + 1); // Increment the counter to trigger re-fetching if needed
    };

    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(`/api/delete-macros-chart-master/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete food item');
            // Remove the deleted item from the state
            setData(data.filter(item => item.id !== id));
            console.log(`Food item with ID ${id} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting food item:', error);
        }
    };

    return (
        <>
            <div style={{ overflowX: 'auto' }}>
                <table className="macros-table" style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #a1c4fd22', overflow: 'hidden' }}>
                    <TableHeader />
                    {data.length === 0 && (
                        <tbody>
                            <tr>
                                <td colSpan="8" style={{ textAlign: 'center', padding: 20, color: '#888' }}>No food items available</td>
                            </tr>
                        </tbody>
                    )}
                    <TableBody data={data} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />
                </table>
            </div>

            {showModal && (
                <EditMacrosModal data={data} setData={setData} setShowModal={setShowModal} editRow={editRow} setEditRow={setEditRow} editValues={editValues} setEditValues={setEditValues} />
            )}
        </>
    );

}