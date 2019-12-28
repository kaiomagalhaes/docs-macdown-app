export const ID_PATH_PARAM = ':id';

const HOME_PATH = '/';
const LOGIN_PATH = '/login';
const EDIT_FILE_PATH = '/files/:id/edit';
const SHOW_FILE_PATH = '/files/:id';
const SHOW_FOLDER_PATH = '/folders';
const NEW_FILE_PATH = '/files/new';

const locations = {
  getHomePath: () => HOME_PATH,
  getLoginPath: () => LOGIN_PATH,
  getEditFilePath: () => EDIT_FILE_PATH,
  getShowFilePath: () => SHOW_FILE_PATH,
  getShowFolderPath: (id: string | number) => `${SHOW_FOLDER_PATH}/${id}`,
  getNewFilePath: () => NEW_FILE_PATH,
};

export default locations;
