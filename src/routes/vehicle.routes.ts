import { count, error } from "node:console";
import type { IncomingMessage, ServerResponse } from "node:http";
import { fetchAllVehicles } from "../services/partner.service";

export async function handleVehicleRoutes(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const url = new URL(req.url ?? "/", "http://localhost");

  if (req.method !== "GET" || url.pathname !== "/vehicles") {
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        error: "Route not found",
      }),
    );
    return;
  }

  const available = url.searchParams.get("available");
  const maxPrice = url.searchParams.get("maxPrice");

  if (available !== null && available !== "true" && available !== "false") {
    res.statusCode = 400;
    res.end(
      JSON.stringify({
        error: "Invalid value for 'available' parameter",
      }),
    );
    return;
  }

  if (maxPrice !== null) {
    const price = Number(maxPrice);

    if (maxPrice.trim() === "" || !Number.isFinite(price) || price < 0) {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          error: "Invalid value for 'maxPrice' parameter",
        }),
      );
      return;
    }
  }

  try {
    const mockVehicles = [
      {
        id: "1",
        manufacturer: "BMW",
        model: "320d",
        price: 25000,
        fuelType: "DIESEL",
        isAvailable: true,
      },
      {
        id: "2",
        manufacturer: "Tesla",
        model: "Model 3",
        price: 35000,
        fuelType: "ELECTRIC",
        isAvailable: true,
      },
      {
        id: "3",
        manufacturer: "Peugeot",
        model: "208",
        price: 15000,
        fuelType: "PETROL",
        isAvailable: false,
      },
    ];

    const vehicles = mockVehicles;

    const filtered = vehicles.filter((vehicle) => {
      if (
        available !== null &&
        vehicle.isAvailable !== (available === "true")
      ) {
        return false;
      }

      if (maxPrice !== null && vehicle.price > Number(maxPrice)) {
        return false;
      }

      return true;
    });

    console.log(filtered);

    res.statusCode = 200;
    res.end(JSON.stringify({ count: filtered.length, vehicles: filtered }));
  } catch (err) {
    console.error("Server error:", err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
}
