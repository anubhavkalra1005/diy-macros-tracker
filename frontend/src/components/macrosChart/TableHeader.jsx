export default function TableHeader() {
    return (
        <>
            <thead style={{ background: '#e0e7ff' }}>
                <tr>
                    <th style={{ padding: 12 }}>Food Name</th>
                    <th style={{ padding: 12 }}>Unit</th>
                    <th style={{ padding: 12 }}>Qty</th>
                    <th style={{ padding: 12 }}>Calories</th>
                    <th style={{ padding: 12 }}>Protein (g)</th>
                    <th style={{ padding: 12 }}>Carbohydrates (g)</th>
                    <th style={{ padding: 12 }}>Fats (g)</th>
                    <th style={{ padding: 12 }}>Actions</th>
                </tr>
            </thead>
        </>
    );
}