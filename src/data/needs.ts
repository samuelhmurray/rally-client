import { fetchData } from "./fetcher";

export function getNeeds() {
  let url = "needs";
  return fetchData(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("authToken")}`,
    },
  });
}
export function getMyNeeds(currentUserId:any) {
  const userId = currentUserId;
  let url = `needs/${userId}`;
  return fetchData(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("authToken")}`,
    },
  });
}
