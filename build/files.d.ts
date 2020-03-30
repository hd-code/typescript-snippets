/*! files-browser v0.0.1 from hd-snippets-js | MIT | © Hannes Dröse https://github.com/hd-code/hd-snippets-js */
/**
 * Saves a string of data to a file.
 * @param {string} data string of data to be saved to a file
 * @param {string} [fileName] optional. Specifies the filename
 */
declare function downloadFile(data: string, fileName?: string | undefined): void;
/**
 * Opens the file browser to choose a file.
 * @param {function} callback callback(fileContent: string|ArrayBuffer) – this function gets executed, when a file was chosen by the user
 */
declare function openFile(callback: Function): void;
