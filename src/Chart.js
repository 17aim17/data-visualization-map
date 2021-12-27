import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";



export default ({ data, selectedArea }) => {

    const chartData = [
        {
            name: "Total Users",
            all: data.totalUsers,
            area: data.totalUsersByArea,
        },
        {
            name: "Total Males",
            all: data.totalMales,
            area: data.totalMalesByArea,
        },
        {
            name: "Total Females",
            all: data.totalFemales,
            area: data.totalFemalesByArea,
        },
        {
            name: "Total Pro Users",
            all: data.totalProUsers,
            area: data.proUsersByArea,
        },
        {
            name: "Total Pro Males",
            all: data.totalProMales,
            area: data.proMalesByArea,
        },
        {
            name: "Total Pro Females",
            all: data.totalProFemales,
            area: data.proFemalesByArea,
        }
    ];



    return (
        <BarChart
            width={1000}
            height={600}
            data={chartData}
            margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="all" fill="#d63031" />
            <Bar dataKey="area" fill="#0984e3" />
        </BarChart>
    );
}
