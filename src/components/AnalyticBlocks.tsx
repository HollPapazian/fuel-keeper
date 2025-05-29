import { analyticsConfig } from "../utils/analytics";
import type { CarInstance } from "../types";

interface AnalyticBlocksProps {
  car: CarInstance;
}

export function AnalyticBlocks({ car }: AnalyticBlocksProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {Object.entries(analyticsConfig).map(([key, config]) => (
        <div
          key={key}
          className={`${config.color.bg} ${config.color.text} px-3 py-1 rounded-sm text-sm`}
        >
          {config.title}: {config.formula(car.fuelings)} {config.unit}
        </div>
      ))}
    </div>
  );
} 