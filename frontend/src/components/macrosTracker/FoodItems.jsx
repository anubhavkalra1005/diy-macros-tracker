import { useState } from 'react';
import TableHeader from '../table/TableHeader';
import TableBody from '../table/TableBody';
import TableFooter from '../table/TableFooter';

export default function FoodItems({ macrosTrackerData, onUpdateMacrosTracker, onDeleteMacrosTracker }) {

    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleEditClick = (row) => {
        setShowModal(true);
        setSelectedItem(row);
    };

    const handleSave = (updatedItem) => {
        onUpdateMacrosTracker(updatedItem.id, updatedItem);
        setShowModal(false);
    };

    const handleDeleteClick = (id) => {
        onDeleteMacrosTracker(id);
    };

    return (
        <>
            <div style={{ overflowX: 'auto' }}>
                <table className="macros-table" style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #a1c4fd22', overflow: 'hidden' }}>
                    <TableHeader />
                    {macrosTrackerData.length === 0 && (
                        <tbody>
                            <tr>
                                <td colSpan="8" style={{ textAlign: 'center', padding: 20, color: '#888' }}>No food items available</td>
                            </tr>
                        </tbody>
                    )}
                    <TableBody
                        data={macrosTrackerData}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                    />
                    {macrosTrackerData.length > 0 && (
                        <TableFooter macrosTrackerData={macrosTrackerData} />
                    )}
                </table>
            </div>

            {/* {showModal && (
                <EditMacrosTrackerModal data={data} setData={setData} setShowModal={setShowModal} editRow={editRow} setEditRow={setEditRow} editValues={editValues} setEditValues={setEditValues} />
            )} */}

        </>
    );

}