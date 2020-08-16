import React from 'react';
import {Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";

const Chart = ({ data }) => {
  return (
    <BarChart style={{margin: '40px auto'}} width={Math.min(window.innerWidth, 700)} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name"/>
      <YAxis ticks={[2, 4, 6, 8, 10]} domain={[1, 10]} />
      <Tooltip />
      <Bar dataKey="meanScore" name="Średnia ocena głosowania" fill="#8884d8" />
    </BarChart>
  );
};

export default Chart;