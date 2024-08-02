import RNFS from "react-native-fs";

export const readJSON = async (programName: string) => {
  const fileURI = `${RNFS.ExternalDirectoryPath}/${programName}.json`;
  let data: any = null;
  try {
    data = await RNFS.readFile(fileURI);
  } catch(error) {
    console.log(error);
    alert("Error reading file."); //  TODO - add locale
  }
  return data;
}

export const readImportedJSON = async (fileURI: string) => {
  let data: any = null;
  try {
    data = await RNFS.readFile(fileURI);
  } catch(error) {
    console.log(error);
    alert("Error reading file."); //  TODO - add locale
  }
  return data;
}

export const getFileURI = async (programName: string) => {
  const fileURI = `${RNFS.ExternalDirectoryPath}/${programName}`;
  let data: any = null;
  try {
    data = await RNFS.readFile(fileURI);
  } catch(error) {
    console.log(error);
    alert("Error reading file."); //  TODO - add locale
  }
  return fileURI;
}

export const readDirectory = async () => {
  const fileURI = RNFS.ExternalDirectoryPath;
  let data: any = null;
  try {
    data = await RNFS.readDir(fileURI);
  } catch(error) {
    console.log(error);
    alert("Error reading file system."); //  TODO - add locale
  }
  return data;
}
