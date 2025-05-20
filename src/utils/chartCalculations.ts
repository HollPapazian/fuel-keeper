import type { Fueling } from "../types";

export const chartCalculations = {
    fuelConsumption: {
        title: 'Fuel Consumption (L/100km)',
        getLabels: (fuelings: Fueling[]) => fuelings.map(fueling =>
            new Date(fueling.created_at).toLocaleDateString()
        ).slice(1),
        getDataSet: (fuelings: Fueling[]) => fuelings.map((fueling, index) =>
            (fueling.amount / ((fueling.mileage - fuelings[index - 1]?.mileage) / 100)).toFixed(2)
        ).slice(1)
    },
    pricePerFueling: {
        title: 'Price per Fueling (€)',
        getLabels: (fuelings: Fueling[]) => fuelings.map(fueling =>
            new Date(fueling.created_at).toLocaleDateString()
        ),
        getDataSet: (fuelings: Fueling[]) => fuelings.map(fueling =>
            fueling.price.toFixed(2)
        )
    },
    amountPerFueling: {
        title: 'Amount per Fueling (L)',
        getLabels: (fuelings: Fueling[]) => fuelings.map(fueling =>
            new Date(fueling.created_at).toLocaleDateString()
        ),
        getDataSet: (fuelings: Fueling[]) => fuelings.map(fueling =>
            fueling.amount.toFixed(2)
        )
    },
    pricePerLiter: {
        title: 'Price per Liter (€/L)',
        getLabels: (fuelings: Fueling[]) => fuelings.map(fueling =>
            new Date(fueling.created_at).toLocaleDateString()
        ),
        getDataSet: (fuelings: Fueling[]) => fuelings.map(fueling =>
            (fueling.price / fueling.amount).toFixed(2)
        )
    }
}