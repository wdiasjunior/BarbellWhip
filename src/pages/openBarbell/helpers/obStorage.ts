import RNFS from "react-native-fs";
import type { OBWorkoutSession, OBExerciseHistory } from "../types/obTypes";

const OB_DIR = `${RNFS.ExternalDirectoryPath}/openbarbell`;
const SESSIONS_DIR = `${OB_DIR}/sessions`;
const EXERCISES_DIR = `${OB_DIR}/exercises`;

export const ensureOBDirectories = async (): Promise<void> => {
  try {
    const obExists = await RNFS.exists(OB_DIR);
    if (!obExists) await RNFS.mkdir(OB_DIR);

    const sessionsExists = await RNFS.exists(SESSIONS_DIR);
    if (!sessionsExists) await RNFS.mkdir(SESSIONS_DIR);

    const exercisesExists = await RNFS.exists(EXERCISES_DIR);
    if (!exercisesExists) await RNFS.mkdir(EXERCISES_DIR);
  } catch (error) {
    console.error("Error creating OpenBarbell directories:", error);
  }
};

const sanitizeFileName = (name: string): string =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "_");

// Session storage

export const saveWorkoutSession = async (session: OBWorkoutSession): Promise<void> => {
  try {
    await ensureOBDirectories();
    const filePath = `${SESSIONS_DIR}/${session.sessionId}.json`;
    await RNFS.writeFile(filePath, JSON.stringify(session), "utf8");
  } catch (error) {
    console.error("Error saving workout session:", error);
  }
};

export const loadAllSessions = async (): Promise<OBWorkoutSession[]> => {
  try {
    await ensureOBDirectories();
    const files = await RNFS.readDir(SESSIONS_DIR);
    const jsonFiles = files.filter((f) => f.name.endsWith(".json"));

    const sessions: OBWorkoutSession[] = [];
    for (const file of jsonFiles) {
      const data = await RNFS.readFile(file.path, "utf8");
      sessions.push(JSON.parse(data));
    }
    return sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error loading sessions:", error);
    return [];
  }
};

export const deleteSession = async (sessionId: string): Promise<void> => {
  try {
    const filePath = `${SESSIONS_DIR}/${sessionId}.json`;
    const exists = await RNFS.exists(filePath);
    if (exists) await RNFS.unlink(filePath);
  } catch (error) {
    console.error("Error deleting session:", error);
  }
};

// Per-exercise history storage

export const saveExerciseHistory = async (
  exerciseName: string,
  history: OBExerciseHistory,
): Promise<void> => {
  try {
    await ensureOBDirectories();
    const fileName = sanitizeFileName(exerciseName);
    const filePath = `${EXERCISES_DIR}/${fileName}.json`;
    await RNFS.writeFile(filePath, JSON.stringify(history), "utf8");
  } catch (error) {
    console.error("Error saving exercise history:", error);
  }
};

export const loadExerciseHistory = async (
  exerciseName: string,
): Promise<OBExerciseHistory | null> => {
  try {
    const fileName = sanitizeFileName(exerciseName);
    const filePath = `${EXERCISES_DIR}/${fileName}.json`;
    const exists = await RNFS.exists(filePath);
    if (!exists) return null;

    const data = await RNFS.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading exercise history:", error);
    return null;
  }
};

export const getExerciseNames = async (): Promise<string[]> => {
  try {
    await ensureOBDirectories();
    const files = await RNFS.readDir(EXERCISES_DIR);
    const names: string[] = [];

    for (const file of files) {
      if (file.name.endsWith(".json")) {
        const data = await RNFS.readFile(file.path, "utf8");
        const history: OBExerciseHistory = JSON.parse(data);
        names.push(history.exerciseName);
      }
    }
    return names.sort();
  } catch (error) {
    console.error("Error getting exercise names:", error);
    return [];
  }
};
