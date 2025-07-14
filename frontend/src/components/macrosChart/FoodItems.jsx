import { useState } from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import EditMacrosModal from "./EditMacrosModal";

export default function FoodItems({ data, setData }) {
    const [showModal, setShowModal] = useState(false);
    const [editRow, setEditRow] = useState(null);
    const [editValues, setEditValues] = useState({ calories: '', protein: '', carbs: '', fats: '' });

    const handleEditClick = (row) => {

        console.log('Edit clicked for row:', row);
        setShowModal(true);
        // Here you can set the state to pre-fill the modal with the row data
        setEditRow(row.id);
        setEditValues({
            calories: row.calories,
            protein: row.protein,
            carbs: row.carbs,
            fats: row.fats
        });

    };

    return (
        <>
            <div style={{ overflowX: 'auto' }}>
                <table className="macros-table" style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #a1c4fd22', overflow: 'hidden' }}>
                    <TableHeader />
                    <TableBody data={data} handleEditClick={handleEditClick} />
                </table>
            </div>

            {showModal && (
                <EditMacrosModal data={data} setData={setData} setShowModal={setShowModal} editRow={editRow} setEditRow={setEditRow} editValues={editValues} setEditValues={setEditValues} />
            )}
        </>
    );

}