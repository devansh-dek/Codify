import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import axios from 'axios';
import moment from 'moment';

interface HeatmapData {
    date: string;
    count: number;
}

interface HeatmapProps {
    userId: number;
}

const Heatmap: React.FC<HeatmapProps> = ({ userId }) => {
    const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);

    // Fetch heatmap data when component mounts
    useEffect(() => {
        const fetchHeatmapData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/${userId}/heatmap`);
                if (response.data.success) {
                    setHeatmapData(response.data.response);
                }
            } catch (error) {
                console.error('Error fetching heatmap data:', error);
            }
        };

        fetchHeatmapData();
    }, [userId]);

    // Mapping submission counts to Tailwind classes for color scaling
    const getClassForValue = (value: { count: number } | undefined) => {
        if (!value || value.count === 0) return 'bg-gray-200'; // Tailwind gray-200 for empty
        if (value.count === 1) return 'bg-lime-300';  // Tailwind lime-300 for low activity
        if (value.count === 2) return 'bg-green-300';  // Tailwind green-300
        if (value.count === 3) return 'bg-emerald-400';  // Tailwind emerald-400
        return 'bg-emerald-600';  // Tailwind emerald-600 for max activity
    };

    return (
        <div className='bg-white shadow-md rounded-lg p-4 sm:p-6'>
            <h2 className='text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left'>
                Your Submission Activity
            </h2>

            <div className="overflow-auto">
                <CalendarHeatmap
                    startDate={moment().subtract(1, 'year').toDate()}
                    endDate={moment().toDate()}
                    values={heatmapData}
                    classForValue={getClassForValue}
                    showWeekdayLabels
                    tooltipDataAttrs={(value: { date: string; count: number }) => {
                        return {
                            'data-tip': `${value.date}: ${value.count} submissions`,
                        };
                    }}
                />
            </div>

            <div className="flex flex-col sm:flex-row justify-center sm:justify-start mt-4 space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-gray-200"></div><span className="ml-2">No Submissions</span>
                </div>
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-lime-300"></div><span className="ml-2">Low Activity</span>
                </div>
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-300"></div><span className="ml-2">Moderate Activity</span>
                </div>
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-emerald-400"></div><span className="ml-2">High Activity</span>
                </div>
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-emerald-600"></div><span className="ml-2">Very High Activity</span>
                </div>
            </div>
        </div>
    );
};

export default Heatmap;
