import React from "react";

const Viewer = ({ pdfUrl }) => (
  <iframe
    src={pdfUrl}
    style={{ width: "100%", height: "100vh" }}
    frameBorder="0"
  />
);

export default Viewer;
