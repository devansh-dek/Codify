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
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHeatmapData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/${userId}/heatmap`);
                if (response.data.success) {
                    setHeatmapData(response.data.response || []);
                } else {
                    setError('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching heatmap data:', error);
                setError('Error loading heatmap data');
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchHeatmapData();
        }
    }, [userId]);

    // Mapping submission counts to Tailwind classes for color scaling
    const getClassForValue = (value: { count: number } | undefined) => {
        if (!value || value.count === 0) return 'bg-gray-200';
        if (value.count === 1) return 'bg-lime-300';
        if (value.count === 2) return 'bg-green-300';
        if (value.count === 3) return 'bg-emerald-400';
        return 'bg-emerald-600';
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-48 bg-gray-200 rounded"></div>
                    <div className="h-8 bg-gray-200 rounded w-2/3"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="text-red-500">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Contribution Activity
                </h2>
                <div className="text-sm text-gray-500">
                    {moment().subtract(1, 'year').format('MMM YYYY')} - {moment().format('MMM YYYY')}
                </div>
            </div>

            <div className="mb-8 overflow-x-auto">
                <CalendarHeatmap
                    startDate={moment().subtract(1, 'year').toDate()}
                    endDate={moment().toDate()}
                    values={heatmapData}
                    classForValue={getClassForValue}
                    showWeekdayLabels
                    gutterSize={4}
                    tooltipDataAttrs={(value: { date: string; count: number } | undefined) => ({
                        'data-tip': value
                            ? `${moment(value.date).format('MMM D, YYYY')}: ${value.count} submissions`
                            : 'No submissions'
                    })}
                />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {[
                    { bg: 'bg-gray-200', text: 'No Activity' },
                    { bg: 'bg-lime-300', text: 'Low' },
                    { bg: 'bg-green-300', text: 'Medium' },
                    { bg: 'bg-emerald-400', text: 'High' },
                    { bg: 'bg-emerald-600', text: 'Very High' }
                ].map((level) => (
                    <div key={level.text} className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded ${level.bg} border border-gray-300`}></div>
                        <span className="text-sm text-gray-600">{level.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Heatmap;