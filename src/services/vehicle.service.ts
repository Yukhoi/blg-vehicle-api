import type {
  Vehicle,
  VehiclePartnerA,
  VehiclePartnerB,
} from "../types/vehicle.type";
import { transformPartnerA, transformPartnerB } from "./vehicle.transformer";

export function mergeVehicles(
  vehiclesA: VehiclePartnerA[],
  vehiclesB: VehiclePartnerB[],
): Vehicle[] {
  const transformedPartnerA = vehiclesA
    .map(transformPartnerA)
    .filter((v) => v !== null);
  const transformedPartnerB = vehiclesB
    .map(transformPartnerB)
    .filter((v) => v !== null);

  const vehiclesMapping = new Map<string, Vehicle>();

  for (const vehicle of [...transformedPartnerA, ...transformedPartnerB]) {
    if (!vehiclesMapping.has(vehicle.id)) {
      vehiclesMapping.set(vehicle.id, vehicle);
    } else {
      if (vehicle.price < vehiclesMapping.get(vehicle.id)!.price) {
        vehiclesMapping.set(vehicle.id, vehicle);
      }
    }
  }

  return [...vehiclesMapping.values()].sort((a, b) => a.price - b.price);
}
