import React, { useContext, useEffect, useState } from "react";
import ReportPage, { myContext } from "./ReportPage";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getCompany } from "../service";

export default function Company({
  setSelectedCompany,
  companyName,
  setCompanyName,
}) {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  const [activeCompanyId, setActiveCompanyId] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await getCompany();
      setItems(res.data);
    };
    getData();
  }, []);

  const handleClick = (companyId, name) => {
    setActiveCompanyId(companyId);
    setSelectedCompany(true);
    setCompanyName(name);
  };

  const filteredCompany = items.filter((item) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="search_container">
      <label htmlFor="input-field" className="input-label p-3 d-flex">
        <i className="icon-class ps-2">
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
      <ul className="grid_company align-items-end">
        {items
          ? filteredCompany.map((item) => {
              const isActive = item.id === activeCompanyId;
              return (
                <li
                  onClick={() => {
                    handleClick(item.id, item.name);
                  }}
                  key={item.id}
                  className={`border px-5 ${isActive ? "border-primary" : ""}`}>
                  {item.name}
                </li>
              );
            })
          : ""}{" "}
      </ul>
    </div>
  );
}
