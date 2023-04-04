import React, { useState, createContext } from "react";

import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Candidate from "./Candidate";
import Company from "./Company";
import "./admin.css";
import AllReports from "../Reports/AllReports";
import { getCandidates } from "../../data/data";
import ReportDetail from "./ReportDetail";

export const myContext = React.createContext();
export const fetchContext = createContext({});

const ReportPage = () => {
  const [item, setItem] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [phase, setPhase] = useState(1);
  const [selectedId, setId] = useState(null);
  const [selectedName, setName] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(false);
  const [companyName, setCompanyName] = useState("");

  const [query, setQuery] = useState("");

  useEffect(() => {
    const getFetch = async () => {
      const res = await getCandidates();
      setItem(res.data);
    };
    getFetch();
  }, []);

  const handleActiveCandidate = (id, name) => {
    setActiveId(id === activeId ? null : id);
    setId(id);
    setName(name);
  };

  const filteredName = item.filter((items) => {
    return items.name.toLowerCase().includes(query.toLowerCase());
  });

  const handlePhaseCandidate = () => {
    if (activeId !== null) {
      setPhase(2);
    } else {
      setPhase(1);
    }
  };
  const handlePhaseCompany = () => {
    if (selectedCompany === true) {
      setPhase(3);
    } else {
      setPhase(2);
    }
  };

  if (phase === 1) {
    return (
      <>
        <Container className="d-flex pt-5 justify-content-center">
          <div className="phase_container">
            <div>
              <span>1</span>
              <p className="fw-bold">Select Candidate</p>
            </div>
            <div>
              <span>2</span>
              <p>Select Company</p>
            </div>
            <div>
              <span>3</span>
              <p>Fill Report Details</p>
            </div>
          </div>

          <div className="search_container">
            <label htmlFor="input-field" className="input-label p-3 d-flex">
              <i className="icon-class ps-2">
                <FontAwesomeIcon className="search-icon" icon={faSearch} />
              </i>
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                className="form-control border-start-1 border rounded-0 ps-5"
                placeholder="Search Users"
              />
            </label>
            <ul className="grid_container align-items-end">
              {item &&
                filteredName.map((candidate) => {
                  return (
                    <myContext.Provider
                      key={candidate.id}
                      value={{
                        candidateName: candidate.name,
                        candidateId: candidate.id,
                        candidateImg: candidate.avatar,
                        candidateEmail: candidate.email,
                        active: candidate.id === activeId,
                        handleActiveCandidate: handleActiveCandidate,
                        selectedId: selectedId,
                      }}>
                      <Candidate
                        handleActiveCandidate={handleActiveCandidate}
                      />
                    </myContext.Provider>
                  );
                })}
            </ul>
            <button
              className={
                activeId !== null
                  ? "btn bg-primary btn_next"
                  : " btn bg-danger btn_next"
              }
              onClick={handlePhaseCandidate}>
              Next
            </button>
          </div>
        </Container>
      </>
    );
  } else if (phase === 2) {
    return (
      <>
        <Container className="d-flex pt-5 justify-content-center">
          <div className="phase_container">
            <div>
              <span>1</span>
              <p>Select Candidate</p>
            </div>
            <div>
              <span>2</span>
              <p className="fw-bold">Select Company</p>
            </div>
            <div>
              <span>3</span>
              <p>Fill Report Details</p>
            </div>
            <p>{selectedName}</p>
          </div>
          <Company
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
            companyName={companyName}
            setCompanyName={setCompanyName}
          />
          <div className="btn_company">
            <button
              className="btn bg-secondary btn_select"
              onClick={() => setPhase(1)}>
              Back
            </button>
            <button
              className={
                selectedCompany === true
                  ? "btn bg-primary btn_select"
                  : "btn bg-danger btn_select"
              }
              onClick={handlePhaseCompany}>
              Next
            </button>
          </div>
        </Container>
      </>
    );
  } else if (phase === 3) {
    return (
      <>
        <Container className="d-flex pt-5 justify-content-center">
          <div className="phase_container">
            <div>
              <span>1</span>
              <p>Select Candidate</p>
            </div>
            <div>
              <span>2</span>
              <p>Select Company</p>
            </div>
            <div>
              <span>3</span>
              <p className="fw-bold"> Fill Report Details</p>
            </div>
            <p>{selectedName}</p>
            <p>{companyName}</p>
          </div>

          <ReportDetail
            activeId={activeId}
            selectedName={selectedName}
            companyName={companyName}
            phase={phase}
            setPhase={setPhase}
          />
        </Container>
      </>
    );
  } else if (phase === 4) {
    return <AllReports />;
  }
};

export default ReportPage;
