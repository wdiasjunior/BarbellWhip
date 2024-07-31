import RNFS from "react-native-fs";

export const writeToJSON = async (programName: string, programJSON: object) => {
  const fileUri = programName.includes(".json")
                    ? RNFS.ExternalDirectoryPath + "/" + programName
                    : RNFS.ExternalDirectoryPath + "/" + programName + ".json";
  const contents = JSON.stringify(programJSON, null, 2);
  try {
    await RNFS.writeFile(fileUri, contents);
  } catch(error) {
    console.log(error);
    alert("Error writing to file."); //  TODO -  add locale here
  }
}

export const copyJSON = async (programName: string, programURI: string) => {
  const copyFileURI = RNFS.ExternalDirectoryPath + "/" + programName.replace(".json", " - copy.json");
  const options = {
    from: programURI,
    to: copyFileURI
  };
  try {
    await RNFS.copyFile(programURI, copyFileURI);
  } catch(error) {
    console.log(error);
    alert("Error copying file."); //  TODO -  add locale here
  }
}

export const deleteJSON = async (programURI: string) => {
  try {
    await RNFS.unlink(programURI);
  } catch(error) {
    console.log(error);
    alert("Error deleting file."); //  TODO -  add locale here
  }
}
