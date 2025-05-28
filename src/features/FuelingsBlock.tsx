import { useEffect, useState } from "react";
import { supabaseClient } from "../utils/supabase";
import type { CarInstance } from "../types";
import { analyticsConfig } from "../utils/analytics";
import { Plus, Fuel, ChevronLeft, ChevronRight } from "lucide-react";
import { AddFuelingModal } from "./AddFuelingModal";
import { AddCarButton } from "../components/AddCarButton";
import { Loader } from "../components/Loader";
import { FuelingChart } from "./Chart/FuelingChart";
import { chartCalculations } from "../utils/chartCalculations";

export function FuelingsBlock() {
  const [carInstance, setCarInstance] = useState<CarInstance[]>([]);
  const [selectedCar, setSelectedCar] = useState<CarInstance | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChartType, setCurrentChartType] = useState<keyof typeof chartCalculations>('fuelConsumption');

  useEffect(() => {
    getInstruments();
  }, []);

  async function getInstruments() {
    setIsLoading(true)
    const { data, error } = await supabaseClient
      .from("cars")
      .select(`
      *,
      fuelings(*)
      `);
    setIsLoading(false)
    console.log('data: ', data);
    if (error) {
      console.error(error)
      return;
    }
    setCarInstance(data);
  }

  const chartTypes = Object.keys(chartCalculations) as Array<keyof typeof chartCalculations>;
  const currentIndex = chartTypes.indexOf(currentChartType);

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + chartTypes.length) % chartTypes.length;
    setCurrentChartType(chartTypes[newIndex]);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % chartTypes.length;
    setCurrentChartType(chartTypes[newIndex]);
  };

  return (
    <>
      {isLoading ? <Loader /> : carInstance.map((car) => (
        <div key={car.alias} className="bg-white rounded-lg shadow-md p-4 w-full border border-gray-200 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{car.alias}</h2>
            <button
              className="flex items-center gap-1 px-3 py-1.5 h-[36px] bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              onClick={() => setSelectedCar(car)}
            >
              <Plus size={16} />
              <Fuel size={16} />
            </button>
          </div>

          {car.fuelings.length === 0 ? (
            <div className="text-gray-500 text-center py-4">
              Add more fueling to see analytics
            </div>
          ) : car.fuelings.length === 1 ? (
            <div className="text-gray-500 text-center py-4">
              Add one more fueling to see analytics
            </div>
          ) : (
            <>
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

              <FuelingChart car={car} chartType={currentChartType} />
              
              <div className="flex items-center justify-between mt-4 w-full">
                <button
                  onClick={handlePrevious}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <h3 className="text-lg font-medium text-gray-500">{chartCalculations[currentChartType].title}</h3>
                <button
                  onClick={handleNext}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      <div className="flex justify-center">
        <AddCarButton onSuccess={getInstruments} />
      </div>

      {selectedCar && (
        <AddFuelingModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          onSuccess={getInstruments}
        />
      )}
    </>
  );
}
