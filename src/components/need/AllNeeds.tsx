import React, { useEffect, useState } from "react";
import { getNeeds } from "../../data/needs";

export const AllNeeds = () => {
  const [needs, setNeeds] = useState<any[]>([]);

  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const data = await getNeeds();
        setNeeds(data);
      } catch (error) {
        console.error("Error fetching needs:", error);
      }
    };

    fetchNeeds();
  }, []);

  return (
    <div className="m-5">
      <h2 className="text-5xl font-bold mt-5">ALL NEEDS</h2>
      <ul>
        <div className="flex flex-wrap">
          {needs.map((need: any) => (
            <li key={need.id}>
              <div className="m-10 border-solid border-teal-300">
                <h1>title: {need.title}</h1>
                <p>Description: {need.description}</p>
                <p>Complete: {need.complete ? "Yes" : "No"}</p>
                <p>User: {need.user.username}</p>
                <p>Email: {need.user.email}</p>
                <p>Community: {need.community.name}</p>
                <p>Location: {need.community.location}</p>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};
