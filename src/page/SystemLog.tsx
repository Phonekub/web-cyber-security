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
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 30;

  useEffect(() => {
    const username = localStorage.getItem("username");
    console.log("📌 Username from localStorage:", username);
    
    if (!username) {
      console.error("❌ No username found");
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ USERNAME: username }),
    })
      .then((res) => {
        console.log("📡 Response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("📦 Raw data from API:", data);
        console.log("📊 Number of logs:", data.logs?.length || 0);
        
        const mappedLogs = (data.logs || []).map((log: any) => ({
          id: log._id || "",
          date: log.timestamp || "",
          category: log.level || "INFO",
          message: log.message || "",
          username: log.username || "",
          ipAddress: log.ip_address || "",
        }));
        console.log("✅ Mapped logs:", mappedLogs);
        setLogs(mappedLogs);
      })
      .catch((err) => {
        console.error("❌ Error fetching logs:", err);
        alert("Failed to fetch logs. Check console for details.");
      })
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

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = logs.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(logs.length / recordsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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
        <div className="log-info">
          <span className="log-count-info">
            Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, logs.length)} of {logs.length} logs
          </span>
          <button className="log-button" onClick={() => window.location.reload()}>
            Refresh
          </button>
        </div>
      </div>

      {logs.length === 0 ? (
        <div className="log-empty-state">
          <p>No logs found.</p>
        </div>
      ) : (
        <>
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
                {currentRecords.map((log) => (
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

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="pagination-btn" 
                onClick={goToPrevPage} 
                disabled={currentPage === 1}
              >
                ← Previous
              </button>
              
              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => goToPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button 
                className="pagination-btn" 
                onClick={goToNextPage} 
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SystemLog;