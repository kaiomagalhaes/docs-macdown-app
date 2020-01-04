import React, {useState} from 'react';
import styles from './MarkdownContent.module.scss';
import ReactMarkdown from 'react-markdown';
import {
  Container,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Hidden,
  Link,
  Paper,
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Sticky, StickyContainer} from 'react-sticky';
import classnames from 'classnames';
import ScrollableAnchor from 'react-scrollable-anchor'

const MarkdownContent = (props) => {
  const [slugs, setSlugs] = useState([]);

  let headingsFound = 0;
  let slugId = 1;

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
    let slug = slugId++ + '-' + text.toLowerCase().replace(/\W/g, '-');

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
    <StickyContainer>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Hidden mdUp>
            <Grid item xs={12}>
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon/>}>
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
                source={props.content}
              />
            </Paper>
          </Grid>

          <Hidden smDown>
            <Grid item xs={12} md={4}>
              <Sticky offset={100}>
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
  )
}

export default MarkdownContent;
