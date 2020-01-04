import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Navbar from "../../components/Navbar";
import {listRootFolders} from "../../reducers/folders.reducer";
import connect from "react-redux/es/connect/connect";
import styles from './HomePage.module.scss';
import MarkdownContent from "../../components/MarkdownContent";
import MarkdownContentLoading from "../../components/MarkdownContent/loading";
import Skeleton from "@material-ui/lab/Skeleton";
import {StickyContainer} from "react-sticky";
import locations from "../../routes";

const HomePage = (props) => {
  const [isLoadingFolders, setIsLoadingFolders] = useState(true);

  useEffect(() => {
    const loadFolders = async () => {
      await props.listRootFolders();
      setIsLoadingFolders(false);
    };

    loadFolders()
  }, []);

  const getFileLink = (document) => {
    return `[${document.name}](${locations.getShowFilePath(document.id)})`
  }

  const getFolderLinks = (folder, level = 1) => {
    let links = [];

    console.log('level', level)
    console.log('folder', folder)

    const folderHeader = `${"#".repeat(level)} ${folder.name}`;

    if (folder.documents) {
      links = [...links, folder.documents.map((doc) => {
        return `${getFileLink(doc)}\n`
      })]
    }

    if (folder.descendants) {
      const newLevel = level + 1;
      links = [...links, folder.descendants.map((folder) => {
        return getFolderLinks(folder, newLevel)
      })]
    }

    return `${folderHeader}\n${links.flat().join('\n')}`
  };

  const getMarkdownContent = () => {
    if (isLoadingFolders || !props.folders.roots) {
      return null;
    }

    const links = props.folders.roots.map((folder) => getFolderLinks(folder)).join('\n');

    // TODO - add some intro text
    return links;
  }

  return (
    <React.Fragment>
      <Navbar />
      <div className={styles['title']}>
        Codelitt Docs
      </div>

      <StickyContainer>
        <div className={styles['intro-content']}>
          {!isLoadingFolders && <MarkdownContent content={getMarkdownContent()}/> }
          {isLoadingFolders && <MarkdownContentLoading/> }
        </div>
      </StickyContainer>
    </React.Fragment>
  );
}


const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  listRootFolders: () => dispatch(listRootFolders())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
