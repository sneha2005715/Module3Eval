import { useLocation, useNavigate } from "react-router-dom";
import { getRestaurants, saveRestaurants } from "../utils/localStorage";
import { useState } from "react";

const UpdateRestaurant = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(state);

  const update = () => {
    if (!confirm("Are you sure you want to update?")) return;
    const data = getRestaurants().map((r) =>
      r.restaurantID === form.restaurantID ? form : r
    );
    saveRestaurants(data);
    alert("Updated successfully");
    navigate("/admin/dashboard");
  };

  return (
    <div>
      <h2>Update Restaurant</h2>
      <input value={form.restaurantName}
        onChange={(e) => setForm({ ...form, restaurantName: e.target.value })} />
      <button onClick={update}>Update</button>
    </div>
  );
};

export default UpdateRestaurant;
