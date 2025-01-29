const Countries = ({ countries, filter }) => {
  if (!filter) {
    return null;
  }

  const filteredCountries = countries.filter((country) =>
    country.name.common
      .toLowerCase()
      .trim()
      .includes(filter.toLowerCase().trim())
  );

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (filteredCountries.length > 1 && filteredCountries.length < 10) {
    return (
      <>
        {filteredCountries.map((country) => (
          <div key={country.name.common}>{country.name.common}</div>
        ))}
      </>
    );
  }

  const country = filteredCountries[0];
  const languages = Object.values(country.languages);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>Capital {country.capital}</div>
      <div>Area {country.area}</div>
      <h4>Languages:</h4>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};

export default Countries;
