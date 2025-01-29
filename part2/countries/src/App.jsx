import { useState, useEffect } from "react";

import Find from "./components/Find";
import Countries from "./components/Countries";

import countriesService from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    countriesService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  const handleFilterChange = (e) => setFilter(e.target.value);

  return (
    <div>
      <Find filter={filter} handleChange={handleFilterChange} />
      <Countries countries={countries} filter={filter} />
    </div>
  );
};

export default App;
