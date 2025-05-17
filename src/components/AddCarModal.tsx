import { useState, useRef, useEffect } from "react";
import { supabaseClient } from "../utils/supabase";
import { useSessionStore } from "../store/sessionStore";

interface AddCarModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function AddCarModal({ onClose, onSuccess }: AddCarModalProps) {
  const [alias, setAlias] = useState("");
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { session } = useSessionStore();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!alias.trim()) {
      setError("Car name cannot be empty");
      return;
    }

    if (!session?.user?.id) {
      setError("You must be logged in to add a car");
      return;
    }

    const { error } = await supabaseClient
      .from("cars")
      .insert([{ 
        alias: alias.trim(),
        user_id: session.user.id 
      }]);

    if (error) {
      setError(error.message);
      return;
    }

    onSuccess();
  };

  return (
    <dialog
      ref={dialogRef}
      className="p-0 bg-transparent backdrop:bg-black/50 mx-auto my-auto w-[min(100%,388px)]"
      onClose={onClose}
    >
      <div className="bg-white rounded-lg p-6 w-full">
        <h2 className="text-xl font-semibold mb-4">Add New Car</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="alias" className="block text-sm font-medium text-gray-700">
              Car Name
            </label>
            <input
              type="text"
              id="alias"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className={`mt-1 block w-full rounded-md border-2 ${error ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3`}
              placeholder="Enter car name"
              required
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Add Car
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
} 