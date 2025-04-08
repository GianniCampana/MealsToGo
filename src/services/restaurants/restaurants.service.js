import camelize from "camelize";

export const restaurantsRequest = (location) => {
  console.log("locationRequest called with searchTerm:", location); // Log per verificare il parametro
  const url = `http://192.168.1.14:8080/mealstogo-eea47/us-central1/placesNearby?location=${location}`;
  console.log("URL:", url);

  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Location not found");
      } else {
        console.log("Response OK");
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Error fetching location:", err);
      throw err;
    });
};

export const restaurantsTransform = ({ results = [] }) => {
  console.log("Transforming results:", results); // Log per verificare i dati
  const mappedResults = results.map((restaurant) => {
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
      rating: restaurant.rating || 0,
    };
  });

  return camelize(mappedResults);
};
