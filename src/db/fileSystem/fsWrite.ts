import RNFS from "react-native-fs";

const writeToJSON = async (programName: string, programJSON: any) => {
  const fileUri = programName.includes(".json") ? RNFS.ExternalDirectoryPath + "/" + programName : RNFS.ExternalDirectoryPath + "/" + programName + ".json";
  const contents = JSON.stringify(programJSON, null, 2);
  try {
    await RNFS.writeFile(fileUri, contents);
  } catch(error) {
    alert("Error writing file.");
  }
}

const copyJSON = async (programName: string, programURL: string) => {
  const copyFileUri = RNFS.ExternalDirectoryPath + "/" + programName.replace(".json", "- copy.json");
  const options = {
    from: programURL,
    to: copyFileUri
  };
  try {
    await RNFS.copyFile(options);
  } catch(error) {
    alert("Error duplicating file.");
  }
}

const deleteJSON = async (programURL: string) => {
  try {
    await RNFS.unlink(programURL);
  } catch(error) {
    alert("Error deleting file.");
  }
}

export { writeToJSON, deleteJSON, copyJSON };
