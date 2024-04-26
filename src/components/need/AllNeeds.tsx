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
    <div>
      <h2 className="ml-10 mt-10 font-bold">All Needs</h2>
      <ul>
        {needs.map((need: any) => (
          <li key={need.id}>
            <div className="m-10 border-solid border-teal-300">
              <h3>Description: {need.description}</h3>
              <p>Date Posted: {need.date_posted}</p>
              <p>Complete: {need.complete ? "Yes" : "No"}</p>
              <p>User: {need.user.username}</p>
              <p>Email: {need.user.email}</p>
              <p>Community: {need.community.name}</p>
              <p>Location: {need.community.location}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};