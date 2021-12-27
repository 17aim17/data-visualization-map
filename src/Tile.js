import { Chart } from "react-google-charts";

export default ({ totalUser, proUser, males, females, proMales, proFemales }) => {
    const revenue = [
        ['Label', 'All Users'],
        [`Pro users: ${proUser}`, proUser],
        [`Non-pro users: ${totalUser - proUser}`, totalUser - proUser]
    ];

    const gender = [
        ['Label', 'All Users'],
        [`Males: ${males}`, males],
        [`Females: ${females}`, females]
    ]

    const revenueByGender = [
        ['Label', 'All Users'],
        [`Pro Males users: ${proMales}`, proMales],
        [`Pro females users: ${proFemales}`, proFemales]
    ]

    return (
        <>
            <Chart
                chartType="PieChart"
                data={revenue}
                options={{ 'title': `Total Users: ${totalUser}` }}
                width={"100%"}
            />

            <Chart
                chartType="PieChart"
                data={gender}
                options={{ 'title': `Gender Ratio: ${(males / females).toFixed(2)}` }}
                width={"100%"}
            />

            <Chart
                chartType="PieChart"
                data={revenueByGender}
                options={{ 'title': `Total Pro Users: ${proUser}` }}
                width={"100%"}
            />
        </>
    )
}