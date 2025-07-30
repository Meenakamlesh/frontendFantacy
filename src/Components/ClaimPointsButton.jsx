import React, { useContext, useState } from "react";
import {UserContext} from "../context/userContext"

const ClaimPointsButton = ({ userId }) => {
  const { claimPoints } = useContext(UserContext);
  const [claiming, setClaiming] = useState(false);
  const [message, setMessage] = useState("");

  const handleClaim = async () => {
    try {
      setClaiming(true);
      const points = await claimPoints(userId);
      setMessage(`🎉 You claimed ${points} points!`);
    } catch (err) {
      setMessage("❌ Failed to claim points");
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleClaim}
        disabled={claiming}
        className="px-3 py-1 bg-green-600 text-white rounded cursor-pointer"
      >
        {claiming ? "Claiming..." : "Claim Points"}
      </button>
      {message && <div className="mt-2">{message}</div>}
    </div>
  );
};

export default ClaimPointsButton;
