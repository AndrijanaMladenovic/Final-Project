import React from "react";
import { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import moment from "moment";
import { useParams } from "react-router";
import Container from "react-bootstrap/Container";
import { getCandidateReport } from "./data/data";
import "./reports.css";

export default function CandidateReports() {
  const { id } = useParams();
  const [items, setItems] = useState();

  const getData = async () => {
    const data = await getCandidateReport(id);
    setItems(data);
  };
  useEffect(() => {
    getData();
  }, [id]);

  if (items) {
    return (
      <>
        <Container className="container d-flex int-report align-items-center justify-content-center mt-5 gap-3">
          <Image style={{ width: "15rem" }} fluid src={items.avatar} className="reports-image"></Image>
          <div className="report-center p-2">
            <div className="name">
              <span>Name:</span>
              <p className="p-candidates">{items.name}</p>
            </div>
            <div className="birth">
              <span> Email:</span>
              <p className="p-candidates">{items.email}</p>
            </div>
          </div>
          <div className="report-center p-2">
            <div className="name">
              <span>Date of birth:</span>
              <p className="p-candidates">
                {moment(items.birthday).format("MM.DD.YYYY.")}
              </p>
            </div>
            <div className="birth">
              <span> Education:</span>
              <p className="p-candidates">{items.education}</p>
            </div>
          </div>
        </Container>
      </>
    );
  } else {
    return "";
  }
}
