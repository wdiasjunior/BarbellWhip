import RNFS from "react-native-fs";
import { readDirectory } from "./fsRead";

const getAvailableFileName = async (baseName) => {
  let fileName = baseName.includes(".json") ? `${baseName}` : `${baseName}.json`;
  let counter = 1;

  while(await RNFS.exists(`${RNFS.ExternalDirectoryPath}/${fileName}`)) {
    fileName = `${baseName.replace(".json", "")} (${counter}).json`;
    counter++;
  }

  return fileName;
}

export const writeToJSON = async (programName: string, programJSON: object) => {
  const fileUri = programName.includes(".json") ? `${RNFS.ExternalDirectoryPath}/${programName}` : `${RNFS.ExternalDirectoryPath}/${programName}.json`;
  const contents = JSON.stringify(programJSON, null, 2);

  try {
    await RNFS.writeFile(fileUri, contents);
  } catch(error) {
    console.log(error);
    alert("Error writing to file."); //  TODO -  add locale here
  }
}

export const importJSON = async (programName: string, programJSON: object, isIntentImport: boolean) => {
  const _programNameFromJSON = JSON.parse(programJSON).programName;
  try {
    const availableFileName = await getAvailableFileName(_programNameFromJSON);
    const fileUri = `${RNFS.ExternalDirectoryPath}/${availableFileName}`;
    const contents = isIntentImport ? programJSON : JSON.stringify(programJSON, null, 2);
    await RNFS.writeFile(fileUri, contents);
  } catch(error) {
    console.log(error);
    alert("Error writing to file."); //  TODO -  add locale here
  }
}

export const copyJSON = async (programName: string, programURI: string) => {
  try {
    const availableFileName = await getAvailableFileName(programName);
    const copyFileURI = `${RNFS.ExternalDirectoryPath}/${availableFileName}`;

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
