import { fetchData } from "./fetcher";

export function getCommunities() {
  let url = "community";
  return fetchData(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("authToken")}`,
    },
  });
}