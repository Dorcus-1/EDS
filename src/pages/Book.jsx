import React from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import BookTable from "../components/BookTable";

const Book = () => {
  return (
    <div
      style={{ gridTemplateColumns: "300px 1fr", gridTemplateRows: "80px 1fr" }}
      className="grid g h-screen "
    >
      <NavBar />
      <SideBar />
      <BookTable />
    </div>
  );
};
export default Book;
