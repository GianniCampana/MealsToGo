const { locations: locationsMock } = require("./geocode.mock");
const url = require("url");

module.exports.geocodeRequest = (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET");

  const { city } = url.parse(request.url, true).query;
  if (!city || !locationsMock[city]) {
    response.status(400).json({ error: "Invalid or missing city parameter" });
    return;
  }
  const locationMock = locationsMock[city.toLowerCase()];

  response.json(locationMock);
};
