import { React, useState, useEffect } from "react";
import CardComponent from "../components/CardComponent";
import { getCandidates } from "./data/data";

const Main = () => {
  const [item, setItem] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await getCandidates();
      setItem(res.data);
    };
    getData();
  }, []);

  return <div>{!item ? <p>not found</p> : <CardComponent data={item} />}</div>;
};

export default Main;
