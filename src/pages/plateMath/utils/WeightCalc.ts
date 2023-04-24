const WeightCalc = {
  getPlates(weight, barWeight, weightRack, bumperRack) {
    const weightOfSingleSidePlates = (weight - barWeight) / 2;

    let platesAux = []; // keeps track of all plates weights - only used for math
    let plates = []; // array of objets that keeps track of bumper data

    if(bumperRack) { // adds bumper plates at beginning of the array
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

  getPlatesAvailableFromRack(weightRack) {
    return Object.keys(weightRack).map((a) => parseFloat(a)).sort((a, b) => a - b).reverse();
  },

  getPlatePercentOfMax(weight, weightRack) {
    const plates = weightRack.map((a) => !a.isBumper ? a.plate : 0).sort((a, b) => a.plate - b.plate).reverse();
    // console.log("----------plates", plates);
    // funtion kinda broken after adding bumper plates rack funcitonality
    // TODO - fix this? decided to set the size manually and seems to work fine
    const min = Math.min.apply(null, plates);
    const max = Math.max.apply(null, plates);
    const size =  (weight.plate - min) / (max - min);

    return isNaN(size) ? 1 : size; // 180kg returns NaN wtf?
  },

  getClosestAvailableWeight(weight, barWeight, weightRack) {
    return this.getTotalWeight(this.getPlates(weight, barWeight, weightRack), barWeight);
  },

  getTotalWeight(plates, barWeight) {
    return (this.sum(plates) * 2) + barWeight;
  },

  sum(arr) {
    if(arr.length === 0) {
      return 0;
    }
    return arr.reduce((acc, val) => acc + val);
  }
}

export default WeightCalc;
