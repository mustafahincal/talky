import React from "react";

function Footer() {
  const date: Date = new Date();
  return (
    <div className="text-center bg-gray text-white">
      <div
        className="text-center text-sm p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        Copyright ©️ {date.getFullYear()} mustafahincal. Her Hakkı Saklıdır
      </div>
    </div>
  );
}

export default Footer;
