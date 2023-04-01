import { React, useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default function Grid() {
  const { id } = useParams();
  const [items, setItems] = useState();
  const url = `http://localhost:3333/api/reports?candidateId=${id}`;
  useEffect(() => {
    const reports = async () => {
      const res = await axios.get(url);
      setItems(res.data);
    };
    reports();
  }, [url]);

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

          {items.map((item) => {
            return (
              <tbody>
                <tr>
                  <td className=" text-center">{item.companyName}</td>
                  <td className=" text-center">
                    {moment(item.interviewDate).format("DD.MM.YYYY")}
                  </td>
                  <td className=" text-center">{item.status}</td>
                  <td className="text-center">
                    <FontAwesomeIcon icon={faEye} />
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </>
    );
  }
}
