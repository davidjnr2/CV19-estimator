import {
  estimateInfectedPeople,
  estimateInfectionsByRequestedTime,
  estimateSeverePositiveCaseRequireHospitalization,
  estimateHospitalBedsByRequestedTime,
  estimateICUCareCases,
  estimateVentilatorCases,
  estimateEconomyLoss,
  impactFactor
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
<<<<<<< HEAD

  const currentlyInfectedSevereImpact = 
  estimateInfectedPeople(reportedCases, impactFactor.severeImpact);

  const infectionsByRequestedTimeMildImpact = 
  estimateInfectionsByRequestedTime(currentlyInfectedMildImpact, 3, periodType);

  const infectionsByRequestedTimeSevereImpact = 
  estimateInfectionsByRequestedTime(currentlyInfectedSevereImpact, 3, periodType);

  const severeCasesByRequestedTimeMildImpact = 
  estimateSeverePositiveCaseRequireHospitalization(infectionsByRequestedTimeMildImpact);

  const severeCasesByRequestedTimeSevereImpact = 
  estimateSeverePositiveCaseRequireHospitalization(infectionsByRequestedTimeSevereImpact);

  const hospitalBedsByRequestedTimeMildImpact = estimateHospitalBedsByRequestedTime(
    severeCasesByRequestedTimeMildImpact,
    totalHospitalBeds
  );

  const hospitalBedsByRequestedTimeSevereImpact = 
  estimateHospitalBedsByRequestedTime(severeCasesByRequestedTimeSevereImpact, totalHospitalBeds);

  const casesForICUByRequestedTimeMildImpact = 
  estimateICUCareCases(infectionsByRequestedTimeMildImpact);

  const casesForICUByRequestedTimeSevereImpact = 
  estimateICUCareCases(infectionsByRequestedTimeSevereImpact);

  const casesForVentilatorsByRequestedTimeMildImpact = 
  estimateVentilatorCases(infectionsByRequestedTimeMildImpact);

=======
  // eslint-disable-next-line
  const currentlyInfectedSevereImpact = 
  estimateInfectedPeople(reportedCases, impactFactor.severeImpact);
  // eslint-disable-next-line
  const infectionsByRequestedTimeMildImpact = 
  estimateInfectionsByRequestedTime(currentlyInfectedMildImpact, 3, periodType);
  // eslint-disable-next-line
  const infectionsByRequestedTimeSevereImpact = 
  estimateInfectionsByRequestedTime(currentlyInfectedSevereImpact, 3, periodType);

  // eslint-disable-next-line
  const severeCasesByRequestedTimeMildImpact = 
  estimateSeverePositiveCaseRequireHospitalization(infectionsByRequestedTimeMildImpact);

  // eslint-disable-next-line
  const severeCasesByRequestedTimeSevereImpact = 
  estimateSeverePositiveCaseRequireHospitalization(infectionsByRequestedTimeSevereImpact);

  // eslint-disable-next-line
  const hospitalBedsByRequestedTimeMildImpact = estimateHospitalBedsByRequestedTime(
    severeCasesByRequestedTimeMildImpact,
    totalHospitalBeds
  );

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
>>>>>>> 8c9a94ab01652259be25372a64fc7a54f1a700f0
  const casesForVentilatorsByRequestedTimeSevereImpact = 
  estimateVentilatorCases(infectionsByRequestedTimeSevereImpact);

  const dollarsInFlightMildImpact = 
  estimateEconomyLoss(
    infectionsByRequestedTimeMildImpact,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    timeToElapse,
    periodType
  );

  const dollarsInFlightSevereImpact = 
  estimateEconomyLoss(
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
