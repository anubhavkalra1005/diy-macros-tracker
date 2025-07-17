import { useState } from "react";
import TableBody from "../table/TableBody";
import TableHeader from "../table/TableHeader";
import EditMacrosModal from "./EditMacrosModal";

export default function FoodItems({ macrosData, onUpdateMacros, onDeleteMacros }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleEditClick = (row) => {
        setShowModal(true);
        setSelectedItem(row);
    };

    const handleSave = (updatedItem) => {
        onUpdateMacros(updatedItem.id, updatedItem);
        setShowModal(false);
    };

    const handleDeleteClick = (id) => {
        onDeleteMacros(id);
    };

    return (
        <>
            <div style={{ overflowX: 'auto' }}>
                <table className="macros-table" style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #a1c4fd22', overflow: 'hidden' }}>
                    <TableHeader />
                    {macrosData.length === 0 && (
                        <tbody>
                            <tr>
                                <td colSpan="8" style={{ textAlign: 'center', padding: 20, color: '#888' }}>No food items available</td>
                            </tr>
                        </tbody>
                    )}
                    <TableBody
                        data={macrosData}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                    />
                </table>
            </div>

            {showModal && (
                <EditMacrosModal
                    item={selectedItem}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}
        </>
    );

}