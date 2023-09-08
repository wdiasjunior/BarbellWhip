const WeightCalc = {
  getPlates(weight: number, barWeight: number, weightRack: any, bumperRack?: any) {
    const weightOfSingleSidePlates = (weight - barWeight) / 2;

    let platesAux: number[] = []; // keeps track of all plates weights - only used for math
    let plates: Plates[] = []; // array of objets to keeps track of isBumper

    if(bumperRack) { // adds bumper plates before metal plates
      const bumperPlatesAvailable = this.getPlatesAvailableFromRack(bumperRack);
      bumperPlatesAvailable.forEach((plate) => {
        let numPlates = Math.floor(bumperRack[plate] / 2);
        for(let i = 1; i <= numPlates; i++) {
          if(this.sum([...platesAux, plate]) <= weightOfSingleSidePlates) {
            platesAux.push(plate);
            plates.push({
              plate: plate,
              isBumper: true
            });
          } else {
            return;
          }
        }
        return;
      })
    }
    if(weightRack) { // adds the rest of the "metal" plates to the rack
      const platesAvailable = this.getPlatesAvailableFromRack(weightRack);
      platesAvailable.forEach((plate) => {
        let numPlates = Math.floor(weightRack[plate] / 2);
        for(let i = 1; i <= numPlates; i++) {
          if(this.sum([...platesAux, plate]) <= weightOfSingleSidePlates) {
            platesAux.push(plate);
            plates.push({
              plate: plate,
              isBumper: false
            });
          } else {
            return;
          }
        }
        return;
      })
    }

    return plates;
  },

  getPlatesAvailableFromRack(weightRack: any) {
    return Object.keys(weightRack).map((a) => parseFloat(a)).sort((a, b) => a - b).reverse();
  },

  getPlatePercentOfMax(plate: Plates, weightRack: any) {
    const plates = weightRack.map((a) => !a.isBumper ? a.plate : 0).sort((a, b) => a.plate - b.plate).reverse();
    const min = Math.min.apply(null, plates);
    const max = Math.max.apply(null, plates);
    const size =  (plate.plate - min) / (max - min);

    return isNaN(size) ? 1 : size;
  },

  getClosestAvailableWeight(weight: number, barWeight: number, weightRack: any) {
    return this.getTotalWeight(this.getPlates(weight, barWeight, weightRack), barWeight);
  },

  getTotalWeight(plates: Plates[], barWeight: number) {
    // return (plates.length * 2) + barWeight; // TODO - does this also work?
    return (this.sum(plates) * 2) + barWeight;
  },

  sum(arr: any[]) {
    if(arr.length === 0) {
      return 0;
    }
    return arr.reduce((acc, val) => acc + val); // TODO - test if this won't break. my guess is no since it works alread and I just added type annotations
  }
}

export default WeightCalc;
