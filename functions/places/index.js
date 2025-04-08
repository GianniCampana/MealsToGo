const { mocks, addMockImage } = require("./mock");
const url = require("url");

module.exports.placesRequest = (request, response) => {
  const { location } = url.parse(request.url, true).query;
  const data = mocks[location];
  if (data) {
    console.log("Mock data found for location:", location); // Log per verificare i dati mock
    console.log("Data:", data); // Log per verificare i dati mock
    data.results = data.module.results.map((restaurant) => {
      return addMockImage(restaurant);
    });
  }
  response.json(data);
};
