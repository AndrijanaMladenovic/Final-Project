import "./App.css";
import { Header } from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer } from "./components/Footer";
import Main from "./components/Main";
import { Routes, Route } from "react-router-dom";
import CandidateReports from "./components/CandidateReports";
import Modals from "./components/Modals";
import Modal from "react-modal";
import ReportPage from "./components/Admin/CreateReport/ReportPage";
import React from "react";
import AllReports from "./components/Admin/Reports/AllReports";
import HeaderForReports from "./components/Admin/Reports/HeaderForReports";
Modal.setAppElement("#root");

function App() {
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <>
              <Header />
              <Main />
              <Footer />
            </>
          }
        />
        <Route
          path="/:id"
          element={
            <>
              <Header /> <CandidateReports /> <Modals /> <Footer />
            </>
          }
        />
        <Route
          path="/reports"
          element={
            <>
              <HeaderForReports />
              <AllReports />
            </>
          }
        />
        <Route
          path="/reports/create"
          element={
            <>
              <HeaderForReports />
              <ReportPage />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
