/* @Business case
Too many patients, not enough hospitals and beds. Inadequate ventilators, masks
and other PPEs.
Job losses or freezes, low cash flow and low production (even for essentials like food).
These and more from too many people being sick, a sizable number dying (including some
of the best people in many fields), and many others affected by the impact of losing loved
ones or a world operating in slow motion
*/
/* eslint-disable max-len */
/* @Project Summary  This project empowers you to attempt helping society and leaders prepare for the real big problem
of COVID-19 pandemic, providing insights on its impact on lives, health systems, supply chains, and the economy:
*/

/* @Project functions and estimate */

/*
   Discard the decimal part of all computations. No rounding up or down of
figures, simply discard the decimal part.
   @param { Number } num
   @example : 3.8888888889 should be 3, not 3.88, 3.8 or 4. Also, 453325343.654
becomes 453325343 */

const computeToWholeNumber = (num) => parseFloat(num.toString().split('.')[0]);

/*
@Description This object shows the level of impact by a factor
@params {object} with properties for mildImpact and severeImpact
*/

const impactFactor = {
  mildImpact: 10,
  severeImpact: 50
};
/* eslint-disable max-len */
/**
    * Given the reportedCases and the multipler, this function estimates the number of currently infected
    people.
    * @params {Number} reportedCases
    * @params {Number} multiplier
    * @returns {Number} currentlyInfected
*/

const estimateInfectedPeople = (reportedCases, factor) => {
  const currentlyInfected = reportedCases * factor;
  return currentlyInfected;
};

/* eslint-disable max-len */
/*
    @Description:  Given the parameters(currentlyInfected, duration, frequency(occurence), type(periodType), this function estimates the number of infections for a requested time period

    @params { String } type
    @params { Number } factor
    @params { Number } currentlyInfected
    @params { Number } duration
    @returns { Number }estimatedInfections
*/

const estimateInfectionsByRequestedTime = (currentlyInfected, frequency, periodType) => {
  let days;
  switch (periodType) {
    case 'weeks': Math.trunc(days * 7);
      break;
    case 'months': Math.trunc(days * 30);
      break;
    default: return 'invalid Timespan';
  }
  const factor = Math.trunc(days / frequency);
  const estimatedInfections = Math.trunc(currentlyInfected) * (2 ** factor);
  return estimatedInfections;
};

/* eslint-disable max-len */
/*
    @Description: Given the number of infectionsByRequestedTime, this function calculates the number of patients with servere positive cases
      that require hospitalization.
    @params { Number } infectionsByRequestedTime
    @returns { Number } 15 % of the number of infectionsByRequestedTime
*/
// eslint-disable-next-line
const estimateSeverePositiveCaseRequireHospitalization = (infectionsByRequestedTime) => Math.trunc(infectionsByRequestedTime) * 0.15;

/* eslint-disable max-len */
/*
    @Description: Given the severeCasesByRequestedTime, totalHospitalBeds, this function estimates the available hospital beds(availableBeds) for severe COVID-19 positive patients.
    @params { Number } severeCasesByRequestedTime
    @params { Number } totalHospitalBeds
    @returns { Number } availableBeds
    Positive indicates availability while negative indicates shortages.
*/

const estimateHospitalBedsByRequestedTime = (severeCasesByRequestedTime, totalHospitalBeds) => {
  // const requiredNumberOfBeds = parseFloat(severeCasesByRequestedTime);
  const expectedBedsAvailable = totalHospitalBeds * 0.35;
  const occupied = totalHospitalBeds * 0.65;
  const availableBeds = Math.trunc(expectedBedsAvailable - severeCasesByRequestedTime);
  if (availableBeds < 0) {
    return computeToWholeNumber(occupied);
  }

  return computeToWholeNumber(availableBeds);
};


/*
    @Description: Given the infectionsByRequestedTime, this function estimates the number of COVID-19 infected patients
      that would require ICU care
    @params { Number } infectionsByRequestedTime
    @returns { Number } numberOfICUCareCases
*/

const estimateICUCareCases = (infectionsByRequestedTime) => {
  const numberOfICUCareCases = infectionsByRequestedTime * 0.05;
  return computeToWholeNumber(numberOfICUCareCases);
};


/*
    @Description: Given the infectionsByRequestedTime, this function estimates the number of severe positive
cases that will require ventilators.
    @params { Number } infectionsByRequestedTime
    @returns { Number } numberOfVentilatorCases
*/

const estimateVentilatorCases = (infectionsByRequestedTime) => {
  const numberOfVentilatorCases = infectionsByRequestedTime * 0.02;
  return computeToWholeNumber(numberOfVentilatorCases);
};

/* eslint-disable max-len */
/*
    @Description: Given the infectionsByRequestedTime, avgDailyIncomeInUSD, avgDailyIncomePopulation, duration, type, this function estimates the amount an economy losses over a period of time
      in relation to infected patients
    @params { Number } infectionsByRequestedTime
    @params { Number } avgDailyIncomePopulation
    @params { Number } avgDailyIncomeInUSD
    @params { String } type  values : 'days' || 'week'|| 'weeks' || 'month' ||'months'
    @returns { Number } numberOfVentilatorCases
*/

// eslint-disable-next-line
const estimateEconomyLoss = (infectionsByRequestedTime, avgDailyIncomeInUSD, avgDailyIncomePopulation, periodType) => {
  let days;
  switch (periodType) {
    case 'weeks': Math.trunc(days * 7);
      break;
    case 'months': Math.trunc(days * 30);
      break;
    default: return 'invalid Timespan';
  }
  // eslint-disable-next-line
  const estimateEconomyLoss = (infectionsByRequestedTime * avgDailyIncomeInUSD * avgDailyIncomePopulation) / days;
  return computeToWholeNumber(estimateEconomyLoss);
};


export {
  impactFactor,
  estimateInfectedPeople,
  estimateInfectionsByRequestedTime,
  estimateSeverePositiveCaseRequireHospitalization,
  estimateHospitalBedsByRequestedTime,
  estimateICUCareCases,
  estimateVentilatorCases,
  estimateEconomyLoss,
  computeToWholeNumber
};
