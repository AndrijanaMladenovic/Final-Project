import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const CardComponent = ({ data }) => {
  const navigate = useNavigate();
  useEffect(() => {}, [data]);

  return (
    <>
      <main className="container-fluid justify-content-center text-center d-flex flex-wrap pt-2">
        {data
          ? data.map((item, index) => {
              return (
                <Card
                  className="col-lg-2 col-md-4 col-sm-7 m-3 border-primary shadow"
                  key={index}
                  style={{ minWidth: "20%" }}>
                  <Card.Img
                    className="pe-4 ps-4 pt-4"
                    variant="top"
                    src={item.avatar}
                    onClick={() => {
                      navigate(`/${item.id}`);
                    }}
                  />
                  <Card.Body>
                    <Card.Title className="">{item.name}</Card.Title>
                    <Card.Text>{item.email}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })
          : ""}
      </main>
    </>
  );
};

export default CardComponent;
