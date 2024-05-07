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
export function getNeedByUserAndNeedId(currentUserId:number, needId:number) {
  let url = `needs/${currentUserId}/${needId}`;
  return fetchData(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("authToken")}`,
    },
  });
}

export function getNeedByNeedId(needId:number) {
  let url = `/needId/${needId}`;
  return fetchData(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("authToken")}`,
    },
  });
}

export function deleteNeed(needId: number) {
  let url = `needs/${needId}`;
  return fetchData(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${localStorage.getItem("authToken")}`,
    },
  });
}
export function editNeed(needId: number, updatedNeedData: any) {
  let url = `needs/${needId}`;
  return fetchData(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify(updatedNeedData),
  });
}

export function createNeed(needData:any) {
  let url = "needs";
  return fetchData(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify(needData),
  });
}