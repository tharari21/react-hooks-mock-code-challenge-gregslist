import React, { useState } from "react";

function ListingCard({
  id,
  image = "https://via.placeholder.com/300x300",
  description,
  location,
  onDeleteListing,
}) {
  const [isFavorited, setIsFavorited] = useState(false);
  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };
  const handleTrashClick = () => {
    fetch(`http://localhost:6001/listings/${id}`, { method: "DELETE" })
      .then((r) => r.json())
      .then(() => onDeleteListing(id));
  };
  return (
    <li className="card">
      <div className="image">
        <span className="price">$0</span>
        <img src={image} alt={"description"} />
      </div>
      <div className="details">
        {isFavorited ? (
          <button
            className="emoji-button favorite active"
            onClick={handleFavoriteClick}
          >
            ★
          </button>
        ) : (
          <button
            className="emoji-button favorite"
            onClick={handleFavoriteClick}
          >
            ☆
          </button>
        )}
        <strong>{description}</strong>
        <span> · {location}</span>
        <button className="emoji-button delete" onClick={handleTrashClick}>
          🗑
        </button>
      </div>
    </li>
  );
}

export default ListingCard;
