import { useEffect, useState } from "react";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import ReferralTree from "./ReferralTree";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/dashboard").then((res) => setData(res.data));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!data) return <h3>Loading...</h3>;

  return (
    <div>
      <h2>Dashboard</h2>

      <p>
        <b>Total Investment:</b> ₹{data.totalInvestment}
      </p>
      <p>
        <b>Total ROI:</b> ₹{data.totalROI}
      </p>
      <p>
        <b>Level Income:</b> ₹{data.levelIncome}
      </p>

      <button onClick={logout}>Logout</button>
      <br />
      <br />

      <Link to="/invest">➕ New Investment</Link>

      <h3>My Investments</h3>
      {data.investments.map((inv) => (
        <div key={inv._id}>
          ₹{inv.amount} | {inv.plan} | {inv.status}
        </div>
      ))}

      <ReferralTree />
    </div>
  );
}
