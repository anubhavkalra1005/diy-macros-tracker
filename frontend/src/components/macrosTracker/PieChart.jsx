import { Chart } from "react-google-charts";

export default function PieChart({ macrosTrackerData }) {

    const data = [
        ['Macro', 'Amount'],
        ['Protein', macrosTrackerData.reduce((acc, item) => acc + parseFloat(item.protein), 0)],
        ['Carbohydrates', macrosTrackerData.reduce((acc, item) => acc + parseFloat(item.carbohydrates), 0)],
        ['Fats', macrosTrackerData.reduce((acc, item) => acc + parseFloat(item.fats), 0)]
    ];

    console.log(data);

    const options = {
        title: "Visualize Your Macros",
        pieHole: 0.4, // Creates a Donut Chart. Does not do anything when is3D is enabled
        is3D: true, // Enables 3D view
        pieStartAngle: 100, // Rotates the chart
        sliceVisibilityThreshold: 0.02, // Hides slices smaller than 2%
        legend: {
            position: "bottom",
            alignment: "center",
            textStyle: {
                color: "#233238",
                fontSize: 14,
            },
        },
        chartArea: {
            left: 10,
            top: 10,
            width: '100%',
            height: '75%',
        },
        colors: ["#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"],
    };

    return (
        <>
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
            />
        </>
    );

}