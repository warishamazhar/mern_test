import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateInvestment() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const submit = async () => {
    await api.post("/investments/add", {
      ...data,
      roiPercent: 5,
      plan: "BASIC",
    });
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Create Investment</h2>

      <input
        placeholder="Amount"
        onChange={(e) => setData({ ...data, amount: Number(e.target.value) })}
      />

      <button onClick={submit}>Invest</button>
    </div>
  );
}
