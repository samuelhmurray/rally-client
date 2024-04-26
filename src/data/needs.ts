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
export function getMyNeeds() {
  const userId = getCurrentUserId();
  let url = `needs?userId=${userId}`;
  return fetchData(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("authToken")}`,
    },
  });
}
