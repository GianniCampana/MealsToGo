import camelize from "camelize";

export const locationRequest = async (searchTerm) => {
  console.log("locationRequest called with searchTerm:", searchTerm); // Log per verificare il parametro
  const url = `http://192.168.1.14:8080/mealstogo-eea47/us-central1/geocode?city=${searchTerm}`;
  console.log("URL:", url); // Log per verificare l'URL

  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Location not found");
      } else {
        console.log("Response OK"); // Log per verificare la risposta
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Error fetching location:", err); // Log per errori di fetch
      throw err;
    });
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
