import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../data/types";
import { editNeed, getNeedById } from "../../data/needs";
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
      const response = await getNeedById(currentUser?.id, +needId);
      setNeed(response);
      setSelectedCommunity(+response?.community?.id)
      setselectedDescription(response.description)
      setselectedTitle(response.title)
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
        <div className="m-10">
          Edit Need: {need.id} User: {currentUser.first_name}{" "}
          {currentUser.last_name}
          <form>
            <div className="mt-5">
              Title:
              <input
                value={selectedTitle || need.title}
                onChange={(event) => {
                  setselectedTitle(event.target.value);
                }}
              />
            </div>
            <div className="mt-2">
              Description:
              <input
                value={selectedDescription || need.description}
                onChange={(event) => {
                  setselectedDescription(event.target.value);
                }}
              />
            </div>
            <select
              className="mt-2"
              name="community"
              onChange={(event) => {
                setSelectedCommunity(+event.target.value);
              }}
              value={selectedCommunity}
            >
              <option value={0}>{need?.community?.name} {need?.community?.location}</option>
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
                Submit
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
