/** Saves a string of data to a file. */
export declare function downloadFile(data: string, filename?: string): Promise<void>;
/** Opens the file browser to choose a file. */
export declare function openFile(): Promise<string>;
