export function weightConversion(_weight: number, _targetUnit: boolean): number {
  return _targetUnit ? toLBS(_weight) : toKG(_weight);
}

function toKG(_weight: number): number {
  return Math.ceil(_weight / 2.205);
}

function toLBS(_weight: number): number {
  return Math.floor(_weight * 2.205);
}
