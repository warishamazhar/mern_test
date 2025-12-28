import { useEffect, useState } from "react";
import api from "../api/api";

const Node = ({ user }) => (
  <li>
    {user.name} ({user.email})
    {user.children?.length > 0 && (
      <ul>
        {user.children.map((child) => (
          <Node key={child._id} user={child} />
        ))}
      </ul>
    )}
  </li>
);

export default function ReferralTree() {
  const [tree, setTree] = useState([]);

  useEffect(() => {
    api.get("/referrals/tree").then((res) => setTree(res.data));
  }, []);

  return (
    <div>
      <h3>Referral Tree</h3>
      <ul>
        {tree.map((user) => (
          <Node key={user._id} user={user} />
        ))}
      </ul>
    </div>
  );
}
