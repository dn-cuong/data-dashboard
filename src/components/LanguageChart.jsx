import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LanguageChart = ({ books }) => {
    const data = books.reduce((acc, book) => {
        if (book.language) {
            book.language.forEach(lang => {
                acc[lang] = (acc[lang] || 0) + 1;
            });
        }
        return acc;
    }, {});

    const formattedData = Object.entries(data)
        .sort((a, b) => b[1] - a[1])
        .map(([lang, value]) => ({ 
            name: lang.toUpperCase(), 
            value: value 
        }));

    const COLORS = [
        '#8884d8', '#82ca9d', '#ffc658', '#ff7c43', 
        '#00C49F', '#FFBB28', '#FF8042', '#0088FE',
        '#a4de6c', '#d0ed57', '#83a6ed', '#8dd1e1'
    ];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return percent > 0.05 ? (
            <text 
                x={x} 
                y={y} 
                fill="white" 
                textAnchor={x > cx ? 'start' : 'end'} 
                dominantBaseline="central"
            >
                {`${name} ${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null;
    };

    return (
        <div className='chart'>
            <h3>Book Distribution by Language</h3>
            <div className="chart-content">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={formattedData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius="90%"
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {formattedData.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={COLORS[index % COLORS.length]} 
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend layout="vertical" align="right" verticalAlign="middle" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LanguageChart; 