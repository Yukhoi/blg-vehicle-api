export interface VehiclePartnerA {
  vehicle_id: string;
  brand: string;
  model: string;
  price_eur: string;
  fuel: string;
  available: string;
}

export interface VehiclePartnerB {
  id: string;
  manufacturer: string;
  name: string;
  price: number;
  energy: string;
  inStock: boolean;
}

export interface Vehicle {
  id: string;
  manufacturer: string;
  model: string;
  price: number;
  fuelType: FuelType;
  isAvailable: boolean;
}

export type FuelType = "PETROL" | "DIESEL" | "ELECTRIC" | "HYBRID"