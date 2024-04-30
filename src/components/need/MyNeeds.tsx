import React, { useEffect, useState } from "react";
import { MyNeed, User } from "../../data/types";
import { getMyNeeds } from "../../data/needs";

interface Props {
  currentUser: User;
}

interface MyNeeds extends Array<MyNeed> {}

export const MyNeeds: React.FC<Props> = ({ currentUser }) => {
  const [myNeeds, setMyNeeds] = useState<MyNeeds>([]);

  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const data = await getMyNeeds(currentUser.id);
        if (data) {
          setMyNeeds(data);
        }
      } catch (error) {
        console.error("Error fetching needs:", error);
      }
    };

    fetchNeeds();
  }, [currentUser.id]);

  const renderDonorButton = (need: MyNeed, donorType: number) => {
    const donorExists = need.donors.some((donor) => donor.type.id === donorType);
    if (donorExists) {
      return <div className="h-6 w-6">✔️</div>;
    } else {
      return <button className="bg-teal-300 hover:bg-teal-500 text-black font-bold py-2 px-4 rounded">Claim</button>;
    }
  };

  return (
    <div>
      <div>
        Needs of {currentUser.first_name} {currentUser.last_name}
        <ul>
          {myNeeds.map((need: MyNeed) => (
            <li key={need.id}>
              <div className="m-10 border-solid border-teal-300">
                <h3>title: {need.title}</h3>
                <div>funds:</div>
                <div>{renderDonorButton(need, 2)}</div>
                <div>materials:</div>
                <div>{renderDonorButton(need, 3)}</div>
                <div>time:</div>
                <div>{renderDonorButton(need, 1)}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
