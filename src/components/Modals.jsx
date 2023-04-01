import { React, useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router";
import moment from "moment";

import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEye } from "@fortawesome/free-solid-svg-icons";
import "./modal.css";

export default function Modals() {
  const { id } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const [items, setItems] = useState();
  const url = `http://localhost:3333/api/reports?candidateId=${id}`;
  useEffect(() => {
    const reports = async () => {
      const res = await axios.get(url);
      setItems(res.data);
    };
    reports();
  }, [url]);

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
        <h1 className="name_candidate">{candidateName}</h1>
        <div className="popUp_container">
          <div>
            <span>Company</span>
            <h1>{companyName}</h1>
            <span>Interviw date</span>
            <h1>{interviewDate}</h1>
            <span>Phase</span>
            <h2>{phase}</h2>
            <span>Status</span>
            <h2>{status}</h2>
          </div>
          <div>
            <h2>{note}</h2>
          </div>
        </div>
      </>
    );
    setModalIsOpen(true);
  };
  console.log(items);

  if (items) {
    return (
      <>
        <Table striped bordered hover variant="primary">
          <thead>
            <tr>
              <th className=" text-center">Company</th>
              <th className=" text-center">Interview Date</th>
              <th className=" text-center" colSpan={2}>
                Status
              </th>
            </tr>
          </thead>

          {items.map((item, index) => {
            return (
              <>
                <tbody>
                  <tr key={index}>
                    <td className=" text-center">{item.companyName}</td>
                    <td className=" text-center">
                      {moment(item.interviewDate).format("DD.MM.YYYY")}
                    </td>
                    <td className=" text-center">{item.status}</td>
                    <td className="text-center">
                      <p value={index} itemID={index}>
                        <FontAwesomeIcon
                          icon={faEye}
                          onClick={() =>
                            popUp(
                              item.candidateName,
                              item.companyName,
                              item.status,
                              moment(item.interviewDate).format("DD.MM.YYYY"),
                              item.phase,
                              item.note
                            )
                          }
                        />
                      </p>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </Table>
        <Modal
          className="popup"
          style={{ background: "red" }}
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="">
          {modalContent}
          <button className="close_btn" onClick={() => setModalIsOpen(false)}>
            <FontAwesomeIcon className="icon" icon={faClose} />
          </button>
        </Modal>
      </>
    );
  }
}
