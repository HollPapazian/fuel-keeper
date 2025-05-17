import { Plus, Car } from "lucide-react";
import { useState } from "react";
import { AddCarModal } from "./AddCarModal";

export function AddCarButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className="flex items-center px-3 py-1.5 h-[36px] bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus size={16} />
        <Car className="ml-0.5" size={16} />
        <span className="ml-3">Add new car</span>
      </button>

      {isModalOpen && (
        <AddCarModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
} 