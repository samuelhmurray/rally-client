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
  }, [myNeeds]);

  return (
    <div>
      <div>Needs of {currentUser.first_name} {currentUser.last_name}<ul>
        {myNeeds.map((need: any) => (
          <li key={need.id}>
            <div className="m-10 border-solid border-teal-300">
              <h3>title: {need.title}</h3>
              <div>funds</div>
              <div>materials</div>
              <div>time</div>
            </div>
          </li>
        ))}
      </ul></div>
      
    </div>
  );
};
