import type { Vehicle, VehiclePartnerA, VehiclePartnerB } from "../types/vehicle.type";
import { mergeVehicles } from "./vehicle.service";

const PARTNER_A_URL =
  "https://partner-a.example.com/api/vehicles";

const PARTNER_B_URL =
  "https://partner-b.example.com/api/vehicles";

async function fetchFromPartner<T>(url: string): Promise<T[]> {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch from ${url}: HTTP ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error(`Expected array from ${url}, got ${typeof data}`);
  }

  return data;
}

export async function fetchAllVehicles(): Promise<Vehicle[]> {
  const [responsePartnerA, responsePartnerB] = await Promise.allSettled(
    [
      fetchFromPartner<VehiclePartnerA>(PARTNER_A_URL),
      fetchFromPartner<VehiclePartnerB>(PARTNER_B_URL)
    ]
  );

  let vehiclesA: VehiclePartnerA[] = [];
  let vehiclesB: VehiclePartnerB[] = [];

  if (responsePartnerA.status === "fulfilled") {
    vehiclesA = responsePartnerA.value;
  } else {
    console.error("Failed to fetch vehicles from Partner A");
  }

  if (responsePartnerB.status === "fulfilled") {
    vehiclesB = responsePartnerB.value;
  } else {
    console.error("Failed to fetch vehicles from Partner B");
  }

  return mergeVehicles(vehiclesA, vehiclesB);
} 