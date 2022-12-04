import RNFS from 'react-native-fs';

const writeToJSON = async (programName, programJSON) => {

  const fileUri = programName.includes(".json") ? RNFS.DocumentDirectoryPath + "/" + programName : RNFS.DocumentDirectoryPath + "/" + programName + ".json";
  const contents = JSON.stringify(programJSON, null, 2);
  console.log("writeToJSON", programName, contents);
  try {
    // await RNFS.writeFile(fileUri, contents);
    RNFS.writeFile(fileUri, contents)
    .then((success) => {
      console.log('FILE WRITTEN!');
    })
    .catch((err) => {
      console.log(err.message);
    });
  } catch (error) {
    alert("Error writing file.");
  }
}

const copyJSON = async (programName, programURL) => {
  const copyFileUri = RNFS.DocumentDirectoryPath + programName.replace(".json", "- copy.json");
  const options = {
    from: programURL,
    to: copyFileUri
  };
  try {
    await RNFS.copyFile(options);
  } catch (error) {
    alert("Error duplicating file.");
  }
}

const deleteJSON = async (programURL) => {
  // try {
  //   await RNFS.unlink(programURL); // ?
  // } catch (error) {
  //   alert("Error deleting file.");
  // }
  alert("TODO");
}

export { writeToJSON, deleteJSON, copyJSON };
