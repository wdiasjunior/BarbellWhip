import RNFS from 'react-native-fs';

const readJSON = async (programName) => {
  const fileUri = RNFS.DocumentDirectoryPath + programName + ".json";
  let data = null;
  try {
    data = await RNFS.readFile(fileUri);
  } catch (error) {
    alert("Error reading file.");
  }
  // console.log(JSON.parse(data));
  return data;
}

const readImportedJSON = async (fileUri) => {
  let data = null;
  try {
    data = await RNFS.readFile(fileUri);
  } catch (error) {
    alert("Error reading file.");
  }
  // console.log(JSON.parse(data));
  return data;
}

const returnFileURL = async (programName) => {
  const fileUri = RNFS.DocumentDirectoryPath + programName;
  let data = null;
  try {
    data = await RNFS.readFile(fileUri);
  } catch (error) {
    alert("Error reading file.");
  }
  // console.log(fileUri);
  return fileUri;
}

const readDirectory = async () => {
  const fileUri = RNFS.DocumentDirectoryPath;
  let data = null;
  try {
    data = await RNFS.readDirAssets(fileUri);
  } catch (error) {
    alert("Error reading file system.");
  }
  console.log(data);
  return data;
}

export { readJSON, readImportedJSON, readDirectory, returnFileURL };
