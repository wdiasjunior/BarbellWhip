const WeightCalc = {
  getPlates(weight: number, barWeight: number, weightRack: WeightRack, bumperRack?: BumperRack) {
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

  getPlatesAvailableFromRack(weightRack: WeightRack | BumperRack) {
    return Object.keys(weightRack).map((a) => parseFloat(a)).sort((a, b) => a - b).reverse();
  },

  sum(arr: number[]) {
    if(arr.length === 0) {
      return 0;
    }
    return arr.reduce((acc, val) => acc + val);
  }
}

export default WeightCalc;
