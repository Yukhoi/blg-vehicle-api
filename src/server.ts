import { createServer } from "node:http";
import { handleVehicleRoutes } from "./routes/vehicle.routes";

const server = createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  res.setHeader("Content-Type", "application/json");

  try {
    await handleVehicleRoutes(req, res);
  } catch (error) {
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: "Internal Server Error",
        }),
      );
    } else {
      res.destroy(error instanceof Error ? error : undefined);
    }
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
