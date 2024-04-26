import { fetchData } from "./fetcher";

export function login(user: any) {
  return fetchData("login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
}
