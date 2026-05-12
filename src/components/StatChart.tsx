"use client";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { mois: "Jan", vues: 400, messages: 240 },
  { mois: "Fev", vues: 300, messages: 139 },
  { mois: "Mar", vues: 200, messages: 980 },
  { mois: "Avr", vues: 278, messages: 390 },
];

export const StatsChart = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md md:w-1/2">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">
        Statistique de performance
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="mois" stroke="#94a3b8" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="vues"
            stroke="#22c55e"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="messages"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
