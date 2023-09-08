interface WeightRack {
  kg: {
    50: PlateColorSize;
    25: PlateColorSize;
    20: PlateColorSize;
    15: PlateColorSize;
    10: PlateColorSize;
    5: PlateColorSize;
    2.5: PlateColorSize;
    2: PlateColorSize;
    1.5: PlateColorSize;
    1.25: PlateColorSize;
    1: PlateColorSize;
    0.5: PlateColorSize;
  }
  lbs: {
    100: PlateColorSize;
    55: PlateColorSize;
    45: PlateColorSize;
    35: PlateColorSize;
    25: PlateColorSize;
    10: PlateColorSize;
    5: PlateColorSize;
    2.5: PlateColorSize;
    1.25: PlateColorSize;
  }
}

interface BumperRack extends WeightRack {
  kg: {
    25: PlateColorSize;
    20: PlateColorSize;
    15: PlateColorSize;
    10: PlateColorSize;
    5: PlateColorSize;
  }
  lbs: {
    55: PlateColorSize;
    45: PlateColorSize;
    35: PlateColorSize;
    25: PlateColorSize;
    10: PlateColorSize;
  }
}

interface PlateColorSize {
  size: number;
  color: string;
}

interface BarWeight {
  kg: number;
  lbs: number;
}

interface Plates {
  plate: number;
  isBumper: boolean;
}