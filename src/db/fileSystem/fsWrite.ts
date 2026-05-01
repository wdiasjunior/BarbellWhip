import RNFS from "react-native-fs";
import { readDirectory } from "./fsRead";

const getAvailableFileName = async (baseName) => {
  let fileName = baseName.includes(".json") ? `${baseName}` : `${baseName}.json`;
  let counter = 1;

  while (await RNFS.exists(`${RNFS.ExternalDirectoryPath}/${fileName}`)) {
    fileName = `${baseName.replace(".json", "")} (${counter}).json`;
    counter++;
  }

  return fileName;
}

export const writeToJSON = async (programName: string, programJSON: object, errorMessage?: string) => {
  const fileUri = programName.includes(".json") ? `${RNFS.ExternalDirectoryPath}/${programName}` : `${RNFS.ExternalDirectoryPath}/${programName}.json`;
  const contents = JSON.stringify(programJSON, null, 2);

  try {
    await RNFS.writeFile(fileUri, contents);
  } catch (error) {
    console.error(error);
    alert(errorMessage || "Error writing to file.");
  }
}

export const importJSON = async (programName: string, programJSON: object, isIntentImport: boolean, errorMessage?: string) => {
  const parsed = typeof programJSON === "string" ? JSON.parse(programJSON) : programJSON;
  const _programNameFromJSON = parsed.programName;
  try {
    const availableFileName = await getAvailableFileName(_programNameFromJSON);
    const fileUri = `${RNFS.ExternalDirectoryPath}/${availableFileName}`;
    const contents = typeof programJSON === "string" ? programJSON : JSON.stringify(programJSON, null, 2);
    await RNFS.writeFile(fileUri, contents);
  } catch (error) {
    console.error(error);
    alert(errorMessage || "Error writing to file.");
  }
}

export const copyJSON = async (programName: string, programURI: string, errorMessage?: string) => {
  try {
    const availableFileName = await getAvailableFileName(programName);
    const copyFileURI = `${RNFS.ExternalDirectoryPath}/${availableFileName}`;

    await RNFS.copyFile(programURI, copyFileURI);
  } catch (error) {
    console.error(error);
    alert(errorMessage || "Error copying file.");
  }
}

export const deleteJSON = async (programURI: string, errorMessage?: string) => {
  try {
    await RNFS.unlink(programURI);
  } catch (error) {
    console.error(error);
    alert(errorMessage || "Error deleting file.");
  }
}
