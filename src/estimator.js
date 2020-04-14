import {
  estimateInfectedPeople,
  estimateInfectionsByRequestedTime,
  estimateSeverePositiveCaseRequireHospitalization,
  estimateHospitalBedsByRequestedTime,
  estimateICUCareCases,
  estimateVentilatorCases,
  estimateEconomyLoss
} from './util/index';

/*
{
    region: {
        name: "Africa",
        avgAge: 19.7,
        avgDailyIncomeInUSD: 5,
        avgDailyIncomePopulation: 0.71
    },
    periodType: "days",
    timeToElapse: 58,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
}
*/


const covid19ImpactEstimator = (data) => {
  const inputData = data;


  const {
    reportedCases,
    periodType,
    timeToElapse,
    totalHospitalBeds,
    region: { avgDailyIncomeInUSD, avgDailyIncomePopulation }
  } = data;

  const currentlyInfectedMildImpact = 
  estimateInfectedPeople(reportedCases, impactFactor.mildImpact);


  const currentlyInfectedSevereImpact = 
  estimateInfectedPeople(reportedCases, impactFactor.severeImpact);


  const infectionsByRequestedTimeMildImpact = 
  estimateInfectionsByRequestedTime(currentlyInfectedMildImpact, 3, periodType);


  const infectionsByRequestedTimeSevereImpact = 
  estimateInfectionsByRequestedTime(currentlyInfectedSevereImpact, 3, periodType);

  // eslint-disable-next-line
  const severeCasesByRequestedTimeMildImpact = 
  estimateSeverePositiveCaseRequireHospitalization(infectionsByRequestedTimeMildImpact);

  // eslint-disable-next-line
  const severeCasesByRequestedTimeSevereImpact = 
  estimateSeverePositiveCaseRequireHospitalization(infectionsByRequestedTimeSevereImpact);

  // eslint-disable-next-line
  const hospitalBedsByRequestedTimeMildImpact = 
  estimateHospitalBedsByRequestedTime(severeCasesByRequestedTimeMildImpact, totalHospitalBeds);

  // eslint-disable-next-line
  const hospitalBedsByRequestedTimeSevereImpact = 
  estimateHospitalBedsByRequestedTime(severeCasesByRequestedTimeSevereImpact, totalHospitalBeds);

  // eslint-disable-next-line
  const casesForICUByRequestedTimeMildImpact = 
  estimateICUCareCases(infectionsByRequestedTimeMildImpact);

  // eslint-disable-next-line
  const casesForICUByRequestedTimeSevereImpact = 
  estimateICUCareCases(infectionsByRequestedTimeSevereImpact);

  // eslint-disable-next-line
  const casesForVentilatorsByRequestedTimeMildImpact = 
  estimateVentilatorCases(infectionsByRequestedTimeMildImpact);

  // eslint-disable-next-line
  const casesForVentilatorsByRequestedTimeSevereImpact = 
  estimateVentilatorCases(infectionsByRequestedTimeSevereImpact);


  const dollarsInFlightMildImpact = estimateEconomyLoss(
    infectionsByRequestedTimeMildImpact,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    timeToElapse,
    periodType
  );

  const dollarsInFlightSevereImpact = estimateEconomyLoss(
    infectionsByRequestedTimeSevereImpact,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    timeToElapse,
    periodType
  );

  return {
    data: inputData,
    impact: {
      currentlyInfected: currentlyInfectedMildImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeMildImpact,
      severeCasesByRequestedTime: severeCasesByRequestedTimeMildImpact,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeMildImpact,
      casesForICUByRequestedTime: casesForICUByRequestedTimeMildImpact,
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeMildImpact,
      dollarsInFlight: dollarsInFlightMildImpact
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevereImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeSevereImpact,
      severeCasesByRequestedTime: severeCasesByRequestedTimeSevereImpact,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeSevereImpact,
      casesForICUByRequestedTime: casesForICUByRequestedTimeSevereImpact,
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeSevereImpact,
      dollarsInFlight: dollarsInFlightSevereImpact

    }
  };
};

export default covid19ImpactEstimator;