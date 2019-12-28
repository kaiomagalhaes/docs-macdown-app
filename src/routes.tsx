export const ID_PATH_PARAM = ':id';

const LOGIN_PATH = '/login';
const EDIT_FILE_PATH = '/files/:id/edit';
const SHOW_FILE_PATH = '/files/:id';
const NEW_FILE_PATH = '/files/new';

const locations = {
  getLoginPath: () => LOGIN_PATH,
  getEditFilePath: () => EDIT_FILE_PATH,
  getShowFilePath: () => SHOW_FILE_PATH,
  getNewFilePath: () => NEW_FILE_PATH,
};

export default locations;
