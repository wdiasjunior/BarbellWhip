import RNFS from "react-native-fs";

const readJSON = async (programName: string) => {
  const fileURI = RNFS.ExternalDirectoryPath + "/" + programName + ".json";
  let data: any = null;
  try {
    data = await RNFS.readFile(fileURI);
  } catch(error) {
    console.log(error);
    alert("Error reading file.");
  }
  return data;
}

const readImportedJSON = async (fileURI: string) => {
  let data: any = null;
  try {
    data = await RNFS.readFile(fileURI);
  } catch(error) {
    console.log(error);
    alert("Error reading file.");
  }
  return data;
}

const getFileURL = async (programName: string) => {
  const fileURI = RNFS.ExternalDirectoryPath + "/" + programName;
  let data: any = null;
  try {
    data = await RNFS.readFile(fileURI);
  } catch(error) {
    console.log(error);
    alert("Error reading file.");
  }
  return fileURI;
}

const readDirectory = async () => {
  const fileURI = RNFS.ExternalDirectoryPath;
  let data: any = null;
  try {
    data = await RNFS.readDir(fileURI);
  } catch(error) {
    console.log(error);
    alert("Error reading file system.");
  }
  return data;
}

export { readJSON, readImportedJSON, readDirectory, getFileURL };
