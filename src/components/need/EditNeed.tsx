import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../data/types";
import { editNeed, getNeedByUserAndNeedId } from "../../data/needs";
import { getCommunities } from "../../data/community";

interface Community {
  id: number;
  name: string;
  location: string;
}
interface Props {
  currentUser: User;
}

export const EditNeed: React.FC<Props> = ({ currentUser }) => {
  const { needId } = useParams();
  const [need, setNeed] = useState<any>(null);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState(Number);
  const [selectedDescription, setselectedDescription] = useState("");
  const [selectedTitle, setselectedTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommunities = async () => {
      const communities = await getCommunities();
      setCommunities(communities);
    };
    fetchCommunities();
  }, []);

  useEffect(() => {
    if (!needId) return;

    if (!currentUser) return;

    const fetchNeed = async () => {
      const response = await getNeedByUserAndNeedId(currentUser?.id, +needId);
      setNeed(response);
      setSelectedCommunity(+response?.community?.id);
      setselectedDescription(response.description);
      setselectedTitle(response.title);
    };
    fetchNeed();
  }, [currentUser.id, needId]);

  const handEditNeed = async (event: any) => {
    event.preventDefault();
    if (!needId || isNaN(+needId)) {
      console.error("Invalid need ID");
      return;
    }

    const needObj = {
      title: selectedTitle,
      description: selectedDescription,
      community: selectedCommunity,
    };

    editNeed(+needId, needObj).then((res) => {
      navigate(`/mine`);
    });
  };

  return (
    <div>
      {need ? (
        <div className="m-5">
          <div className="text-5xl font-bold mt-5">EDIT NEED</div>
          <form>
            <div className="mt-5">
              <input
                className="font-bold w-96 px-4 py-4  rounded-md"
                value={selectedTitle || need.title}
                onChange={(event) => {
                  setselectedTitle(event.target.value);
                }}
              />
            </div>
            <div className="mt-2">
              <textarea
                className="px-4 py-2 w-96 h-40 mr-10 rounded-md"
                value={selectedDescription || need.description}
                onChange={(event) => {
                  setselectedDescription(event.target.value);
                }}
              />
            </div>
            <select
              className=" p-4 w-96 rounded-md"
              name="community"
              onChange={(event) => {
                setSelectedCommunity(+event.target.value);
              }}
              value={selectedCommunity}
            >
              <option value={0}>
                {need?.community?.name} {need?.community?.location}
              </option>
              {communities.map((community) => (
                <option key={community.id} value={community.id}>
                  {community.name} {community.location}
                </option>
              ))}
            </select>

            <div className="mt-2">
              <button
                onClick={handEditNeed}
                className="bg-teal-300 hover:bg-teal-500 text-black font-bold py-2 px-4 rounded"
              >
                SUBMIT
              </button>
            </div>
          </form>{" "}
        </div>
      ) : (
        <div>Need not found</div>
      )}
    </div>
  );
};
