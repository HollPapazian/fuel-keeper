import type { Fueling } from "../types";

export type AnalyticsConfig = {
    title: string;
    formula: (fuelings: Fueling[]) => number | string;
    color: {
        bg: string;
        text: string;
    };
    unit: string;
};

export const analyticsConfig: Record<string, AnalyticsConfig> = {
    lastConsumption: {
        title: "Last Consumption",
        formula: (fuelings: Fueling[] = []) => {
            if (fuelings.length < 2) return 'N/A';
            const consumption = (fuelings.at(-1)!.amount / (fuelings.at(-1)!.mileage - fuelings.at(-2)!.mileage)) * 100;
            return consumption.toFixed(1);
        },
        color: {
            bg: "bg-blue-100",
            text: "text-blue-800"
        },
        unit: "l/100km"
    },
    averageConsumption: {
        title: "Average Consumption",
        formula: (fuelings: Fueling[] = []) => {
            if (fuelings.length < 2) return 'N/A';
            const totalDistance = fuelings.at(-1)!.mileage - fuelings[0].mileage
            const totalAmount = fuelings.reduce<number>((total, { amount }, index) => {
                return index ? total + amount : total
            }, 0)
            const totalConsumption = (totalAmount / totalDistance) * 100;
            return (totalConsumption).toFixed(1);
        },
        color: {
            bg: "bg-green-100",
            text: "text-green-800"
        },
        unit: "l/100km"
    },
    lastPricePerKm: {
        title: "Last Price per km",
        formula: (fuelings: Fueling[] = []) => {
            if (fuelings.length < 2) return 'N/A';
            const lastFueling = fuelings.at(-1)!;
            const previousFueling = fuelings.at(-2)!;
            const distance = lastFueling.mileage - previousFueling.mileage;
            if (distance <= 0) return 'N/A';
            const pricePerKm = (lastFueling.price) / distance;
            return pricePerKm.toFixed(2);
        },
        color: {
            bg: "bg-purple-100",
            text: "text-purple-800"
        },
        unit: "€/km"
    },
    averagePricePerKm: {
        title: "Average Price per km",
        formula: (fuelings: Fueling[] = []) => {
            if (fuelings.length < 2) return 'N/A';
            const totalDistance = fuelings.at(-1)!.mileage - fuelings[0].mileage
            const totalAmount = fuelings.reduce<number>((total, { price }, index) => {
                return index ? total + price : total
            }, 0)
            return (totalAmount / totalDistance).toFixed(1);
        },
        color: {
            bg: "bg-orange-100",
            text: "text-orange-800"
        },
        unit: "€/km"
    }
}; 