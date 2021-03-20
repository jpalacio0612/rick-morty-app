import { useState, useEffect } from "react";
import "./App.css";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Card,
  Box
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 8
  },
  media: {
    height: 140
  }
});

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getAllCharacters(1);
  }, []);

  const classes = useStyles();

  const getAllCharacters = async (pageNumber) => {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?page=${pageNumber}`
    );
    setCharacters(response.data.results);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Rick and Morty</Typography>
        </Toolbar>
      </AppBar>
      <Box display="flex" justifyContent="center" margin={2}>
        <Pagination
          count={10}
          color="secondary"
          onChange={(event, value) => getAllCharacters(value)}
        />
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent="space-around">
        {characters.map((character) => (
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={character.image}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {character.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Status {character.status} <br />
                  Species {character.species}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </div>
  );
}

export default App;
