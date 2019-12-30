import React, {useEffect, useState} from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Navbar from "../../components/Navbar";
import {fetchFolder} from "../../reducers/folders.reducer";
import connect from "react-redux/es/connect/connect";
import styles from './ShowFolderPage.module.scss';
import locations from "../../routes";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const ShowFolderPage = (props) => {
  const {id} = props.match.params;
  const [isLoadingFolder, setIsLoadingFolder] = useState(true);

  useEffect(() => {
    const loadFolder = async () => {
      await props.fetchFolder(id);
      setIsLoadingFolder(false);
    };

    loadFolder()
  }, []);

  const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
  };

  const getDocuments = () => {
    const docs = props.folders.active.documents;

    if (!docs) {
      return null;
    }

    const items = docs.map((doc) => (
      <ListItemLink button key={doc.id} href={locations.getShowFilePath(doc.id)}>
        <ListItemText primary={doc.name}/>
      </ListItemLink>
    ));

    return (
      <React.Fragment>
        <h3>Documents</h3>
        <List component="nav" className={styles['list-documents']}>
          {items}
        </List>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Navbar color='primary'/>

      <main>
        <div className={styles['hero-content']}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              {!isLoadingFolder && props.folders.active.name}
              {isLoadingFolder && <Skeleton variant="text"/>}
            </Typography>
          </Container>
        </div>

        <Container className={styles['card-grid']} maxWidth="md">
          <Grid container spacing={4}>
            {getDocuments()}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  fetchFolder: (id) => dispatch(fetchFolder(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowFolderPage);
