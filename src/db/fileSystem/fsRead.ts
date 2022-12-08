import RNFS from 'react-native-fs';

const readJSON = async (programName) => {
  const fileUri = RNFS.ExternalDirectoryPath + "/" + programName + ".json";
  let data = null;
  try {
    data = await RNFS.readFile(fileUri);
  } catch(error) {
    alert("Error reading file.");
  }
  return data;
}

const readImportedJSON = async (fileUri) => {
  let data = null;
  try {
    data = await RNFS.readFile(fileUri);
  } catch(error) {
    alert("Error reading file.");
  }
  return data;
}

const returnFileURL = async (programName) => {
  const fileUri = RNFS.ExternalDirectoryPath + "/" + programName;
  let data = null;
  try {
    data = await RNFS.readFile(fileUri);
  } catch(error) {
    alert("Error reading file.");
  }
  return fileUri;
}

const readDirectory = async () => {
  const fileUri = RNFS.ExternalDirectoryPath;
  let data = null;
  try {
    data = await RNFS.readDir(fileUri);
  } catch(error) {
    alert("Error reading file system.");
  }
  return data;
}

export { readJSON, readImportedJSON, readDirectory, returnFileURL };
