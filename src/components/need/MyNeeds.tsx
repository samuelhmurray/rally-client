import React, { useEffect, useState } from "react";
import { MyNeed, User } from "../../data/types";
import { getMyNeeds } from "../../data/needs";

interface Props {
  currentUser: User;
}
interface MyNeeds extends Array<MyNeed> {}

export const MyNeeds: React.FC<Props> = ({currentUser}) => {
  const [myNeeds, setMyNeeds] = useState([]);

  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const data = await getMyNeeds(currentUser.id);
        if(data) {
          setMyNeeds(data);
        }
      } catch (error) {
        console.error("Error fetching needs:", error);
      }
    };

    fetchNeeds();
  }, []);

  return (
    <div>
      <div>Needs of {currentUser.id}<ul>
        {myNeeds.map((need: any) => (
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
      </ul></div>
    </div>
  );
};
