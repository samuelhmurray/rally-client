import { fetchData } from "./fetcher";

export function claimDonor(data: {
  user_id: number;
  need_id: number;
  donor_type_id: number;
}) {
  const url = "donors/claim/";
  return fetchData(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify(data),
  });
}

export function deleteDonorNeed(donor_need_id: number) {
  const url = `donor-need/${donor_need_id}`;
  return fetchData(url, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("authToken")}`,
    },
  });
}
