// const API_URL = 'http://localhost:8000'

// export const fetchData = (resource: string, token: string, options?: any) => fetch(`${API_URL}/${resource}`, options)
//   .then((res) => res.json())


  //need to refactor after auth works
const API_URL = 'http://localhost:8000';

export const fetchData = (resource: string, options?: any) => {
  // Ensure options object is initialized
  options = options || {};

  // Initialize headers object if it doesn't exist
  options.headers = options.headers || {};

  // Add token to the headers if it's provided
  if (options.token) {
    options.headers['Authorization'] = `Bearer ${options.token}`;
    // Remove token property from options object to avoid passing it to fetch
    delete options.token;
  }

  return fetch(`${API_URL}/${resource}`, options)
    .then((res) => res.json());
};
