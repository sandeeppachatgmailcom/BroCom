import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
 

const LineGraph=({graphData}:any)=> {
  const [data,setData] = useState()  
  
  useEffect(()=>{
    console.log(data,'datadata')
    setData(graphData)
  },[graphData])

     return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="8 8" />
          <XAxis dataKey="Xvalue" />
          <YAxis dataKey="students"/>
          <Tooltip />
          <Legend />
          <Line type="monotone"  dataKey="students" stroke="#FFFFFF" />
           
        </LineChart>
      </ResponsiveContainer>
    );
  
}

export default LineGraph