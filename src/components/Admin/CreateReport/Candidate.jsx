import React, { useContext } from "react";
import { myContext } from "./ReportPage";

const Candidate = ({ handleActiveCandidate }) => {
  const { candidateName, candidateId, candidateImg, candidateEmail, active } =
    useContext(myContext);

  return (
    <>
      <li
        key={candidateId}
        className={
          active === true
            ? "border border-primary d-flex p-3 card_select"
            : "d-flex p-3 card_select"
        }
        value={candidateId}
        onClick={() => handleActiveCandidate(candidateId, candidateName)}>
        <img
          className="w-8"
          style={{ width: "90px", height: "90px" }}
          src={candidateImg}
          alt="Candidate Avatar"
        />

        <div>
          <p>{candidateName}</p>
          <p>Email: {candidateEmail}</p>
        </div>
      </li>
    </>
  );
};

export default Candidate;
