import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getConnections } from "../service/profileApi";

const ConnectionPage = () => {
  const { id } = useParams();
  const fetchConnections = async () => {
    try {
      const data = await getConnections(id);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  fetchConnections();
  return <div>ConnectionPage</div>;
};

export default ConnectionPage;
