import { fetchData } from "./fetcher";

export async function getCurrentUserId(): Promise<string | null> {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    console.error("Authentication token not found in local storage");
    return null;
  }

  try {
    const response = await fetchData("/user", {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });
    return response.user_id;
  } catch (error) {
    console.error("Error fetching user ID:", error);
    return null;
  }
}
