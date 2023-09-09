import RNFS from "react-native-fs";

const writeToJSON = async (programName: string, programJSON: object) => {
  const fileUri = programName.includes(".json") ? RNFS.ExternalDirectoryPath + "/" + programName : RNFS.ExternalDirectoryPath + "/" + programName + ".json";
  const contents = JSON.stringify(programJSON, null, 2);
  try {
    await RNFS.writeFile(fileUri, contents);
  } catch(error) {
    alert("Error writing file.");
  }
}

const copyJSON = async (programName: string, programURI: string) => {
  const copyFileURI = RNFS.ExternalDirectoryPath + "/" + programName.replace(".json", "- copy.json");
  // const options = {
  //   from: programURI,
  //   to: copyFileURI
  // };
  try {
    // await RNFS.copyFile(options); // TODO - check this
    await RNFS.copyFile(copyFileURI, copyFileURI); // TODO - check this
  } catch(error) {
    alert("Error duplicating file.");
  }
}

const deleteJSON = async (programURI: string) => {
  try {
    await RNFS.unlink(programURI);
  } catch(error) {
    alert("Error deleting file.");
  }
}

export { writeToJSON, deleteJSON, copyJSON };
