import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BookChart = ({ books }) => {
    const data = books.reduce((acc, book) => {
        const year = book.first_publish_year;
        if (year) {
            acc[year] = (acc[year] || 0) + 1;
        }
        return acc;
    }, {});

    const formattedData = Object.keys(data)
        .sort((a, b) => Number(a) - Number(b))
        .map(year => ({ year, count: data[year] }));

    return (
        <div className='chart'>
            <h3>Books Published by Year</h3>
            <div className="chart-content">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={formattedData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 30,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="year"
                            angle={-45}
                            textAnchor="end"
                            height={60}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" name="Number of Books" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BookChart;