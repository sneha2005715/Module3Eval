import { useEffect, useState } from "react";
import { getRestaurants, saveRestaurants } from "../utils/localStorage";
import RestaurantCard from "../components/RestaurantCard";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    restaurantName: "",
    address: "",
    type: "",
    parkingLot: "",
    image:
      "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8766-eca8da47c2f1/2izhqnTaNLdenHYF.jpeg",
  });

  useEffect(() => {
    setData(getRestaurants());
  }, []);

  const addRestaurant = () => {
    if (!form.restaurantName || !form.address || !form.type)
      return alert("Form incomplete");

    const newRestaurant = {
      ...form,
      restaurantID: Date.now(),
      parkingLot: form.parkingLot === "true",
    };

    const updated = [...data, newRestaurant];
    saveRestaurants(updated);
    setData(updated);
    alert("Restaurant Added");
    setForm({ ...form, restaurantName: "", address: "", type: "" });
  };

  const deleteRestaurant = (id) => {
    if (!confirm("Are you sure you want to delete?")) return;
    const updated = data.filter((r) => r.restaurantID !== id);
    saveRestaurants(updated);
    setData(updated);
    alert("Deleted successfully");
  };

  return (
    <>
      <Navbar data={data} setData={setData} />
      <div style={{ display: "flex" }}>
        <div>
          <h3>Add Restaurant</h3>
          <input placeholder="Name" value={form.restaurantName}
            onChange={(e) => setForm({ ...form, restaurantName: e.target.value })} />
          <input placeholder="Address" value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })} />

          <select onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="">Select Type</option>
            <option>Rajasthani</option>
            <option>Gujarati</option>
            <option>Mughlai</option>
            <option>Jain</option>
            <option>Thai</option>
            <option>North Indian</option>
            <option>South Indian</option>
          </select>

          <select onChange={(e) => setForm({ ...form, parkingLot: e.target.value })}>
            <option value="">Parking?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          <button onClick={addRestaurant}>Add</button>
        </div>

        <div>
          {data.map((r) => (
            <RestaurantCard
              key={r.restaurantID}
              restaurant={r}
              isAdmin
              onDelete={deleteRestaurant}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
