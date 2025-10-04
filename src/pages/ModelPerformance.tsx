import { useState } from "react";
import { Navigation } from '@/components/Navigation';
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { StarfieldBackground } from "@/components/StarfieldBackground";
import { useModelPerformance } from "@/hooks/useModelPerformance";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent,
} from "@/components/ui/card";
import { Activity, TrendingUp } from "lucide-react";

const ModelPerformancePage = () => {
  const [model, setModel] = useState<"kepler" | "tess">("kepler");
  const { data, loading, error } = useModelPerformance(model);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-primary/20 rounded-lg p-3 shadow-glow">
          <p className="text-sm font-medium">{`X: ${label}`}</p>
          <p className="text-sm text-primary">{`Y: ${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

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
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={{ fill: color, r: 4 }} activeDot={{ r: 6, fill: color, stroke: '#fff', strokeWidth: 2, filter: `drop-shadow(0 0 8px ${color})` }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
   
  if (loading) return( <p className="text-center mt-12">Loading model performance...</p>);
  if (error) return <p className="text-center mt-12 text-red-500">{error}</p>;
  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-space relative">
      <StarfieldBackground />
      <div className="relative z-10">
        <Navigation onSearch={() => {}} searchQuery="" />
        <motion.div className="container mx-auto px-4 py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <motion.h1 className="text-4xl md:text-6xl font-bold mb-8 text-center bg-gradient-neon bg-clip-text text-transparent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            Model Performance
          </motion.h1>

          <motion.div className="flex items-center justify-center gap-4 mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <span className="font-medium">Kepler</span>
            <Switch checked={model === "tess"} onCheckedChange={(checked) => setModel(checked ? "tess" : "kepler")} />
            <span className="font-medium">TESS</span>
          </motion.div>

          <motion.div className="overflow-x-auto mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
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
          </motion.div>

          <motion.p className="text-lg md:text-xl font-semibold text-center mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            Performance: {data.performance}%
          </motion.p>

          <motion.div className="flex flex-col md:flex-row gap-8 mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <GraphCard title="ROC Curve" description="Receiver Operating Characteristic" data={data.roc} dataKey="tpr" color="#4FC3F7" Icon={TrendingUp} />
            <GraphCard title="Precision-Recall Curve" description="Precision vs Recall" data={data.pr} dataKey="precision" color="#BB86FC" Icon={Activity} />
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 pt-8 border-t border-primary/20 text-center"
          >
            <div className="flex items-center justify-center space-x-6 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-neon rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground"><img src="image/team_logo.png"     // URL of the image
                       alt="NH"          // accessible description
                       className="w-full h-full object-cover"
                   /></span>
                </div>
                <span className="text-sm text-muted-foreground">Team NewHorizon</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white"><img src="image/logo_nasa.png"     // URL of the image
                       alt="NASA"          // accessible description
                       className="w-full h-full object-cover"
                   /></span>
                </div>
                <span className="text-sm text-muted-foreground">Space Apps Challenge 2024</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Built with React, Three.js, and of space exploration Dataset of Nasa
            </p>
          </motion.footer>
      </div>
    </div>
  );
};

export default ModelPerformancePage;
