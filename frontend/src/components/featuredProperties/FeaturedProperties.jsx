import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading } = useFetch("http://localhost:5000/api/hotels?featured=true&limit=4");
  const navigate = useNavigate();

  const getRatingText = (rating) => {
    if (rating === 5) {
      return "Excellent";
    } else if (rating === 4) {
      return "Good";
    } else {
      return `Rating: ${rating}`;
    }
  };

  const handleClick = (hotelId) => {
    navigate(`/hotels/${hotelId}`);
  };

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id} onClick={() => handleClick(item._id)}>
              <img src={item.photos[0]} alt="" className="fpImg" />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>{getRatingText(item.rating)}</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
