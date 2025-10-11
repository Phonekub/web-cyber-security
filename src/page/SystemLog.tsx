import React, { useEffect, useState } from "react";
import { getLogs } from "../api/LogApi";

interface Log {
  id: string;
  date: string;
  category: string;
  message: string;
}

const SystemLog: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    // You can fetch from FastAPI here
    getLogs().then(setLogs).catch(console.error);
  }, []);

  const exportToCSV = () => {
    const headers = ["Date", "Category", "Message"];
    const rows = logs.map((log) => [log.date, log.category, log.message]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "system_logs.csv";
    link.click();
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3>System Log</h3>
        <div style={styles.buttonGroup}>
          <button style={styles.button} onClick={exportToCSV}>Export To CSV</button>
          <button style={styles.button} onClick={() => window.location.reload()}>Refresh</button>
          <button style={styles.button}>Click To Filter Data</button>
        </div>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Message</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={log.id || index}>
              <td style={styles.td}>{log.date}</td>
              <td style={styles.td}>{log.category}</td>
              <td style={styles.td}>{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "1rem",
    backgroundColor: "#f8f8f8",
    height: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e8e8e8",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
  },
  buttonGroup: {
    display: "flex",
    gap: "0.5rem",
  },
  button: {
    backgroundColor: "#f3f3f3",
    border: "1px solid #ccc",
    padding: "4px 10px",
    cursor: "pointer",
    borderRadius: "3px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem",
    backgroundColor: "#fff",
  },
  th: {
    textAlign: "left",
    borderBottom: "2px solid #ccc",
    padding: "8px",
    backgroundColor: "#f0f0f0",
  },
  td: {
    padding: "8px",
    borderBottom: "1px solid #ddd",
    fontSize: "14px",
  },
};

export default SystemLog;
