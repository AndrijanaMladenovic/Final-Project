import { useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const CardComponent = ({ data }) => {
  let navigate = useNavigate();
  const [query, setQuery] = useState("");
  const filteredItems = data.filter((item) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });
  return (
    <>
    <div className="d-flex justify-content-between align-items-center" style={{ padding: '0 7%' }}>
        <div>
          <h1 className="p-3">Candidates</h1>
        </div>
        <div className="p-3 d-flex">
          <span className="input-group-text border-end-0 bg-white rounded-0" id="search-addon">
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)}}
            className="form-control border-start-0 border rounded-0"
            placeholder="Search users"
            aria-label="Search"
            aria-describedby="search-addon"
            
          />
        </div>
      </div>

      <hr style={{ width: '84%', margin: '0 auto' }} />
      
      
      <main className="container-fluid justify-content-center text-center d-flex flex-wrap pt-2">
        {data
          ? filteredItems.map((item, index) => {
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