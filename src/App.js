import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

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
      <CardActions>
        <Link to={`destinations/${props.destinationId}`}>
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

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
      <>
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
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                Hotels
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
        <Container>
          {apiData.suggestions.map((value, key) => {
            return (
              <>
                <h4>{value.group}</h4>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                  {value.entities.map((entity, key) => {
                    return (
                      <>
                        <MediaCard
                          name={entity.name}
                          destinationId={entity.destinationId}
                        />
                      </>
                    );
                  })}
                </Stack>
              </>
            );
          })}
        </Container>
      </>
    );
};

export default App;
