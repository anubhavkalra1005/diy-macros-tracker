import { useState } from "react";
import TableBody from "../table/TableBody";
import TableHeader from "../table/TableHeader";
import EditMacrosModal from "./EditMacrosModal";
import "./css/FoodItems.css";

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
            <div className="macros-table-container">
                <div className="macros-table-wrapper">

                    <table className="macros-table">
                        <TableHeader />
                        {macrosData.length === 0 && (
                            <tbody className="no-data">
                                <tr>
                                    <td colSpan="8">No food items available</td>
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