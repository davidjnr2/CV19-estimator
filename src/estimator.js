/* eslint-disable max-len */
import {
  estimateInfectedPeople,
  estimateInfectionsByRequestedTime,
  estimateSeverePositiveCaseRequireHospitalization,
  estimateHospitalBedsByRequestedTime,
  estimateICUCareCases,
  estimateVentilatorCases,
  estimateEconomyLoss
} from './util/index';

import impactFactor from './util/constant';

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

  const currentlyInfectedMildImpact = estimateInfectedPeople(reportedCases, impactFactor.mildImpact);

  const currentlyInfectedSevereImpact = estimateInfectedPeople(reportedCases, impactFactor.severeImpact);

  const infectionsByRequestedTimeMildImpact = estimateInfectionsByRequestedTime(currentlyInfectedMildImpact, timeToElapse, 3, periodType);

  const infectionsByRequestedTimeSevereImpact = estimateInfectionsByRequestedTime(currentlyInfectedSevereImpact, timeToElapse, 3, periodType);

  const severeCasesByRequestedTimeMildImpact = estimateSeverePositiveCaseRequireHospitalization(infectionsByRequestedTimeMildImpact);

  const severeCasesByRequestedTimeSevereImpact = estimateSeverePositiveCaseRequireHospitalization(infectionsByRequestedTimeSevereImpact);

  const hospitalBedsByRequestedTimeMildImpact = estimateHospitalBedsByRequestedTime(
    severeCasesByRequestedTimeMildImpact,
    totalHospitalBeds
  );

  const hospitalBedsByRequestedTimeSevereImpact = estimateHospitalBedsByRequestedTime(severeCasesByRequestedTimeSevereImpact, totalHospitalBeds);

  const casesForICUByRequestedTimeMildImpact = estimateICUCareCases(infectionsByRequestedTimeMildImpact);


  const casesForICUByRequestedTimeSevereImpact = estimateICUCareCases(infectionsByRequestedTimeSevereImpact);


  const casesForVentilatorsByRequestedTimeMildImpact = estimateVentilatorCases(infectionsByRequestedTimeMildImpact);


  const casesForVentilatorsByRequestedTimeSevereImpact = estimateVentilatorCases(infectionsByRequestedTimeSevereImpact);

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
