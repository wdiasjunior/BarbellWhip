export function weightConversion(_weight, _targetUnit) {
  return _targetUnit ? toLBS(_weight) : toKG(_weight);
}

function toKG(_weight) {
  return Math.ceil(_weight / 2.205);
}

function toLBS(_weight) {
  return Math.floor(_weight * 2.205);
}
