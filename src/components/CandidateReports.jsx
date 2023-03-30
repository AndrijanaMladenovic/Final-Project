import React from "react";
import { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import moment from "moment";
import { useParams } from "react-router";
import Container from "react-bootstrap/Container";
import { getCandidateReport } from "./data/data";

export default function CandidateReports() {
  const { id } = useParams();
  const [items, setItems] = useState();

  useEffect(async () => {
    const data = await getCandidateReport(id);
    setItems(data);
  }, [id]);

  if (items) {
    return (
      <>
        <Container className="container">
          <Image style={{ width: "18rem" }} fluid src={items.avatar}></Image>
          <div className="first_row ">
            <div className="name">
              <span>Name:</span>
              <p>{items.name}</p>
            </div>
            <div className="birth">
              <span> Email :</span>
              <p>{items.email}</p>
            </div>
          </div>
          <div className="first_row">
            <div className="name">
              <span>Date of birth:</span>
              <p>{moment(items.birthday).format("MM-DD-YYYY")}</p>
            </div>
            <div className="birth">
              <span> Education</span>
              <p>{items.education}</p>
            </div>
          </div>
        </Container>
      </>
    );
  }
}
