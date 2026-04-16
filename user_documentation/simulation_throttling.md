# Simulation Throttling and Limits

To ensure fair usage and system stability, simulation requests are throttled based on both the number of simulations and the number of tiles processed.

### Hourly Simulation Limits

- **Per-user Limits:**  
  - simulation per hour = 30  
  - geoprocessings per hour = 10 
  - quicksims per hour = 30
- **Per-User Customization:**  
  - Per-user customization can be done by MapCraft using simulationsHourlyLimit, geoprocessingHourlyLimit, and quicksimHourlyLimit.
- **Enforcement:**  
  - The sum of simulations run in the past hour and the number of simulations in the current batch **must not exceed** the user's `simulationsHourlyLimit`.

### Tile-Based Throttling

- **Tile Counting:**  
  - Each simulation counts the number of tiles in its input data.
  - For throttling, a single simulation cannot count for more than 100 tiles, even if it processes more.
- **Concurrent Tile Limits:**  
  - **App-initiated simulations:** Up to 300 tiles can be processed concurrently.
  - **API-initiated simulations:** Up to 600 tiles can be processed concurrently.
  - **Per-user limit:** Each user can run up to 300 tiles concurrently.

#### Example

- If a project requires **150 tiles**, a user can run **3 simulations concurrently** (since each simulation is capped at 100 tiles for throttling).
- If a project requires **50 tiles**, a user can run **6 simulations concurrently** (6 × 50 = 300 tiles).

These rules ensure that no single user or project can monopolize system resources, maintaining performance and availability for all users.
