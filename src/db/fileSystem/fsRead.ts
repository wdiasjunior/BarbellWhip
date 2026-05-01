import RNFS from "react-native-fs";

export const readJSON = async (programName: string, errorMessage?: string) => {
  const fileURI = `${RNFS.ExternalDirectoryPath}/${programName}.json`;
  let data: any = "{}";
  try {
    data = await RNFS.readFile(fileURI);
  } catch(error) {
    console.error(error);
    alert(errorMessage || "Error reading file.");
  }
  return data;
}

export const readImportedJSON = async (fileURI: string, errorMessage?: string) => {
  let data: any = "{}";
  try {
    data = await RNFS.readFile(fileURI);
  } catch(error) {
    console.error(error);
    alert(errorMessage || "Error reading file.");
  }
  return data;
}

export const getFileURI = async (programName: string, errorMessage?: string) => {
  const fileURI = `${RNFS.ExternalDirectoryPath}/${programName}`;
  let data: any = null;
  try {
    data = await RNFS.readFile(fileURI);
  } catch(error) {
    console.error(error);
    alert(errorMessage || "Error reading file.");
  }
  return fileURI;
}

export const readDirectory = async (errorMessage?: string) => {
  const fileURI = RNFS.ExternalDirectoryPath;
  let data: any = null;
  try {
    data = await RNFS.readDir(fileURI);
  } catch(error) {
    console.error(error);
    alert(errorMessage || "Error reading file system.");
  }
  return data;
}
