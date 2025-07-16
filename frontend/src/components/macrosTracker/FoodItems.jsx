import { useState } from 'react';
import TableHeader from './TableHeader';
import EditMacrosTrackerModal from './EditMacrosTrackerModal';
import TableBody from './TableBody';

export default function FoodItems({ data, setData, prevCounter, setCounter }) {

    const [showModal, setShowModal] = useState(false);

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
                <EditMacrosTrackerModal data={data} setData={setData} setShowModal={setShowModal} editRow={editRow} setEditRow={setEditRow} editValues={editValues} setEditValues={setEditValues} />
            )}

        </>
    );

}