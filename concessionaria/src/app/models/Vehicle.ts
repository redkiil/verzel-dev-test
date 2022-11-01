export interface Vehicle {
    id: number;
    model: string;
    brand: string;
    year: number;
    hodometer: number;
    price: number;
    color: string;
    doors: number;
    location: string;
    description: string;
    photo: string;
    userId: number;
    user?: any;
}