import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const StatisticsPage = () => {
  const [yogaData, setYogaData] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    const yogaStats = JSON.parse(sessionStorage.getItem("yoga_stats")) || [];
    const exerciseStats = JSON.parse(sessionStorage.getItem("exercise_stats")) || [];
    setYogaData(yogaStats);
    setExerciseData(exerciseStats);
  }, []);

  const groupBy = (data, keyName) => {
    const grouped = {};
    data.forEach((entry) => {
      const key = entry[keyName];
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(entry);
    });
    return grouped;
  };

  const groupedYoga = groupBy(yogaData, "yoga");
  const groupedExercise = groupBy(exerciseData, "exercise");

  const yogaChartData = Object.entries(groupedYoga).map(([pose, entries]) => ({
    name: pose,
    openedCount: entries.length,
  }));

  const exerciseChartData = Object.entries(groupedExercise).map(([exercise, entries]) => ({
    name: exercise,
    totalReps: entries.reduce((sum, e) => sum + e.count, 0),
  }));

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white p-10">
      {/* Yoga Statistics */}
      <h1 className="text-4xl text-center mb-10 font-bold text-[#e3ffa8]">
        🧘 Your Yoga Statistics
      </h1>

      {yogaChartData.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-center text-[#bdd76a] mb-4">Yoga Pose Time Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
          <BarChart data={yogaChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Bar dataKey="openedCount" fill="#e3ffa8" />
</BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {Object.keys(groupedYoga).length === 0 ? (
        <p className="text-center text-xl text-gray-400">
          No yoga data yet. Practice a pose to see stats here!
        </p>
      ) : (
        Object.entries(groupedYoga).map(([pose, entries]) => (
          <div
            key={pose}
            className="mb-10 border border-gray-700 rounded-xl bg-[#1a1a1d] p-6 shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-[#bdd76a] mb-2 capitalize">
              {pose}
            </h2>
            <p>Total Sessions: <span className="text-[#e3ffa8]">{entries.length}</span></p>
            <p>
              Best Time:{" "}
              <span className="text-[#e3ffa8]">
                {Math.max(...entries.map((e) => e.time))} seconds
              </span>
            </p>
            <p>
              Total Time Practiced:{" "}
              <span className="text-[#e3ffa8]">
                {entries.reduce((acc, e) => acc + e.time, 0)} seconds
              </span>
            </p>

            <table className="w-full mt-5 text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Time Held (s)</th>
                  <th className="pb-2">Target Time (s)</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={index} className="border-b border-gray-800">
                    <td className="py-2">{entry.date}</td>
                    <td className="py-2">{entry.time}</td>
                    <td className="py-2">{entry.target || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}

      {/* Exercise Statistics */}
      <h1 className="text-4xl text-center my-10 font-bold text-[#e3ffa8]">
        🏋️‍♂️ Your Exercise Statistics
      </h1>

      {exerciseChartData.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-center text-[#bdd76a] mb-4">Exercise Reps Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={exerciseChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalReps" fill="#e3ffa8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {Object.keys(groupedExercise).length === 0 ? (
        <p className="text-center text-xl text-gray-400">
          No exercise data yet. Complete an exercise to see stats here!
        </p>
      ) : (
        Object.entries(groupedExercise).map(([exercise, entries]) => (
          <div
            key={exercise}
            className="mb-10 border border-gray-700 rounded-xl bg-[#1a1a1d] p-6 shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-[#bdd76a] mb-2 capitalize">
              {exercise}
            </h2>
            <p>Total Sessions: <span className="text-[#e3ffa8]">{entries.length}</span></p>
            <p>
              Best Count:{" "}
              <span className="text-[#e3ffa8]">
                {Math.max(...entries.map((e) => e.count))}
              </span>
            </p>
            <p>
              Total Reps Completed:{" "}
              <span className="text-[#e3ffa8]">
                {entries.reduce((acc, e) => acc + e.count, 0)}
              </span>
            </p>

            <table className="w-full mt-5 text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Reps Done</th>
                  <th className="pb-2">Target</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={index} className="border-b border-gray-800">
                    <td className="py-2">{entry.date}</td>
                    <td className="py-2">{entry.count}</td>
                    <td className="py-2">{entry.target || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default StatisticsPage;
