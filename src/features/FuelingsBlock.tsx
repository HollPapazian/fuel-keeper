import { useEffect, useState } from "react";
import { supabaseClient } from "../utils/supabase";
import type { CarInstance } from "../types";
import { analyticsConfig } from "../utils/analytics";

export function FuelingsBlock() {
  const [carInstance, setCarInstance] = useState<CarInstance[]>([]);

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
    if (error) {
      console.error(error)
      return;
    }
    setCarInstance(data);
  }

  return (
    <>
      {carInstance.map((car) => (
        <div key={car.alias} className="bg-white rounded-lg shadow-md p-4 w-full border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">{car.alias}</h2>

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
    </>
  );
}
