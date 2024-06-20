
import { PieChart, Pie,   Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = [
    '#0088FE', // Base color (light blue)
    '#0077CC', // Slightly darker and less saturated
    '#0066BB', // Darker and less saturated
    '#0055AA', // Even darker and less saturated
    '#004499', // Darkest and least saturated
    '#3399FF', // Slightly lighter and more saturated
    '#66AAFF', // Lighter and more saturated
    '#99BBFF', // Even lighter and more saturated
    '#CCDDFF', // Lightest and most saturated
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent  }:any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const CircleChart = ({ data }:any) => {
    console.log(data,'/graphdatamodel')
    return (
        <div className='    rounded-xl  overflow-scroll h-[90%] flex w-full'>
            {!data?.length ?
                <div className='flex   justify-center items-center   h-[100%] w-[100%]'>
                    <h1 className=''>no data</h1>
                </div> :

                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"

                        >
                            {data?.map((_entry:any, index:any) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>}

        </div>
    );

}
export default CircleChart