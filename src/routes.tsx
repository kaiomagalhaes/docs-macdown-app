export const ID_PATH_PARAM = ':id';

const HOME_PATH = '/';
const LOGIN_PATH = '/login';
const SHOW_FILE_PATH = '/files';
const SHOW_FOLDER_PATH = '/folders';
const NEW_FILE_PATH = '/files/new';

const locations = {
  getHomePath: () => HOME_PATH,
  getLoginPath: () => LOGIN_PATH,
  getEditFilePath: (id: string | number) => `${SHOW_FILE_PATH}/${id}/edit`,
  getShowFilePath: (id: string | number) => `${SHOW_FILE_PATH}/${id}`,
  getShowFolderPath: (id: string | number) => `${SHOW_FOLDER_PATH}/${id}`,
  getNewFilePath: () => NEW_FILE_PATH,
};

export default locations;
