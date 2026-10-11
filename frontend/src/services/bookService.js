const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path) {
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await fetch(`${API_URL}${path}`, { headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}

export function getBooks() { return request("/books"); }
