import React from "react";
import "../App";
import ReactModal from "react-modal";
import { useState } from "react";

function TopNavBar() {
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  const closeHelpModal = () => {
    setHelpModalOpen(false);
  };

  const handleButtonPress = () => {
    setHelpModalOpen(true);
  };

  return (
    <div className="navBar">
      <div className="logo">
        <div className="logoText1">GRID</div>

        <div className="logoGrid">
          <div className="purpleLogoBox"></div>
          <div className="greyLogoBox"></div>
          <div className="greyLogoBox"></div>
          <div className="purpleLogoBox"></div>
        </div>
        <div className="logoText2">LINKER</div>
      </div>
      <button className="helpButton" onClick={handleButtonPress}>
        How to Play
      </button>
      <ReactModal className="endGameStats" isOpen={helpModalOpen}>
        <button className="closeButton" onClick={() => closeHelpModal()}>
          &times;
        </button>
      </ReactModal>
    </div>
  );
}

export default TopNavBar;
