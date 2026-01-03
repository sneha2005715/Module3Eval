import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ restaurant, isAdmin, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div>
      <img src={restaurant.image} width="200" />
      <h3>{restaurant.restaurantName}</h3>
      <p>{restaurant.address}</p>
      <p>{restaurant.type}</p>
      <p>Parking: {restaurant.parkingLot ? "Yes" : "No"}</p>

      {isAdmin && (
        <>
          <button onClick={() => navigate("/admin/restaurants/update", { state: restaurant })}>
            Update
          </button>
          <button onClick={() => onDelete(restaurant.restaurantID)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default RestaurantCard;
