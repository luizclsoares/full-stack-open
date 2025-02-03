import axios from "axios";
const url = "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const create = (person) => {
  const request = axios.post(url, person);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${url}/${id}`);
  return request.then((response) => response.data);
};

const update = (person, id) => {
  const request = axios.put(`${url}/${id}`, person);
  return request.then((response) => response.data);
};

export default { getAll, create, deletePerson, update };
