import { useEffect, useState } from "react";
import { supabaseClient } from "../utils/supabase";

export function FuelingsBlock() {
  const [instruments, setInstruments] = useState([]);

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
    setInstruments(data);
  }

  return (
    <ul>
      {instruments.map((instrument) => (
        <li key={instrument.alias}>{instrument.alias}</li>
      ))}
    </ul>
  );
}
