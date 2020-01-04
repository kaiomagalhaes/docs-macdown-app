import React from 'react';
import styles from './MarkdownContent.module.scss';
import {Container, Grid, Hidden, Paper,} from "@material-ui/core";
import {StickyContainer} from 'react-sticky';
import classnames from 'classnames';
import Skeleton from "@material-ui/lab/Skeleton";

const MarkdownContentLoading = () => {

  const renderSkeletons = (amount) => {
    return [...Array(amount).keys()].map((idx) => (
      <Skeleton key={idx} variant="text" height={30}/>
    ))
  };

  return (
    <StickyContainer>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper className={styles.paper}>
              {renderSkeletons(4)}
              <Skeleton variant="rect" height={60}/>
              <Skeleton variant="rect" height={60}/>
            </Paper>
          </Grid>

          <Hidden smDown>
            <Grid item xs={12} md={4}>
              <Paper className={classnames(styles.paper, styles['table-of-contents'])}>
                <h2>
                  On this page
                </h2>

                <ul>
                  {renderSkeletons(5)}
                </ul>
              </Paper>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </StickyContainer>
  )
}

export default MarkdownContentLoading;
