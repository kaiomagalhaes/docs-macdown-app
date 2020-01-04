import React, {useEffect, useState} from 'react';
import styles from './ShowFilePage.module.scss';
import {connect} from 'react-redux';
import {fetchFile} from '../../reducers/file.reducer';
import {Breadcrumbs, Container, Grid, Link, Paper, Typography,} from "@material-ui/core";
import {StickyContainer} from 'react-sticky';
import Navbar from '../../components/Navbar';
import locations from "../../routes";
import MarkdownContent from "../../components/MarkdownContent";
import MarkdownContentLoading from "../../components/MarkdownContent/loading";
import Skeleton from "@material-ui/lab/Skeleton";

const ShowFilePage = (props) => {
  const {id} = props.match.params;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFile = async () => {
      await props.fetchFile(id);
      setIsLoading(false);
    };
    loadFile();
  }, [0]);

  const flatten = (text, child) => {
    return typeof child === 'string'
      ? text + child
      : React.Children.toArray(child.props.children).reduce(flatten, text)
  };

  const navbarButtons = [
    {
      title: 'Edit File',
      href: locations.getEditFilePath(id),
      type: 'link',
      show: true
    },
  ]

  const getFolderTree = () => {
    const folderTree = props.file.folder_tree;

    if (!folderTree) {
      return null;
    }

    return folderTree.map(folder => (
      //TODO - link to the home section of the folder
      <Link key={folder.id} color="inherit" href={locations.getHomePath()}>
        {folder.name}
      </Link>
    ))
  }

  return (
    <React.Fragment>
      <Navbar buttons={navbarButtons}/>
      <div className={styles['title']}>
        {isLoading && <Skeleton variant="text" height={30} style={{backgroundColor: 'rgba(255, 255, 255, 0.33)', width: '75%'}} /> }
        {props.file.name}
      </div>

      <StickyContainer>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={styles.paper}>
                <Typography color="textPrimary" className={styles['breadcrumb-heading']}>You are here:</Typography>
                <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumb}>
                  <Link color="inherit" href={locations.getHomePath()}>
                    Home
                  </Link>

                  {getFolderTree()}

                  <Typography color="textPrimary">{props.file.name}</Typography>
                </Breadcrumbs>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        {!isLoading && <MarkdownContent content={props.file.content}/> }
        {isLoading && <MarkdownContentLoading/> }

      </StickyContainer>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  fetchFile: (id) => dispatch(fetchFile(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowFilePage);
