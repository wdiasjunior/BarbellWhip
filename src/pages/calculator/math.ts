function oneRMCalc(weightLifted: number, repsPerformed: number, xRM: number, RMFormulas?: any): number {
  if(repsPerformed == 1 && xRM == 1) {
    return weightLifted;
  }

  if(RMFormulas) {
    let amountOfActiveFormulas: number = 0;
    Object.values(RMFormulas).forEach((i) => {
      if(i === true) {
        amountOfActiveFormulas++;
      }
    })
    if(amountOfActiveFormulas === 0) {
      return 0;
    }
    return round(Math.floor((epley(weightLifted, repsPerformed, xRM, RMFormulas.epley) +
                           brzycki(weightLifted, repsPerformed, xRM, RMFormulas.brzycki) +
                         mcglothin(weightLifted, repsPerformed, xRM, RMFormulas.mcglothin) +
                          lombardi(weightLifted, repsPerformed, xRM, RMFormulas.lombardi) +
                            mayhew(weightLifted, repsPerformed, xRM, RMFormulas.mayhew) +
                           oconner(weightLifted, repsPerformed, xRM, RMFormulas.oconner) +
                            wathen(weightLifted, repsPerformed, xRM, RMFormulas.wathen)) / amountOfActiveFormulas));
  } else {
    return round(Math.floor((epley(weightLifted, repsPerformed, xRM) +
                           brzycki(weightLifted, repsPerformed, xRM) +
                         mcglothin(weightLifted, repsPerformed, xRM) +
                          lombardi(weightLifted, repsPerformed, xRM) +
                            mayhew(weightLifted, repsPerformed, xRM) +
                           oconner(weightLifted, repsPerformed, xRM) +
                            wathen(weightLifted, repsPerformed, xRM)) / 7));
  }
}

export function round(weight: number, percentage?: number = 100, shouldRound?: boolean = false, weightUnit?: string = "kg"): number {
  if(!shouldRound) {
    return parseFloat(weight) * (parseFloat(percentage) / 100);
  }

  const roundingFactor = weightUnit === "kg" ? 2.5 : 5;

  return Math.ceil((parseFloat(weight) * (parseFloat(percentage) / 100) / roundingFactor)) * roundingFactor;
}

function epley(weightLifted: number, repsPerformed: number, xRM: number, active: boolean): number {
  if(!active) {
    return 0;
  }
  const oneRM = weightLifted * (1 + repsPerformed / 30);
  if(xRM == 1) {
    return Math.floor(oneRM);
  }
  return Math.floor(oneRM / (1 + xRM / 30));
}

function brzycki(weightLifted: number, repsPerformed: number, xRM: number, active: boolean): number {
  if(!active) {
    return 0;
  }
  const oneRM = weightLifted * 36 / (37 - repsPerformed);
  if(xRM == 1) {
    return Math.floor(oneRM);
  }
  return Math.floor((oneRM * (37 - xRM)) / 36);
}

function mcglothin(weightLifted: number, repsPerformed: number, xRM: number, active: boolean): number {
  if(!active) {
    return 0;
  }
  const oneRM = 100 * weightLifted / (101.3 - (2.67123 * repsPerformed));
  if(xRM == 1) {
    return Math.floor(oneRM);
  }
  return Math.floor((oneRM * (101.3 - 2.67123 * xRM)) / 100);
}

function lombardi(weightLifted: number, repsPerformed: number, xRM: number, active: boolean): number {
  if(!active) {
    return 0;
  }
  const oneRM = weightLifted * Math.pow(repsPerformed, 0.10);
  if(xRM == 1) {
    return Math.floor(oneRM);
  }
  return Math.floor(oneRM / (Math.pow(xRM, 0.10)));
}

function mayhew(weightLifted: number, repsPerformed: number, xRM: number, active: boolean): number {
  if(!active) {
    return 0;
  }
  const oneRM = (weightLifted * 100) / (52.2 + (41.9 * Math.exp(-1 * (repsPerformed * 0.055))));
  if(xRM == 1) {
    return Math.floor(oneRM);
  }
  return Math.floor((oneRM * (52.2 + (41.9 * Math.exp(-1 * (xRM * 0.055))))) / 100);
}

function oconner(weightLifted: number, repsPerformed: number, xRM: number, active: boolean): number {
  if(!active) {
    return 0;
  }
  const oneRM = weightLifted * (1 + (repsPerformed / 40));
  if(xRM == 1) {
    return Math.floor(oneRM);
  }
  return Math.floor(oneRM / (1 + xRM / 40));
}

function wathen(weightLifted: number, repsPerformed: number, xRM: number, active: boolean): number {
  if(!active) {
    return 0;
  }
  const oneRM = (weightLifted * 100) / (48.8 + (53.8 * Math.exp(-1 * (repsPerformed * 0.075))));
  if(xRM == 1) {
    return Math.floor(oneRM);
  }
  return Math.floor((oneRM * (48.8 + (53.8 * Math.exp(-1 * (xRM * 0.075))))) / 100);
}

export default oneRMCalc;
