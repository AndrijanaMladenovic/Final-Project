import "./App.css";
import { Header } from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer } from "./components/Footer";
import Main from "./components/Main";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CandidateReports from "./components/CandidateReports";
import CardComponent from "./components/CardComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/:id" element={<CandidateReports />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
