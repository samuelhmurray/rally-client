import React, { useEffect, useState } from "react";
import { MyNeed, User, DonorNeed, Donor } from "../../data/types";
import { getMyNeeds, deleteNeed } from "../../data/needs";
import { claimDonor, deleteDonorNeed } from "../../data/donor";
import { Link, useNavigate } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  currentUser: User;
}

interface MyNeeds extends Array<MyNeed> {}

export const MyNeeds: React.FC<Props> = ({ currentUser }) => {
  const [myNeeds, setMyNeeds] = useState<MyNeeds>([]);
  const navigate = useNavigate();

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
          className=" bg-zinc-200 hover:bg-zinc-400 text-black font-bold py-2 px-4 rounded"
          onClick={() => handleUnclaim(donorNeedId)}
        >
          Unclaim
        </button>
      );
    } else if (donorExists) {
      return (
        <div className="">
          {" "}
          <FontAwesomeIcon
            icon={faCheck}
            size="2x"
            className="text text-slate-100 ml-6"
          />
        </div>
      );
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
  const handleEditNeed = (needId: number) => {
    navigate(`/need/${needId}`);
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
        <div className="text-5xl font-bold mt-5 ml-5">
          NEEDS CREATED BY: {currentUser.first_name} {currentUser.last_name}
        </div>
        <ul className="flex flex-wrap">
          {myNeeds.map((need: MyNeed) => (
            <li key={need.id}>
              <div
                className="m-5 border-solid border-2 border-black  h-98 w-80 rounded-md shadow-md p-5 bg-gray-100"
                style={{ backgroundColor: "rgba(113, 128, 147, 0.5)" }}
              >
                <div className="flex justify-end">
                  <button
                    onClick={() => handleDeleteNeed(need.id)}
                    className="bg-red-500 hover:bg-red-700 text-black font-bold px-2 rounded"
                  >
                    X
                  </button>
                </div>
                <div>
                  <Link to={`/${need.id}`}>
                    <button className="font-bold text-2xl hover:text-gray-200">{need.title}</button>
                  </Link>
                </div>
                <div className="mt-3">FUNDS</div>
                <div>{renderDonorButton(need, 2)}</div>
                <div className="mt-3">MATERIALS</div>
                <div>{renderDonorButton(need, 3)}</div>
                <div className="mt-3">TIME</div>
                <div>{renderDonorButton(need, 1)}</div>
                <button
                  onClick={() => handleEditNeed(need.id)}
                  className="bg-yellow-300 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded mt-5 "
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
