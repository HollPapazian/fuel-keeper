export type Fueling = {
    "id": string,
    "price": number,
    "amount": number,
    "car_id": string,
    "mileage": number,
    "created_at": string
}

export interface CarInstance {
    "id": string,
    "created_at": string,
    "user_id": string,
    "alias": string,
    "fuelings": Fueling[]
}