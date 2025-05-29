import { ChevronLeft, ChevronRight } from "lucide-react";
import { chartCalculations } from "../utils/chartCalculations";

type ChartTypeSelectorProps = {
  currentChartType: keyof typeof chartCalculations;
  onPrevious: () => void;
  onNext: () => void;
};

export function ChartTypeSelector({ currentChartType, onPrevious, onNext }: ChartTypeSelectorProps) {
  return (
    <div className="flex items-center justify-between mt-4 w-full">
      <button
        onClick={onPrevious}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <h3 className="text-md font-medium text-gray-500">{chartCalculations[currentChartType].title}</h3>
      <button
        onClick={onNext}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
} 