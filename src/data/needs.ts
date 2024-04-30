import { fetchData } from "./fetcher";

export function getNeeds() {
  let url = "needs";
  return fetchData(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("authToken")}`,
    },
  });
}
export function getMyNeeds(currentUserId:number) {
  const userId = currentUserId;
  let url = `needs/${userId}`;
  return fetchData(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("authToken")}`,
    },
  });
}

export function deleteNeed(needId:number) {
  let url = `needs/${needId}`;
  return fetchData(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${localStorage.getItem("authToken")}`,
    },
  });
}