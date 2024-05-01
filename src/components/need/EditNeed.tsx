import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../data/types";

interface Props {
  currentUser: User;
}
export const EditNeed: React.FC<Props> = ({ currentUser }) => {
  const { needId } = useParams();
  return <div>Edit Need: {needId} User: {currentUser.first_name} {currentUser.last_name}</div>;
};
