import React, { useEffect, useState } from "react";
import "./SystemLog.css";

interface Log {
  id: string;
  date: string;
  category: string;
  message: string;
  username: string;
  ipAddress: string;
}

const SystemLog: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ USERNAME: username }),
    })
      .then((res) => res.json())
      .then((data) => {
        const mappedLogs = (data.logs || []).map((log: any) => ({
          id: log._id || "",
          date: log.timestamp || "",
          category: log.level || "INFO",
          message: log.message || "",
          username: log.username || "",
          ipAddress: log.ip_address || "",
        }));
        setLogs(mappedLogs);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const getCategoryClass = (category: string): string => {
    const classes: any = {
      INFO: "log-category-badge log-category-info",
      WARNING: "log-category-badge log-category-warning",
      ERROR: "log-category-badge log-category-error",
      SUCCESS: "log-category-badge log-category-success",
    };
    return classes[category.toUpperCase()] || "log-category-badge log-category-default";
  };

  if (loading) {
    return (
      <div className="log-container">
        <div className="log-loading-container">
          <p>Loading logs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="log-container">
      <div className="log-header">
        <h3 className="log-title">🧾 System Log</h3>
        <button className="log-button" onClick={() => window.location.reload()}>
          Refresh
        </button>
      </div>

      {logs.length === 0 ? (
        <div className="log-empty-state">
          <p>No logs found.</p>
        </div>
      ) : (
        <div className="log-table-container">
          <table className="log-table">
            <thead>
              <tr>
                <th className="log-th">Date & Time</th>
                <th className="log-th">Level</th>
                <th className="log-th">Username</th>
                <th className="log-th">IP Address</th>
                <th className="log-th">Message</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="log-tr">
                  <td className="log-td">{log.date}</td>
                  <td className="log-td">
                    <span className={getCategoryClass(log.category)}>{log.category}</span>
                  </td>
                  <td className="log-td">{log.username}</td>
                  <td className="log-td">{log.ipAddress}</td>
                  <td className="log-td">{log.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SystemLog;