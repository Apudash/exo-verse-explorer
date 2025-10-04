import { useState, useEffect } from "react";
import { ModelPerformanceData } from "@/types/mperformance";
import { apiService } from "@/lib/api";

export interface UseModelPerformanceReturn {
  data: ModelPerformanceData | null;
  loading: boolean;
  error: string | null;
  refetch: (mission: "kepler" | "tess") => Promise<void>;
}

export const useModelPerformance = (
  mission: "kepler" | "tess" = "kepler"
): UseModelPerformanceReturn => {
  const [data, setData] = useState<ModelPerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPerformance = async (mission: "kepler" | "tess") => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getModelPerformance(mission);
      setData(response);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load model performance";
      setError(errorMessage);
      console.error("Error fetching model performance:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformance(mission);
  }, [mission]);

  return {
    data,
    loading,
    error,
    refetch: fetchPerformance,
  };
};
