const API_URL = "http://localhost:8000";

export const fetchData = (resource: string, options: any) => {
  return fetch(`${API_URL}/${resource}`, options).then((res) => {
    if (options.method === 'DELETE') {
      // No need to parse JSON for DELETE requests
      return res;
    } else {
      return res.json();
    }
  });
};
