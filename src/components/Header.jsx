// import { Link } from "react-router-dom"

export const Header = () => {
    return <nav className="navbar navbar-expand navbar-dark bg-primary d-flex justify-content-around">
        <div className="navbar-nav mr-auto">
            <a href="#" className="text-light mainText">Interviews Reports</a>
            {/* <Link className="text-light mainText to='#' className="nav-Link">
                Interviews Reports
            </Link> */}
        </div>
        <div className="navbar-nav mr-auto">
            <button className="btn btn-outline-light text-light">Candidates</button>
        </div>

    </nav>
}