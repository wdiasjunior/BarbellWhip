const WeightCalc = {
  getPlates(weight, barWeight, weightRack, bumperRack) {
    const weightOfSingleSidePlates = (weight - barWeight) / 2;

    let plates = [];

    if(bumperRack) { // adds bumper plates at beginning of the array
      const bumperPlatesAvailable = this.getPlatesAvailableFromRack(bumperRack);
      bumperPlatesAvailable.forEach((plate) => {
        let numPlates = Math.floor(bumperRack[plate] / 2);
        for(let i = 1; i <= numPlates; i++) {
          if(this.sum([...plates, plate]) <= weightOfSingleSidePlates) {
            plates.push(plate);
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
          if(this.sum([...plates, plate]) <= weightOfSingleSidePlates) {
            plates.push(plate);
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
    const plates = this.getPlatesAvailableFromRack(weightRack);
    const min = Math.min.apply(null, plates);
    const max = Math.max.apply(null, plates);

    return (weight - min) / (max - min);
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
