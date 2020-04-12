const defaultData = {
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
   };

const impact = (data, factor) = data.reportedCases * factor;
const severeCases = (data, factor) = data.currentlyInfected * factor;
const NumberOfBeds = (beds, data) = data.totalHospitalBeds - data.severeCasesByRequestedTime;
const Cases = (cases, factor) = cases.infectionByRequestedTime;


// const estimatePeriod = (timeToElapse, estimator) => {
//     const estimateFor = periodType => () => {
//       const data = {
//         ...defaultData,
//         ...{ timeToElapse, periodType },
//       };
//       return estimator(data);
//     };

//   let PERIOD = {
//         DAYS: "DAYS",
//         WEEKS: "WEEKS * 7",
//         MONTHS: "MONTHS * 30"
//       };
  
//     return {
//       days: estimateFor(PERIOD.DAYS),
//       week: estimateFor(PERIOD.WEEKS),
//       weeks: estimateFor(PERIOD.WEEKS),
//       month: estimateFor(PERIOD.MONTHS),
//       months: estimateFor(PERIOD.MONTHS)
//     };
//   };

const estimatedPeriod = (periodType, timeToElapse){
  let time = periodType;
  time = periodType.toLowerCase();
  switch (time) {
    case 'days': return timeToElapse;
    case 'week': return timeToElapse * 7;
    case 'weeks': return timeToElapse * 7;
    case 'month': return timeToElapse * 30;
    case 'months': return timeToElapse * 30;
    default: return 'Enter correct timePeriod'
  }
};

const covid19ImpactEstimator = (data) => {
    return{
        data,
        impact:{},
        severeImpact:{}
    };
};

export default covid19ImpactEstimator;
