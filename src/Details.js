import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

function MediaCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://picsum.photos/200/300"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
      </CardContent>
    </Card>
  );
}

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
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Link to="/">
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", sm: "block" },
                    textDecoration: "inherit",
                    color: "white",
                  }}
                >
                  Hotels
                </Typography>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
        <Container>
          <Box mt={10} />
          {/* <h4>{apiData.data.body.searchResults.totalCount}</h4> */}
          {apiData.data.body.searchResults.results.map((value, key) => {
            return (
              <>
                <MediaCard name={value.name}></MediaCard>
                <Box mb={5} />
              </>
            );
          })}
        </Container>
      </div>
    );
};

export default Details;
