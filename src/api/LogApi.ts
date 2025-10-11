const BASE_URL = "https://symmetrical-waddle-r4gr4q6qjwxwfqp9-5000.app.github.dev/";

export const getLogs = async () => {
  const response = await fetch(`${BASE_URL}/logs`);
  if (!response.ok) throw new Error("Failed to fetch logs");
  return response.json();
};

export const createLog = async (log: { category: string; message: string }) => {
  const response = await fetch(`${BASE_URL}/logs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(log),
  });
  if (!response.ok) throw new Error("Failed to add log");
  return response.json();
};
