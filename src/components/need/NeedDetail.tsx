import React, { useEffect, useState } from "react";
import { User, MyNeed } from "../../data/types";
import { useNavigate, useParams } from "react-router-dom";
import { deleteNeed, getMyNeeds, getNeedByNeedId } from "../../data/needs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { claimDonor, deleteDonorNeed } from "../../data/donor";

interface Props {
  currentUser: User;
}
interface MyNeeds extends Array<MyNeed> {}


export const NeedDetail: React.FC<Props> = ({ currentUser }) => {
  const { needId } = useParams<{ needId: string }>();
  const [need, setNeed] = useState<MyNeed | null>(null);
  const navigate = useNavigate();
  const [myNeeds, setMyNeeds] = useState<MyNeeds>([]);


  useEffect(() => {
    const fetchNeed = async () => {
      if (!needId || !currentUser) return;

      try {
        const response = await getNeedByNeedId(+needId);
        setNeed(response);
      } catch (error) {
        console.error("Error fetching need:", error);
      }
    };

    fetchNeed();
  }, [currentUser, needId]);

  
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

  if (!need) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="text-5xl font-bold justify-center flex mt-5">
        {need.title}
      </div>
      <div>
        <div
          className="text-2xl m-5 border-solid border-2 border-black rounded-md shadow-md p-5 bg-gray-100"
          style={{ backgroundColor: "rgba(113, 128, 147, 0.7)" }}
        >
          {need.description}
        </div>
        <div className="mt-3">FUNDS</div>
                <div>{renderDonorButton(need, 2)}</div>
                <div className="mt-3">MATERIALS</div>
                <div>{renderDonorButton(need, 3)}</div>
                <div className="mt-3">TIME</div>
                <div>{renderDonorButton(need, 1)}</div>
                
      </div>
    </div>
  );
};
