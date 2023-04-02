import { React, useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router";
import moment from "moment";
import { getPopUp } from "./data/data";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEye } from "@fortawesome/free-solid-svg-icons";
import "./modal.css";

export default function Modals() {
  const { id } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const [items, setItems] = useState();
  const getReports = async () => {
    const data = await getPopUp(id);
    setItems(data);
  };
  useEffect(() => {
    getReports();
  }, [id]);

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

  if (items) {
    return (
      <div className="m-5">
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
                      {moment(item.interviewDate).format("DD.MM.YYYY.")}
                    </td>
                    <td className=" text-center">{item.status}</td>
                    <td className="text-center">
                      <p>
                        <FontAwesomeIcon
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
                      </p>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </Table>
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
    );
  }
}
