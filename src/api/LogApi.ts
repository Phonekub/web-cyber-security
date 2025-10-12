// src/api/LogApi.ts
const BASE_URL = "http://localhost:5000"; // Flask backend base URL

export interface Log {
  id: string;
  date: string;
  category: string;
  message: string;
  username: string;
  ipAddress: string;
}
/**
 * Fetch logs for a specific user
*/
export async function getLogs(username: string): Promise<Log[]> {
  const response = await fetch(`${BASE_URL}/logs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ USERNAME: username }),
  });

  const data = await response.json();
  return data.logs || [];
}


/**
 * Add a new log (optional, for when you want to record actions)
 */
export async function createLog(log: Log): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(log),
    });

    if (!response.ok) {
      throw new Error(`Failed to create log: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error creating log:", error);
    throw error;
  }
}
