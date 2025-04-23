
import { motion } from "framer-motion";
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
  { name: "Jan", visitors: 180, conversions: 24 },
  { name: "Feb", visitors: 260, conversions: 38 },
  { name: "Mar", visitors: 400, conversions: 45 },
  { name: "Apr", visitors: 480, conversions: 57 },
  { name: "May", visitors: 700, conversions: 82 }
];

export function InsightsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, type: "spring" }}
      className="flex flex-col items-center justify-center w-full"
    >
      <h3 className="text-2xl font-bold mb-8 text-center">AI-Powered Insights</h3>
      <ChartContainer
        config={{
          visitors: {
            label: "Visitors",
            color: "#58adfb"
          },
          conversions: {
            label: "Conversions",
            color: "#F88220"
          }
        }}
        className="w-full max-w-2xl bg-[#22212a]/85 rounded-2xl p-5 shadow-xl"
      >
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend content={<ChartLegendContent />} />
            <Line
              type="monotone"
              dataKey="visitors"
              stroke="#58adfb"
              strokeWidth={3}
              dot={{ r: 5, fill: "#58adfb", stroke: "#fff", strokeWidth: 2 }}
              activeDot={{
                r: 9,
                fill: "#F88220",
                stroke: "#fff",
                strokeWidth: 3,
                style: { filter: "drop-shadow(0 0 8px #F88220AA)" }
              }}
              isAnimationActive
            />
            <Line
              type="monotone"
              dataKey="conversions"
              stroke="#F88220"
              strokeWidth={3}
              dot={{ r: 5, fill: "#F88220", stroke: "#fff", strokeWidth: 2 }}
              activeDot={{
                r: 10,
                fill: "#F88220",
                stroke: "#fff",
                strokeWidth: 3,
                style: { filter: "drop-shadow(0 0 10px #F88220CC)" }
              }}
              isAnimationActive
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
      <div className="text-blue-200 text-lg mt-6 mb-2 text-center">
        Data-driven results from our AI implementations.
      </div>
    </motion.div>
  );
}
