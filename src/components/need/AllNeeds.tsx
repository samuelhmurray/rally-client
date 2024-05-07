import React, { useEffect, useState } from "react";
import { getNeeds } from "../../data/needs";
import { Link, useNavigate } from "react-router-dom";


export const AllNeeds = () => {
  const [needs, setNeeds] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const data = await getNeeds();
        setNeeds(data);
      } catch (error) {
        console.error("Error fetching needs:", error);
      }
    };

    fetchNeeds();
  }, []);

  return (
    <div className="">
      <h2 className="text-5xl font-bold ml-5 mt-5">ALL NEEDS</h2>
      <ul>
        <div className="ml-5 flex flex-wrap ">
          {needs.map((need: any) => (
            <Link to={`/${need.id}`}>
            <li key={need.id}>
              <div className="w-72 hover:shadow-2xl p-5 mr-5 mt-5 border-solid border-2 border-black rounded-md shadow-md bg-gray-100"                 style={{ backgroundColor: "rgba(113, 128, 147, 0.5)"}}>
                <h1 className="font-bold text-xl">{need.title}</h1>
                <p>COMMUNITY: {need.community.name}</p>
              </div>
            </li>
            </Link>
          ))}
        </div>
      </ul>
    </div>
  );
};
