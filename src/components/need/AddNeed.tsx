import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { getCommunities } from "../../data/community";
import {useNavigate } from "react-router-dom";
import { createNeed } from "../../data/needs";
import { User } from "../../data/types";

interface Community {
  id: number;
  name: string;
  location: string;
}
interface Props {
  currentUser: User;
}

export const AddNeed: React.FC<Props> = ({ currentUser }) => {
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

  const handleAddNewNeed = async (event: React.FormEvent) => {
    event.preventDefault();
    const needObj = {
      title: selectedTitle,
      description: selectedDescription,
      community: selectedCommunity,
      user: currentUser.id,
    };
    createNeed(needObj)
      .then((res) => {
        navigate(`/mine`);
      })
      .catch((error) => {
        window.alert(`Operation failed: ${error}`);
      });
  };

  return (
    <div className="m-10">
      <div>AddNeed</div>
      <form>
        <div className="mt-5">
          Title:
          <input
          placeholder="title"
          onChange={(event) => {
            setselectedTitle(event.target.value);
          }}/>
        </div>
        <div className="mt-2">
          Description:
          <input 
          placeholder="description"
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
        >
          <option id="0" value={0}>
            Community
          </option>
          {communities.map((community) => (
            <option key={community.id} value={community.id}>
              {community.name} {community.location}
            </option>
          ))}
        </select>
        <div className="mt-2">
        <button onClick={handleAddNewNeed} className="bg-teal-300 hover:bg-teal-500 text-black font-bold py-2 px-4 rounded">
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};
