import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const App = () => {
  const [apiData, setApiData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const config = {
        method: "get",
        url: "https://hotels4.p.rapidapi.com/locations/v2/search?query=new york",
        headers: {
          "x-rapidapi-host": "hotels4.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        },
      };

      const response = await axios(config);
      setApiData(response.data);
      setLoading(false);
    };

    getData();
  }, []);

  if (loading) return <p>Loading...</p>;
  else
    return (
      <div className="App">
        {apiData.suggestions.map((value, key) => {
          return (
            <>
              <table>
                <h4>{value.group}</h4>
                {value.entities.map((value, key) => {
                  return (
                    <>
                      <tr>
                        {" "}
                        <Link to="details">{`${value.name}`}</Link>
                      </tr>
                    </>
                  );
                })}
              </table>
            </>
          );
        })}
      </div>
    );
};

export default App;
