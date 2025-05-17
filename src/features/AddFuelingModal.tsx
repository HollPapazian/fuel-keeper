import { useState } from 'react';
import { supabaseClient } from '../utils/supabase';
import type { CarInstance } from '../types';
import { z } from 'zod';
import { useDialogRef } from '../hooks/useDialogRef';

interface AddFuelingModalProps {
  car: CarInstance;
  onClose: () => void;
  onSuccess: () => void;
}

const fuelingSchema = z.object({
  price: z.number().positive('Price must be greater than 0'),
  amount: z.number().positive('Amount must be greater than 0'),
  mileage: z.number().positive('Mileage must be greater than 0'),
});

export function AddFuelingModal({ car, onClose, onSuccess }: AddFuelingModalProps) {
  const [price, setPrice] = useState((car.fuelings.at(-1)?.price || 0).toString());
  const [amount, setAmount] = useState((car.fuelings.at(-1)?.amount || 0).toString());
  const [mileage, setMileage] = useState((car.fuelings.at(-1)?.mileage || 0).toString());
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dialogRef = useDialogRef()

  const validateForm = () => {
    try {
      const lastMileage = car.fuelings.at(-1)?.mileage || 0;
      const validationSchema = fuelingSchema.extend({
        mileage: z.number()
          .positive('Mileage must be greater than 0')
          .refine((val) => val > lastMileage, {
            message: `Mileage must be greater than the last recorded mileage (${lastMileage} km)`
          })
      });

      validationSchema.parse({
        price: parseFloat(price),
        amount: parseFloat(amount),
        mileage: parseInt(mileage),
      });
      
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabaseClient
        .from('fuelings')
        .insert({
          car_id: car.id,
          price: parseFloat(price),
          amount: parseFloat(amount),
          mileage: parseInt(mileage),
        });

      if (error) throw error;
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error adding fueling:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="p-0 bg-transparent backdrop:bg-black/50 mx-auto my-auto w-[min(100%,388px)]"
      onClose={onClose}
    >
      <div className="bg-white rounded-lg p-6 w-full">
        <h2 className="text-xl font-semibold mb-4">Add Fueling for {car.alias}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price (€)
            </label>
            <input
              type="number"
              step="0.01"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`mt-1 block w-full rounded-md border-2 ${errors.price ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3`}
              required
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount (L)
            </label>
            <input
              type="number"
              step="0.01"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`mt-1 block w-full rounded-md border-2 ${errors.amount ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3`}
              required
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
            )}
          </div>

          <div>
            <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">
              Mileage (km)
            </label>
            <input
              type="number"
              id="mileage"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              className={`mt-1 block w-full rounded-md border-2 ${errors.mileage ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3`}
              required
            />
            {errors.mileage && (
              <p className="mt-1 text-sm text-red-600">{errors.mileage}</p>
            )}
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
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? 'Adding...' : 'Add Fueling'}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
} 