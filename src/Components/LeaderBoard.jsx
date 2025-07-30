import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import ClaimPointsButton from "./ClaimPointsButton";

const LeaderBoard = () => {
  const { users, loading, error } = useContext(UserContext);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  // Top 3 users
  const top3 = users.slice(0, 3);
  const others = users.slice(3);

  return (
    <div className="bg-gradient-to-b from-yellow-200 to-yellow-400 min-h-screen p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Wealth Ranking</h1>
      <p className="mb-6 text-gray-700">Settlement time: 14 days 01:45:47</p>

    {/* winner names and rankings */}
      <div className="flex justify-center gap-4 mb-8">
        {top3.map((user, index) => (
          <div key={user._id} className="bg-white rounded-xl p-3 w-24 flex flex-col items-center shadow">
            {/* here we can add image as well  */}
            {/* <img
              src="/crown.png" 
              alt="Crown"
              className="w-8 mb-1"
            /> */}
            <div className="font-semibold">{user.name.length > 6 ? user.name.slice(0, 6) + "..." : user.name}</div>
            <div className="text-yellow-600 font-bold text-sm">{user.totalPoints}⭐</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-4 shadow">
        {others.map((user, index) => (
          <div key={user._id} className="flex justify-between items-center border-b py-2 last:border-none">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">{index + 4}</span>
              <div className="font-medium">{user.name}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-600 font-semibold">{user.totalPoints}⭐</span>
              <ClaimPointsButton userId={user._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
