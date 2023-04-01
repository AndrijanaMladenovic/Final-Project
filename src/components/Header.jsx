import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-primary d-flex justify-content-around p-3">
      <div className="navbar-nav mr-auto">
        <Link to="/" className="text-light mainText">
          Interviews Reports
        </Link>
      </div>
      <div>
        <button className="btn btn-outline-light text-light">Candidates</button>
      </div>
    </nav>
  );
};
