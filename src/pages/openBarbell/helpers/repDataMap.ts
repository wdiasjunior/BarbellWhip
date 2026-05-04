const positions = {
  repNumber: 1,
  averageVelocity: 2,
  rangeOfMotion: 3,
  peakVelocity: 4,
  peakVelocityLocation: 5,
  peakAcceleration: 6, // OB v3 only
  durationOfLift: 7,   // OB v2 and v3 only
};

const parseData = (repData: number[], position: number): number | null => {
  if (repData.length < position + 1) {
    return null;
  }

  const data = repData[position];
  const parsed = parseFloat(data.toFixed(2));
  return isNaN(parsed) ? null : parsed;
};

export const repNumber = (repData: number[]): number | null =>
  parseData(repData, positions.repNumber);

export const averageVelocity = (repData: number[]): number | null =>
  parseData(repData, positions.averageVelocity);

export const rangeOfMotion = (repData: number[]): number | null =>
  parseData(repData, positions.rangeOfMotion);

export const peakVelocity = (repData: number[]): number | null =>
  parseData(repData, positions.peakVelocity);

export const peakVelocityLocation = (repData: number[]): number | null =>
  parseData(repData, positions.peakVelocityLocation);

export const peakAcceleration = (repData: number[]): number | null => {
  const startFlag = repData[0];
  // v1 (-1234) and v2 (-2345) don't have peak acceleration
  if (startFlag === -1234 || startFlag === -2345) {
    return null;
  }
  return parseData(repData, positions.peakAcceleration);
};

export const durationOfLift = (repData: number[]): number | null => {
  // v1 (-1234) doesn't have duration
  if (repData[0] === -1234) {
    return null;
  }
  return parseData(repData, positions.durationOfLift);
};

const isInfinityOrNegative = (repData: number[]): boolean => {
  const velocity = averageVelocity(repData);
  if (velocity === null || !isFinite(velocity) || velocity < 0) {
    return true;
  }
  return false;
};

export const isValidData = (repData: number[]): boolean => {
  const initialFlag = repData[0];

  if (initialFlag === -3456) {
    // v3 bulk data flag check at position 21
    const bulkFlag = repData.length >= 22 ? repData[21] : null;
    if (bulkFlag === -9999 && !isInfinityOrNegative(repData)) {
      return true;
    }
  } else if (initialFlag === -2345) {
    // v2 bulk data flag check at position 18
    const bulkFlag = repData.length >= 19 ? repData[18] : null;
    if (bulkFlag === -9999 && !isInfinityOrNegative(repData)) {
      return true;
    }
  } else if (initialFlag === -1234) {
    // v1 bulk data flag check at position 6
    const bulkFlag = repData.length >= 7 ? repData[6] : null;
    if (bulkFlag === -9999 && !isInfinityOrNegative(repData)) {
      return true;
    }
  }

  return false;
};

export const START_FLAGS = [-1234, -2345, -3456];
export const END_BULK_FLAG = -6789;
export const BULK_VALIDATION_FLAG = -9999;
