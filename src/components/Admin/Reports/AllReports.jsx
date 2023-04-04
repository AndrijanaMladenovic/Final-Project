import React, { useState } from "react";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getPopUp, getReport } from "../service.js";
import Modal from "react-modal";
import { deletePost } from "../service.js";
import { faClose, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function AllReports() {
  const [items, setItem] = useState([]);
  const [item, setItems] = useState();
  const [id, setId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getFetch = async () => {
      const res = await getReport();
      setItem(res.data);
    };
    getFetch();
  }, []);

  const getReports = async () => {
    const data = await getPopUp(id);
    setItems(data);
  };

  useEffect(() => {
    getReports();
  }, [id]);

  const filterCompanyAndCandName = items.filter((name) => {
    return (
      name.candidateName.toLowerCase().includes(query.toLowerCase()) ||
      name.companyName.toLowerCase().includes(query.toLowerCase())
    );
  });
  console.log(items);

  const popUp = (
    candidateName,
    companyName,
    status,
    interviewDate,
    phase,
    note
  ) => {
    setModalContent(
      <>
        <h3 className="name_candidate pb-2">{candidateName}</h3>
        <hr style={{ margin: "0 auto" }} />
        <div className="popUp_container pt-2">
          <div style={{ width: "200px" }}>
            <span>Company</span>
            <h4>{companyName}</h4>
            <span>Interview Date</span>
            <h4>{interviewDate}</h4>
            <span>Phase</span>
            <h4>{phase}</h4>
            <span>Status</span>
            <h4>{status}</h4>
          </div>
          <div style={{ marginLeft: "20%" }}>
            <span>Notes</span>
            <p>{note}</p>
          </div>
        </div>
      </>
    );
    setModalIsOpen(true);
  };

  const handleDelete = (id) => {
    setId(id);

    deletePost(id);
  };

  if (items) {
    return (
      <>
        <label
          htmlFor="input-field"
          className="input-label p-3 d-flex"
          style={{ width: "400px", position: "relative", left: "60%" }}>
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
            placeholder="Search....."
          />
        </label>
        <div className="d-flex flex-column  justify-content-s align-items-center p-3">
          {filterCompanyAndCandName.map((item, index) => {
            return (
              <div
                className="d-flex aligin gap-5 justify-content-center justify-content-around border p-3"
                style={{ width: "800px" }}
                key={index}>
                <div>
                  <h4 className="text-center">{item.companyName}</h4>
                  <h6 className="text-center">Company</h6>
                </div>
                <div>
                  <h4 className="text-center">{item.candidateName}</h4>
                  <h6 className="text-center">Candidate</h6>
                </div>
                <div>
                  <h4 className="text-center">
                    {}
                    {moment(item.interviewDate).format("DD.MM.YYYY")}
                  </h4>
                  <h6 className="text-center">Interview Date</h6>
                </div>
                <div>
                  <FontAwesomeIcon
                    className="p-2"
                    icon={faEye}
                    onClick={() =>
                      popUp(
                        item.candidateName,
                        item.companyName,
                        item.status,
                        moment(item.interviewDate).format("DD.MM.YYYY."),
                        item.phase,
                        item.note
                      )
                    }
                  />
                  <FontAwesomeIcon
                    className="p-2"
                    icon={faTrash}
                    onClick={() => handleDelete(item.id)}
                  />
                </div>
              </div>
            );
          })}

          <Modal
            overlayClassName="overlay"
            className="popup"
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="">
            {modalContent}
            <button className="close_btn" onClick={() => setModalIsOpen(false)}>
              <FontAwesomeIcon className="icon" icon={faClose} />
            </button>
          </Modal>
        </div>
      </>
    );
  } else {
    return "";
  }
}
