import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { StarfieldBackground } from "@/components/StarfieldBackground";
import { useModelPerformance } from "@/hooks/useModelPerformance";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Activity, TrendingUp } from "lucide-react";

const LoadingBlock = ({ step }: { step: number }) => {
  const steps = [
    "Requesting API...",
    "Calculating performance data...",
    "Finalizing performance report...",
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center py-24 bg-black/50 rounded-lg my-8">
      <motion.div
        className="w-16 h-16 border-4 border-t-primary border-gray-700 rounded-full mb-6"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <p className="text-white text-lg font-medium">{steps[step]}</p>
    </div>
  );
};

const ErrorBlock = ({ onRetry }: { onRetry: () => void }) => (
  <div className="w-full flex flex-col items-center justify-center py-24 bg-black/60 border border-primary-500/50 rounded-lg my-8">
    <p className="text-primary-400 text-xl font-bold mb-4">Failed to load data</p>
    <button
      onClick={onRetry}
      className="px-6 py-2 bg-gradient-to-r from-primary-600 to-pink-500 text-white rounded-lg shadow-glow hover:scale-105 transition-transform"
    >
      Retry
    </button>
  </div>
);


const GraphCard = ({ title, description, data, dataKey, color, Icon }: any) => (
  <Card className="bg-gradient-card border-primary/20 shadow-glow flex-1">
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <Icon className="h-5 w-5 text-primary" />
        <span>{title}</span>
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey={Object.keys(data[0])[0]} tick={{ fill: 'hsl(var(--muted-foreground))' }} axisLine={{ stroke: 'hsl(var(--border))' }} />
            <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} axisLine={{ stroke: 'hsl(var(--border))' }} />
            <Tooltip content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-card border border-primary/20 rounded-lg p-3 shadow-glow">
                    <p className="text-sm font-medium">{`X: ${label}`}</p>
                    <p className="text-sm text-primary">{`Y: ${payload[0].value.toFixed(2)}`}</p>
                  </div>
                );
              }
              return null;
            }} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, r: 4 }}
              activeDot={{ r: 6, fill: color, stroke: '#fff', strokeWidth: 2, filter: `drop-shadow(0 0 8px ${color})` }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const ModelPerformancePage = () => {
  const [model, setModel] = useState<"kepler" | "tess">("kepler");
  const { data, loading, error, refetch } = useModelPerformance(model);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => setLoadingStep((prev) => (prev + 1) % 3), 1000);
      return () => clearInterval(interval);
    }
  }, [loading]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-space relative">
      {/* Header */}
      <Navigation onSearch={() => {}} searchQuery="" />

      {/* Content Block */}
      <div className="flex-1 container mx-auto px-4 py-12 relative z-10">
        <StarfieldBackground />

        {loading && <LoadingBlock step={loadingStep} />}
        {error && <ErrorBlock onRetry={() => refetch()} />}

        {!loading && !error && data && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            {/* Model Switch */}
           <div className="flex justify-center gap-4 mb-12">
            {["Kepler", "TESS"].map((m) => {
              const isActive = model.toLowerCase() === m.toLowerCase();
              return (
                <button
                  key={m}
                  onClick={() => setModel(m.toLowerCase() as "kepler" | "tess")}
                  className={`
                    px-6 py-2 rounded-lg font-medium transition-all
                    ${isActive ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-glow" : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"}
                  `}
                >
                  {m}
                </button>
              );
            })}
          </div>

            {/* Table */}
            <div className="overflow-x-auto mb-8">
              <table className="table-auto border border-gray-300 w-full text-center rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm">
                <thead className="bg-gray-100/50">
                  <tr>
                    <th className="px-4 py-2">Precision</th>
                    <th className="px-4 py-2">Recall</th>
                    <th className="px-4 py-2">F1 Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2">{data.precision}</td>
                    <td className="px-4 py-2">{data.recall}</td>
                    <td className="px-4 py-2">{data.f1score}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-lg md:text-xl font-semibold text-center my-8">
              Performance: {data.performance}%
            </p>

            {/* Graphs */}
            <div className="flex flex-col md:flex-row gap-8 mb-12">
              <GraphCard title="ROC Curve" description="Receiver Operating Characteristic" data={data.roc} dataKey="tpr" color="#4FC3F7" Icon={TrendingUp} />
              <GraphCard title="Precision-Recall Curve" description="Precision vs Recall" data={data.pr} dataKey="precision" color="#BB86FC" Icon={Activity} />
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-auto pt-8 border-t border-primary/20 text-center">
        <div className="flex items-center justify-center space-x-6 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-neon rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">
                <img src="image/team_logo.png" alt="NH" className="w-full h-full object-cover" />
              </span>
            </div>
            <span className="text-sm text-muted-foreground">Team NewHorizon</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                <img src="image/logo_nasa.png" alt="NASA" className="w-full h-full object-cover" />
              </span>
            </div>
            <span className="text-sm text-muted-foreground">Space Apps Challenge 2024</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Built with React, Three.js, and space exploration dataset of NASA
        </p>
      </motion.footer>
    </div>
  );
};

export default ModelPerformancePage;
