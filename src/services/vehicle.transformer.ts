import type {
  VehiclePartnerA,
  VehiclePartnerB,
  Vehicle,
  FuelType,
} from "../types/vehicle.type";

export function transformPartnerA(vehicle: VehiclePartnerA): Vehicle | null {
  const id = vehicle.vehicle_id.trim();

  if (!id) {
    return null;
  }

  const manufacturer = vehicle.brand.trim().toUpperCase();

  const price = Number(vehicle.price_eur.trim());

  if (!Number.isFinite(price) || price < 0) {
    return null;
  }

  const fuelMapping: Record<string, FuelType> = {
    ESS: "PETROL",
    DSL: "DIESEL",
    ELEC: "ELECTRIC",
    HYB: "HYBRID",
  };

  const fuelType = fuelMapping[vehicle.fuel.trim()];

  if (!fuelType) {
    return null;
  }

  if (vehicle.available.trim() !== "yes" && vehicle.available.trim() !== "no") {
    return null;
  }

  const isAvailable = vehicle.available.trim() === "yes";

  return {
    id,
    manufacturer,
    price,
    fuelType,
    isAvailable,
    model: vehicle.model.trim(),
  };
}

export function transformPartnerB(vehicle: VehiclePartnerB): Vehicle | null {
  const id = vehicle.id.trim();

  if (!id) {
    return null;
  }

  const manufacturer = vehicle.manufacturer.trim().toUpperCase();

  const price = vehicle.price;

  if (Number.isFinite(price) || price < 0) {
    return null;
  }

  return {
    id,
    manufacturer,
    model: vehicle.name.trim(),
    price,
    fuelType: vehicle.energy.trim() as FuelType,
    isAvailable: vehicle.inStock
  }
}
