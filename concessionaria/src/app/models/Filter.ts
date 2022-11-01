export interface Filter {
    maxHodometer: number;
    vehicles: { [key: string]: string[]},
    location: string[];
    doors: number[];
    max: number,
    min: number
}
