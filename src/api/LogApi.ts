const BASE_URL = "http://localhost:8000"; // your FastAPI backend URL

export const getLogs = async () => {
  const response = await fetch(`${BASE_URL}/logs`);
  if (!response.ok) throw new Error("Failed to fetch logs");
  return response.json();
};
