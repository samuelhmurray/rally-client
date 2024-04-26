import React from "react";
import { User } from "../../data/types";

interface Props {
  currentUser: User;
}

export const MyNeeds: React.FC<Props> = ({currentUser}) => {
  return <div>needs of {currentUser.id}</div>;
};
