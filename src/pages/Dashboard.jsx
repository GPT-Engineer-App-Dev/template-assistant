import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  { name: 'Jan', notes: 30 },
  { name: 'Feb', notes: 20 },
  { name: 'Mar', notes: 50 },
  { name: 'Apr', notes: 75 },
  { name: 'May', notes: 60 },
  { name: 'Jun', notes: 90 },
  { name: 'Jul', notes: 100 },
  { name: 'Aug', notes: 80 },
  { name: 'Sep', notes: 70 },
  { name: 'Oct', notes: 60 },
  { name: 'Nov', notes: 50 },
  { name: 'Dec', notes: 40 },
];

const Dashboard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>
          Overview of notes creation over the year.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="notes" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default Dashboard;