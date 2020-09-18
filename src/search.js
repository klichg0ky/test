const counties = [
  { county: "Albany County", state: "New York" },
  { county: "Adams County", state: "Washington" },
  { county: "Benton County", state: "Washington" },
  { county: "Broome County", state: "New York" },
  { county: "Cattaraugus County", state: "New York" },
  { county: "Alameda County", state: "California" },
  { county: "Butte County", state: "California" },
  { county: "Sierra County", state: "California" },
  { county: "Chenango County", state: "New York" },
  { county: "Clinton County", state: "New York" },
].map((item, index) => ({
  ...item,
  id: index + 1,
}));

function search(query) {
  query = query.toLowerCase();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        counties.filter(
          (county) =>
            county.county.toLowerCase().includes(query) ||
            county.state.toLowerCase().includes(query)
        )
      );
    }, 500);
  });
}

export default search;
