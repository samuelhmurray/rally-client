const API_URL = "http://localhost:8000";

export const fetchData = (resource: string, options: any) =>
  fetch(`${API_URL}/${resource}`, options).then((res) => res.json());
