import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Details = () => {
  const [apiData, setApiData] = useState({});
  const [loading, setLoading] = useState(true);
  const { destinationId } = useParams();

  useEffect(() => {
    const getData = async () => {
      const config = {
        method: "get",
        url: `https://hotels4.p.rapidapi.com/properties/list?destinationId=${destinationId}`,
        headers: {
          "x-rapidapi-host": "hotels4.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        },
      };

      const response = await axios(config);
      setApiData(response.data);
      console.log(response);
      setLoading(false);
    };

    getData();
  }, []);

  if (loading) return <p>Loading...</p>;
  else if (apiData.result === "ERROR") return <p>No destinations found.</p>;
  else
    return (
      // <h1>Details Page</h1>
      <div className="Details">
        <h4>{apiData.data.body.searchResults.totalCount}</h4>
        {apiData.data.body.searchResults.results.map((value, key) => {
          return (
            <>
              <tr>{`${value.name}`}</tr>
            </>
          );
        })}
      </div>
    );
};

export default Details;
