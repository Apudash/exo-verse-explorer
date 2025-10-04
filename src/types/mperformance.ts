export interface ModelPerformanceData {
    mission: "kepler" | "tess";
    precision: number;
    recall: number;
    f1score: number;
    performance: number;
    roc: { fpr: number; tpr: number }[];
    pr: { recall: number; precision: number }[];
  }
  