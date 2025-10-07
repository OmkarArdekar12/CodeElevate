import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getConnections } from "../service/profileApi";
import Loading from "../components/Loading";

const tabOptions = [
  { label: "Followers", key: "followers" },
  { label: "Following", key: "following" },
  { label: "Connections", key: "connections" },
];

const ConnectionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [connections, setConnections] = useState([]);
  const [activeTab, setActiveTab] = useState("followers");

  const fetchConnections = async () => {
    setLoading(true);
    try {
      const data = await getConnections(id);
      const connections = data.connections;
      setFollowers(connections.followers);
      setFollowing(connections.following);
      setConnections(connections.connections);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, [id]);

  const getCurrList = () => {
    if (activeTab === "followers") {
      return followers;
    }
    if (activeTab === "following") {
      return following;
    }
    if (activeTab === "connections") {
      return connections;
    }
    return [];
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full flex items-center justify-center nd:px-5 text-white h-full transition-all duration-300 ease-in-out">
      <div className="w-full md:w-[95%] flex flex-col items-center bg-[#181818] rounded-lg h-full">
        <div className="flex flex-wrap gap-1 md:gap-8 py-6 border-b border-gray-700 w-full justify-center">
          {tabOptions.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              disabled={loading}
              className={`px-4 py-2 font-semibold rounded-t-md border-b-2 transition-colors duration-200 ${
                activeTab === tab.key
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-400 hover:text-blue-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {getCurrList().length === 0 ? (
          <div className="text-gray-500 flex justify-center items-center py-4 h-full">
            No {activeTab} found.
          </div>
        ) : (
          <div className="w-full p-4 bg-[#232323] rounded-b-lg">
            <ul className="space-y-4">
              {getCurrList().map((user, idx) => (
                <li
                  onClick={() => navigate(`/profiles/${user.userId}`)}
                  key={user.userId || idx}
                  className="flex items-center gap-4 p-2 rounded hover:bg-gray-700 cursor-pointer border-b-1 border-gray-800"
                >
                  <img
                    src={user.profilePicture || "/images/defaultUserImage.png"}
                    alt={user.fullName}
                    className="w-12 h-12 rounded-full object-cover border border-gray-600"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">
                      {user.fullName}
                    </span>
                    {user.headLine && (
                      <span className="text-gray-400 text-sm">
                        {user.headLine}
                      </span>
                    )}
                    <span className="text-blue-400 text-sm">
                      @{user.username}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionPage;
