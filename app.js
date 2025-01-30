import React, { useState, useEffect } from 'react';

const ActivityTracker = () => {
  const [points, setPoints] = useState(0);
  const [deductPoints, setDeductPoints] = useState('');

  // Load initial points from localStorage when component mounts
  useEffect(() => {
    const savedPoints = localStorage.getItem('activityPoints');
    if (savedPoints) {
      setPoints(parseInt(savedPoints));
    }
  }, []);

  // Save points to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('activityPoints', points);
  }, [points]);

  const activities = [
    { name: 'Layout Analysis', points: 160 },
    { name: 'AI Course', points: 80 },
    { name: 'Workout', points: 40 },
    { name: 'Tourist time', points: 40 }
  ];

  const handleAddPoints = (pointsToAdd) => {
    setPoints(prev => prev + pointsToAdd);
  };

  const handleDeductPoints = (e) => {
    e.preventDefault();
    const pointsToDeduct = parseInt(deductPoints);
    if (!isNaN(pointsToDeduct) && pointsToDeduct >= 0) {
      setPoints(prev => Math.max(0, prev - pointsToDeduct));
      setDeductPoints('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Points Display */}
        <div className="p-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">{points}</h1>
          <p className="text-gray-500 mt-2">Total Points</p>
        </div>

        {/* Activity Buttons */}
        <div className="p-4 grid gap-4">
          {activities.map((activity) => (
            <button
              key={activity.name}
              onClick={() => handleAddPoints(activity.points)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {activity.name} (+{activity.points})
            </button>
          ))}
        </div>

        {/* Deduct Points Form */}
        <form onSubmit={handleDeductPoints} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="number"
              value={deductPoints}
              onChange={(e) => setDeductPoints(e.target.value)}
              placeholder="Points to deduct"
              min="0"
              className="flex-1 p-2 border rounded-lg"
            />
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Deduct
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityTracker;

// Add this at the end of app.js
ReactDOM.render(
  <ActivityTracker />,
  document.getElementById('root')
);
