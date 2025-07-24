const createCellStyle = (cellName) => {

    const cellStyle = {
        textAlign: 'center',
        padding: '14px 8px',
        color: '#3a86ff',
        fontWeight: 600,
        fontSize: '1em',
        borderTop: '1.5px solid #a1c4fd',
        borderRight: '1px solid #e0e7ff',
        background: 'rgba(225,240,255,0.7)'
    };

    return {
        ...cellStyle,
        borderBottomLeftRadius: cellName === 'total' ? 16 : 0,
        borderBottomRightRadius: cellName === 'action' ? 16 : 0,
        color: cellName === 'total' ? '#2d3a5f' : '#3a86ff',
    };
};

export default function TableFooter({ macrosTrackerData }) {
    return (
        <>
            <tfoot>
                <tr style={{
                    background: 'linear-gradient(90deg, #f8fafc 0%, #e0e7ff 100%)',
                    borderBottomLeftRadius: 16,
                    borderBottomRightRadius: 16,
                }}>
                    <td colSpan="3" style={createCellStyle('total')}>
                        Total Macros
                    </td>
                    <td style={createCellStyle('calories')}>
                        {macrosTrackerData.reduce((sum, item) => sum + parseFloat(item?.calories || 0), 0).toFixed(2)} kcal
                    </td>
                    <td style={createCellStyle('protein')}>
                        {macrosTrackerData.reduce((sum, item) => sum + parseFloat(item?.protein || 0), 0).toFixed(2)} g
                    </td>
                    <td style={createCellStyle('carbohydrates')}>
                        {macrosTrackerData.reduce((sum, item) => sum + parseFloat(item?.carbohydrates || 0), 0).toFixed(2)} g
                    </td>
                    <td style={createCellStyle('fats')}>
                        {macrosTrackerData.reduce((sum, item) => sum + parseFloat(item?.fats || 0), 0).toFixed(2)} g
                    </td>
                    <td style={createCellStyle('last')}></td>
                </tr>
            </tfoot>
        </>
    );
}