import React, { useEffect, useState } from "react";
import { MyNeed, User } from "../../data/types";
import { getMyNeeds } from "../../data/needs";
import { claimDonor } from "../../data/claimDonor";

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
      return (
        <button
          className="bg-teal-300 hover:bg-teal-500 text-black font-bold py-2 px-4 rounded"
          onClick={() => handleClaim(need.id, donorType)} 
        >
          Claim
        </button>
      );
    }
  };

  const handleClaim = async (needId: number, donorType: number) => {
    try {
      await claimDonor({ user_id: currentUser.id, need_id: needId, donor_type_id: donorType });
      const data = await getMyNeeds(currentUser.id);
      if (data) {
        setMyNeeds(data);
      }
    } catch (error) {
      console.error("Error claiming donor:", error);
    }
  };

  return (
    <div>
      <div>
        Needs of {currentUser.first_name} {currentUser.last_name}
        <ul>
          {myNeeds.map((need: MyNeed) => (
            <li key={need.id}>
              <div className="m-10">
                <h3>title: {need.title}</h3>
                <div>funds:</div>
                <div>{renderDonorButton(need, 2)}</div>
                <div>materials:</div>
                <div>{renderDonorButton(need, 3)}</div>
                <div>time:</div>
                <div>{renderDonorButton(need, 1)}</div>
                <button className="bg-red-600 hover:bg-red-700 text-black font-bold py-2 px-4 rounded mt-5">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
