import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postDetail } from "../service";
import axios from "axios";
import { useEffect } from "react";

export default function ReportDetail({
  activeId,
  selectedName,
  companyName,
  phase,
  setPhase,
}) {
  let navigate = useNavigate();
  const [formState, setFormState] = useState({
    interviewDate: "",
    phase: "",
    status: "",
    notes: "",
    interviewDateError: "",
  });

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const today = new Date();

    if (selectedDate > today) {
      setFormState({
        ...formState,
        interviewDateError: "Izabrani datum ne može biti u budućnosti.",
      });
    } else {
      setFormState({
        ...formState,
        interviewDateError: "",
        interviewDate: event.target.value,
      });
    }
  };

  const handlePhaseChange = (event) => {
    setFormState({ ...formState, phase: event.target.value });
  };

  const handleStatusChange = (event) => {
    setFormState({ ...formState, status: event.target.value });
  };

  const handleNotesChange = (event) => {
    setFormState({ ...formState, notes: event.target.value });
  };
  const handlePhaseSubmit = () => {
    if (
      formState.interviewDate === "" ||
      formState.phase === "" ||
      formState.status === "" ||
      formState.notes === ""
    ) {
      alert("Please fill in all fields before submitting.");
    } else {
      navigate("/");
      submitData();
    }
  };

  const submitData = () => {
    const { interviewDate, phase, status, notes } = formState;
    const data = {
      candidateId: activeId,
      candidateName: selectedName,
      interviewDate: interviewDate,
      companyName: companyName,
      phase: phase,
      status: status,
      note: notes,
    };
    postDetail(data);
  };

  return (
    <>
      <div className="form_container">
        <div className="form">
          <div className="form_flex">
            <span>interviewDate</span>
            <input
              type="date"
              value={formState.interviewDate}
              onChange={handleDateChange}
            />
            {formState.interviewDateError && (
              <p className="text-danger">{formState.interviewDateError}</p>
            )}
          </div>
          <div className="form_flex">
            <span>Phase</span>
            <select
              className="custom-select"
              value={formState.phase}
              onChange={handlePhaseChange}>
              <option value="">Open this select menu</option>
              <option value="cv">cv</option>
              <option value="hr">hr</option>
              <option value="tech">tech</option>
              <option value="final">final</option>
            </select>
            {formState.phase === "" && (
              <p className="text-danger">Please select a phase</p>
            )}
          </div>
          <div className="form_flex">
            <span>Status:</span>
            <select
              className="custom-select"
              value={formState.status}
              onChange={handleStatusChange}>
              <option value="">Select</option>
              <option value="cv">passed</option>
              <option value="hr">declined</option>
            </select>
            {formState.status === "" && (
              <p className="text-danger">Please select a status</p>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-center form_flex">
          <span className="px-3">Notes:</span>
          <textarea
            value={formState.notes}
            onChange={handleNotesChange}
            className="notes"
            style={{ height: "200px", width: "400px" }}></textarea>
          {formState.notes === "" && (
            <p className="text-danger">Please select a notes</p>
          )}
        </div>
      </div>
      <div className="d-flex flex-column">
        <button
          className="btn bg-secondary btn_next"
          onClick={() => setPhase(2)}>
          Back
        </button>
        <button
          className={`btn ${
            formState.interviewDate === "" ||
            formState.phase === "" ||
            formState.status === "" ||
            formState.notes === ""
              ? "bg-secondary disabled btn_submit"
              : "bg-primary btn_submit"
          }`}
          onClick={handlePhaseSubmit}>
          Submit
        </button>
      </div>
    </>
  );
}
