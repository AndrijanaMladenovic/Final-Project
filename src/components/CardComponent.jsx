import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";


const CardComponent = ({ data }) => {
  let navigate = useNavigate();

  return (
    <main className="container-fluid justify-content-center text-center d-flex flex-wrap pt-2">
      <Card
        className="col-lg-2 col-md-4 col-sm-7 m-3 border-primary shadow"
        style={{ minWidth: "20%" }}>
        <Card.Img
          className="pe-4 ps-4 pt-4"
          variant="top"
          onClick={() => {
            navigate(`/${item.id}`);
          }}
        />
        <Card.Body>
          <Card.Title className="">name</Card.Title>
          <Card.Text>email</Card.Text>
        </Card.Body>
      </Card>
    </main>
  );
};

export default CardComponent;
