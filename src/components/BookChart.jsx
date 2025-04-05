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

    const formattedData = Object.keys(data).map(year => ({ year, count: data[year] }));

    return (
        <div className='chart'>
            <ResponsiveContainer width={500} height={500}>
                <BarChart
                    width={500}
                    height={300}
                    data={formattedData}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BookChart;