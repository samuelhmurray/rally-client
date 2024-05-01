import React, { useEffect, useState } from "react";
import { MyNeed, User, DonorNeed, Donor } from "../../data/types";
import { getMyNeeds, deleteNeed } from "../../data/needs";
import { claimDonor, deleteDonorNeed } from "../../data/donor";

interface Props {
  currentUser: User;
}

interface MyNeeds extends Array<MyNeed> {}

export const MyNeeds: React.FC<Props> = ({ currentUser }) => {
  const [myNeeds, setMyNeeds] = useState<MyNeeds>([]);

  useEffect(() => {
    fetchNeeds();
  }, [currentUser]);

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

  const renderDonorButton = (need: MyNeed, donorType: number) => {
    const donorExists = need.donors.some(
      (donor) => donor.type.id === donorType
    );
    const claimedByCurrentUser =
      donorExists &&
      need.donors.some(
        (donor) =>
          donor.user.id === currentUser.id && donor.type.id === donorType
      );
  
    const donorNeedId = need.donor_needs.find(
      (donorNeed) => donorNeed.donor_type.id === donorType
    )?.id;
  
    if (claimedByCurrentUser) {
      return (
        <button
          className="bg-gray-600 hover:bg-gray-700 text-black font-bold py-2 px-4 rounded"
          onClick={() => handleUnclaim(donorNeedId)}
        >
          Unclaim
        </button>
      );
    } else if (donorExists) {
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
      await claimDonor({
        user_id: currentUser.id,
        need_id: needId,
        donor_type_id: donorType,
      });
      const data = await getMyNeeds(currentUser.id);
      if (data) {
        setMyNeeds(data);
      }
    } catch (error) {
      console.error("Error claiming donor:", error);
    }
  };

  const handleDeleteNeed = async (needId: number) => {
      await deleteNeed(needId);
      const data = await getMyNeeds(currentUser.id);
      if (data) {
        setMyNeeds(data);
      }

  };

  const handleUnclaim = async (donorNeedId: number | undefined) => {
    if (donorNeedId === undefined) {
      console.error("Donor need ID is undefined");
      return;
    }
    try {
      await deleteDonorNeed(donorNeedId);
      const data = await getMyNeeds(currentUser.id);
      if (data) {
        setMyNeeds(data);
      }
    } catch (error) {
      console.error("Error unclaiming donor:", error);
    }
  };
  

  return (
    <div>
      <div>
        Needs of {currentUser.first_name} {currentUser.last_name}
        <ul className="flex ">
          {myNeeds.map((need: MyNeed) => (
            <li key={need.id}>
              <div className="m-10 border-solid border-2 border-black p-10 h-96 w-60 rounded-md">
                <h3 className="font-bold">Title: {need.title}</h3>
                <div>Funds:</div>
                <div>{renderDonorButton(need, 2)}</div>
                <div>Materials:</div>
                <div>{renderDonorButton(need, 3)}</div>
                <div>Time:</div>
                <div>{renderDonorButton(need, 1)}</div>
                <button
                  onClick={() => handleDeleteNeed(need.id)}
                  className="bg-red-600 hover:bg-red-700 text-black font-bold py-2 px-4 rounded mt-5"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
