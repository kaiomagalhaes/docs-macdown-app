import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Navbar from "../../components/Navbar";
import {listFolders} from "../../reducers/folders.reducer";
import connect from "react-redux/es/connect/connect";
import styles from './HomePage.module.scss';
import {Link} from "@material-ui/core";
import locations from "../../routes";

const HomePage = (props) => {
  const [isLoadingFolders, setIsLoadingFolders] = useState(true);

  useEffect(() => {
    const loadFolders = async () => {
      await props.listFolders();
      setIsLoadingFolders(false);
    };

    loadFolders()
  }, []);

  return (
    <React.Fragment>
      <Navbar color='primary'/>

      <main>
        <div className={styles['hero-content']}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Codelitt Docs
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </Typography>
            <div className={styles['hero-buttons']}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    @TODO Primary action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    @TODO Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>

        <Container className={styles['card-grid']} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {isLoadingFolders && [1, 2, 3, 4, 5, 6, 7, 8, 9].map(card => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Skeleton variant="text"/>
                <Skeleton variant="text"/>
                <Skeleton variant="rect" height={100}/>
              </Grid>
            ))}

            {!isLoadingFolders && props.folders.map(folder => (
              <Grid item key={folder.id} xs={12} sm={6} md={4}>
                <Card className={styles.card}>
                  <CardContent className={styles['card-content']}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {folder.name}
                    </Typography>
                    <Typography>
                      {folder.content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" href={locations.getShowFolderPath(folder.id)}>
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}


const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  listFolders: () => dispatch(listFolders())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
