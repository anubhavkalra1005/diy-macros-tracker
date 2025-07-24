import { useState } from 'react';
import TableHeader from '../table/TableHeader';
import TableBody from '../table/TableBody';
import TableFooter from '../table/TableFooter';
import './css/FoodItems.css';

export default function FoodItems({ macrosTrackerData, onUpdateMacrosTracker, onDeleteMacrosTracker }) {

    const handleSave = (actualRow, updatedQuantity) => {
        onUpdateMacrosTracker(actualRow, updatedQuantity);
    };

    const handleDeleteClick = (id) => {
        onDeleteMacrosTracker(id);
    };

    return (
        <>
            <div className="macros-tracker-table-container">
                <table className="macros-tracker-table">
                    <TableHeader />
                    {macrosTrackerData.length === 0 && (
                        <tbody>
                            <tr>
                                <td colSpan="8">No food items available</td>
                            </tr>
                        </tbody>
                    )}
                    <TableBody
                        data={macrosTrackerData}
                        handleSave={handleSave}
                        handleDeleteClick={handleDeleteClick}
                        mode="popover"
                    />
                    {macrosTrackerData.length > 0 && (
                        <TableFooter macrosTrackerData={macrosTrackerData} />
                    )}
                </table>
            </div>
        </>
    );

}