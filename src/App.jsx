import { useDeferredValue, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const deferredQuery = useDeferredValue(data);
  const [isLoading, setIsLoading] = useState(false);
  const url = "https://jsonplaceholder.typicode.com";
  const urlUsers = "users";

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${url}/${urlUsers}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();
      setData(jsonData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoading === true ? (
        <p>Loading...</p>
      ) : (
        <DisplayRows data={deferredQuery} />
      )}
    </div>
  );
}

export default App;

export const DisplayRows = ({ data }) => {
  return (
    <table>
      <tr>
        <th>id</th>
        <th>email</th>
        <th>username</th>
        <th>name</th>
        <th>phone</th>
        <th>adress</th>
        <th>website</th>
      </tr>
      {data.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.email}</td>
          <td>{item.username}</td>
          <td>{item.name}</td>
          <td>{item.phone}</td>
          <td>{item.phone}</td>
          <td>
            {item.address.city} {item.address.street}
          </td>
          <td>{item.website}</td>
        </tr>
      ))}
    </table>
  );
};
