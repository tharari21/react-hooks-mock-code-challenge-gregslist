import React, { useState, useEffect } from "react";
import Header from "./Header";
import ListingsContainer from "./ListingsContainer";

function App() {
  const [listings, setListings] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    fetch("http://localhost:6001/listings")
      .then((r) => r.json())
      .then((listings) => setListings(listings));
  }, []);
  const onUpdateListing = (updatedListing) => {
    setListings(
      listings.map((listing) => {
        if (listing.id === updatedListing.id) {
          return updatedListing;
        }
        return listing;
      })
    );
  };
  const onDeleteListing = (deletedListingId) => {
    setListings(listings.filter((listing) => listing.id !== deletedListingId));
  };
  const filteredListings = listings.filter((listing) =>
    listing.description.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <div className="app">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <ListingsContainer
        listings={filteredListings}
        onDeleteListing={onDeleteListing}
      />
    </div>
  );
}

export default App;
