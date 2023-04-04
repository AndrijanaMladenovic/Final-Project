import { useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const CardComponent = ({ data }) => {
  let navigate = useNavigate();

  const [query, setQuery] = useState("");
  const filteredItems = data.filter((item) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });
  return (
    <>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ padding: "0 7%" }}>
        <div>
          <h3 className="p-3">Candidates</h3>
        </div>

        <label htmlFor="input-field" className="input-label p-4 d-flex">
          <i className="icon-class ps-3">
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
      </div>

      <hr style={{ width: "84%", margin: "0 auto" }} />

      <main className="container-fluid justify-content-center text-center d-flex flex-wrap p-4 gap-3">
        {data
          ? filteredItems.map((item, index) => {
              return (
                <Card
                  className="col-lg-2 col-md-4 col-sm-8 col-xs-8 border-primary shadow"
                  key={index}>
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
