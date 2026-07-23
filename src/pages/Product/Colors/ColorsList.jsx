import React, { useState } from "react";
import { createPortal } from "react-dom";
import useTable from "../../../layouts/Table/useTable.jsx";

const staticColors = [
  { id: 1, name: "Maroon", code: "#800000", status: "Inactive" },
  { id: 2, name: "Olive", code: "#808000", status: "Inactive" },
  { id: 3, name: "Teal", code: "#008080", status: "Inactive" },
  { id: 4, name: "Mustard", code: "#E1AD01", status: "Inactive" },
  { id: 5, name: "Lavender", code: "#E6E6FA", status: "Inactive" },
  { id: 6, name: "Sky Blue", code: "#87CEEB", status: "Inactive" },
  { id: 7, name: "Peach", code: "#FFDAB9", status: "Inactive" },
  { id: 8, name: "Mint Green", code: "#98FF98", status: "Inactive" },
  { id: 9, name: "Charcoal", code: "#36454F", status: "Inactive" },
  { id: 10, name: "Beige", code: "#F5F5DC", status: "Inactive" },
];

const ColorList = () => {
  const [data, setData] = useState(staticColors);
  const [showModal, setShowModal] = useState(false);
  const [rows, setRows] = useState([{ name: "", code: "" }]);

  const {
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
  } = useTable(data, 10);

  const activateStatus = (id) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Active" } : item,
      ),
    );
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const openModal = () => {
    setRows([{ name: "", code: "" }]);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleRowChange = (index, field, value) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );
  };

  const addRow = () => {
    setRows((prev) => [...prev, { name: "", code: "" }]);
  };

  const removeRow = (index) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const newColors = rows
      .filter((row) => row.name.trim() !== "" && row.code.trim() !== "")
      .map((row, i) => ({
        id: Date.now() + i,
        name: row.name,
        code: row.code,
        status: "Inactive",
      }));

    setData((prev) => [...prev, ...newColors]);
    setShowModal(false);
  };

  return (
    <div className="container-fluid px-0">
      <div className="page-header-bar mb-3">
        <h4>Colors</h4>
        <button className="listbtn" onClick={openModal}>
          <i className="fas fa-plus"></i> Add Color
        </button>
      </div>

      <div className="list-table">
        <div className="filter-container mb-2">
          <div className="filter-container-start">
            <input
              type="text"
              placeholder="Search ..."
              className="form-control"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Name</th>
                <th>Code</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{(currentPage - 1) * 10 + index + 1}</td>
                    <td>{item.name || "-"}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span
                          className="color-swatch"
                          style={{ backgroundColor: item.code }}
                        ></span>
                        {item.code}
                      </div>
                    </td>
                    <td>{item.status}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2 action-icons">
                        <span
                          className="icon-only status-toggle"
                          title="Set Active"
                          onClick={() => activateStatus(item.id)}
                        >
                          <i className="fas fa-check"></i>
                        </span>
                        <span
                          className="icon-only delete-icon"
                          title="Delete"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No matching records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="paginate-div mt-3">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="d-flex gap-2">
            <button
              className="paginatebtn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </button>
            <button
              className="paginatebtn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {showModal &&
        createPortal(
          <div className="colors-modal-overlay">
            <div className="colors-modal-box">
              <div className="colors-modal-header">
                <h5>Add Color</h5>
                <span className="colors-modal-close" onClick={closeModal}>
                  <i className="fas fa-times"></i>
                </span>
              </div>

              <div className="colors-modal-body">
                <div className="colors-row-labels">
                  <span>Name</span>
                  <span>Code</span>
                </div>

                {rows.map((row, index) => (
                  <div className="colors-row" key={index}>
                    <input
                      type="text"
                      placeholder="Name"
                      className="form-control"
                      value={row.name}
                      onChange={(e) =>
                        handleRowChange(index, "name", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Code"
                      className="form-control"
                      value={row.code}
                      onChange={(e) =>
                        handleRowChange(index, "code", e.target.value)
                      }
                    />
                    {rows.length > 1 && (
                      <span
                        className="icon-only delete-icon"
                        onClick={() => removeRow(index)}
                      >
                        <i className="fas fa-trash"></i>
                      </span>
                    )}
                    {index === rows.length - 1 && (
                      <span className="colors-add-row-btn" onClick={addRow}>
                        <i className="fas fa-plus"></i>
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="colors-modal-footer">
                <button className="colors-save-btn" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default ColorList;
