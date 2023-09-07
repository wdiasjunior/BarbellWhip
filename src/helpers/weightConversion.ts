export function weightConversion(_weight: number, _targetUnit: boolean) {
  return _targetUnit ? toLBS(_weight) : toKG(_weight);
}

function toKG(_weight: number) {
  return Math.ceil(_weight / 2.205);
}

function toLBS(_weight: number) {
  return Math.floor(_weight * 2.205);
}
