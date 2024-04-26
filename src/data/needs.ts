import { fetchData } from "./fetcher";
import { getCurrentUserId } from "./user";

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
