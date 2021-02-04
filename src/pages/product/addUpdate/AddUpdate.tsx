import React from "react";
import { useParams } from "react-router-dom";

interface RouteParams {
  id: string;
}

const AddUpdatePage: React.FC = () => {
  const match = useParams<RouteParams>();
  console.log(match.id);

  return <div>AddUpdate</div>;
};

export default AddUpdatePage;
