import React, {useEffect, useState} from 'react';
import MarkdownIt from 'markdown-it';
import styles from './ShowFilePage.module.scss';
import ReactMarkdown from 'react-markdown';
import {connect} from 'react-redux';
import {fetchFile} from '../../reducers/file.reducer';
import {
  Container,
  Grid,
  Paper,
  Breadcrumbs,
  Link,
  Typography,
  Hidden,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {StickyContainer, Sticky} from 'react-sticky';
import classnames from 'classnames';
import ScrollableAnchor from 'react-scrollable-anchor'
import Navbar from '../../components/Navbar';

const ShowFilePage = (props) => {
  const {id} = props.match.params;
  const [parser, setParser] = useState(new MarkdownIt());
  const [slugs, setSlugs] = useState([]);

  let headingsFound = 0;

  useEffect(() => {
    props.fetchFile(id)
  }, [0])

  const renderSlugs = () => {
    if (!slugs) {
      return '';
    }

    slugs.sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0));

    return slugs.map(({slug, content, level}) => {
      return (
        <li key={slug} className={styles[`list-item-h${level}`]}>
          <Link href={`#${slug}`}>
            {content}
          </Link>
        </li>
      )
    })
  };

  const flatten = (text, child) => {
    return typeof child === 'string'
      ? text + child
      : React.Children.toArray(child.props.children).reduce(flatten, text)
  };

  const addSlug = (slug, headingProps) => {
    const found = slugs.some(el => el.slug === slug);
    if (!found) {
      setSlugs(slugs.concat({
        slug: slug,
        content: headingProps.children,
        level: headingProps.level,
        order: headingsFound++
      }));
    }
  };

  const headingRenderer = (props) => {
    let children = React.Children.toArray(props.children);
    let text = children.reduce(flatten, '');
    let slug = text.toLowerCase().replace(/\W/g, '-');

    addSlug(slug, props);

    return (
      <div className={styles['md-heading']}>
        <a href={`#${slug}`} className={styles['md-heading-anchor']}/>
        <ScrollableAnchor id={slug}>
          {React.createElement('h' + props.level, {id: slug, className: styles['md-heading-title']}, props.children)}
        </ScrollableAnchor>
      </div>
    )
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className={styles['title']}>
        {props.file.name}
      </div>

      <StickyContainer>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={styles.paper}>
                <Typography color="textPrimary" className={styles['breadcrumb-heading']}>You are here:</Typography>
                <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumb}>
                  <Link color="inherit" href="#">
                    {/* @TODO - update links */}
                    All
                  </Link>

                  <Link color="inherit" href="#">
                    {/* @TODO - get the folder name */}
                    Folder name
                  </Link>

                  <Typography color="textPrimary">{props.file.name}</Typography>
                </Breadcrumbs>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Hidden mdUp>
              <Grid item xs={12}>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}>
                    <h2 className={styles['table-of-contents-expandable']}>On this page</h2>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ul>
                      {renderSlugs()}
                    </ul>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
            </Hidden>

            <Grid item xs={12} md={8}>
              <Paper className={styles.paper}>
                <ReactMarkdown
                  renderers={{heading: headingRenderer}}
                  source={props.file.content}
                />
              </Paper>
            </Grid>

            <Hidden smDown>
              <Grid item xs={12} md={4}>
                <Sticky topOffset={80}>
                  {({style}) => (
                    <Paper style={style} className={classnames(styles.paper, styles['table-of-contents'])}>
                      <h2>
                        On this page
                      </h2>

                      <ul>
                        {renderSlugs()}
                      </ul>
                    </Paper>
                  )}
                </Sticky>
              </Grid>
            </Hidden>
          </Grid>
        </Container>
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
