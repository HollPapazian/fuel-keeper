import { useEffect, useState } from "react";
import { supabaseClient } from "../utils/supabase";
import type { CarInstance } from "../types";
import { analyticsConfig } from "../utils/analytics";
import { Plus, Fuel } from "lucide-react";
import { AddFuelingModal } from "./AddFuelingModal";
import { AddCarButton } from "../components/AddCarButton";

export function FuelingsBlock() {
  const [carInstance, setCarInstance] = useState<CarInstance[]>([]);
  const [selectedCar, setSelectedCar] = useState<CarInstance | null>(null);

  useEffect(() => {
    getInstruments();
  }, []);

  async function getInstruments() {
    const { data, error } = await supabaseClient
      .from("cars")
      .select(`
      *,
      fuelings(*)
      `);
    console.log('data: ', data);
    if (error) {
      console.error(error)
      return;
    }
    setCarInstance(data);
  }

  return (
    <>
      {carInstance.map((car) => (
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

          <div className="h-[150px] bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Chart placeholder</span>
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <AddCarButton />
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
