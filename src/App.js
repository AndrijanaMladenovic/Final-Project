import "./App.css";
import { Header } from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer } from "./components/Footer";
import Main from "./components/Main";
import { Routes, Route, Navigate } from "react-router-dom";
import CandidateReports from "./components/CandidateReports";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<CandidateReports />} />
        <Route path="main" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
