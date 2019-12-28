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
import styles from './ShowFolderPage.module.scss';

const ShowFolderPage = (props) => {
  const {id} = props.match.params;
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
              Folder page
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              @TODO - build the folder page
            </Typography>
          </Container>
        </div>

        <Container className={styles['card-grid']} maxWidth="md">
          <Grid container spacing={4}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(card => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Skeleton variant="text"/>
                <Skeleton variant="text"/>
                <Skeleton variant="rect" height={100}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowFolderPage);
