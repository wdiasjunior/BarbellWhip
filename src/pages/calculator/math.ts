function oneRMCalc(weightLifted: number, repsPerformed: number, xRM: number) {
  if(repsPerformed == 1 && xRM == 1) {
    return weightLifted;
  }
  return round(Math.floor((epley(weightLifted, repsPerformed, xRM) +
                         brzycki(weightLifted, repsPerformed, xRM) +
                       mcglothin(weightLifted, repsPerformed, xRM) +
                        lombardi(weightLifted, repsPerformed, xRM) +
                          mayhew(weightLifted, repsPerformed, xRM) +
                         oconner(weightLifted, repsPerformed, xRM) +
                          wathen(weightLifted, repsPerformed, xRM)) / 7));
}

function round(weight: number, shouldRound: boolean) {
  if(!shouldRound) {
    return weight;
  }
  const kgRoundingFactor = 2.5;
  const lbsRoundingFactor = 5;

  return weightUnit === "kg" ? kgRoundingFactor : lbsRoundingFactor;
}

function epley(weightLifted: number, repsPerformed: number, xRM: number) {
  const oneRM = weightLifted * (1 + repsPerformed / 30);
  if(xRM == 1) {
    return Math.floor(oneRM);
  }
  return Math.floor(oneRM / (1 + xRM / 30));
}

function brzycki(weightLifted: number, repsPerformed: number, xRM: number) {
  const oneRM = weightLifted * 36 / (37 - repsPerformed);
  if(xRM == 1) {
    return Math.floor(oneRM);
  }
  return Math.floor((oneRM * (37 - xRM)) / 36);
}

function mcglothin(weightLifted: number, repsPerformed: number, xRM: number) {
  const oneRM = 100 * weightLifted / (101.3 - (2.67123 * repsPerformed));
  if(xRM == 1) {
    return Math.floor(oneRM);
  }
  return Math.floor((oneRM * (101.3 - 2.67123 * xRM)) / 100);
}

function lombardi(weightLifted: number, repsPerformed: number, xRM: number) {
  const oneRM = weightLifted * Math.pow(repsPerformed, 0.10);
  if(xRM == 1) {
    return Math.floor(oneRM);
  }
  return Math.floor(oneRM / (Math.pow(xRM, 0.10)));
}

function mayhew(weightLifted: number, repsPerformed: number, xRM: number) {
  const oneRM = (weightLifted * 100) / (52.2 + (41.9 * Math.exp(-1 * (repsPerformed * 0.055))));
  if(xRM == 1) {
    return Math.floor(oneRM);
  }
  return Math.floor((oneRM * (52.2 + (41.9 * Math.exp(-1 * (xRM * 0.055))))) / 100);
}

function oconner(weightLifted: number, repsPerformed: number, xRM: number) {
  const oneRM = weightLifted * (1 + (repsPerformed / 40));
  if(xRM == 1) {
    return Math.floor(oneRM);
  }
  return Math.floor(oneRM / (1 + xRM / 40));
}

function wathen(weightLifted: number, repsPerformed: number, xRM: number) {
  const oneRM = (weightLifted * 100) / (48.8 + (53.8 * Math.exp(-1 * (repsPerformed * 0.075))));
  if(xRM == 1) {
    return Math.floor(oneRM);
  }
  return Math.floor((oneRM * (48.8 + (53.8 * Math.exp(-1 * (xRM * 0.075))))) / 100);
}

export default oneRMCalc;
