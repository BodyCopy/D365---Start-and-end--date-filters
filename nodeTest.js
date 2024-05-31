const contractTerms = [
    { startDate: new Date('2020-02-01'), endDate: new Date('2020-06-30') },
    { startDate: new Date('2020-07-01'), endDate: new Date('2021-03-31') },
    { startDate: new Date('2020-07-01'), endDate: new Date('2021-03-31') },
    { startDate: new Date('2020-07-01'), endDate: new Date('2021-03-31') },
    { startDate: new Date('2020-07-01'), endDate: new Date('2023-03-31') },
    { startDate: new Date('2022-07-01'), endDate: new Date('2024-04-31') },
    { startDate: new Date('2022-07-01'), endDate: new Date('2024-08-31') },
    // Add more documents as needed...
];
const months = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];
function findMinDateAndMaxDate(datesArray) {
    const sortedDates = datesArray.sort((a, b) => a.endDate - b.endDate);
    const oldestDate = sortedDates[0].startDate;
    const newestDate = sortedDates[sortedDates.length - 1].endDate;

    return { sortedList: sortedDates, oldest: oldestDate, newest: newestDate};
}
console.log(findMinDateAndMaxDate(contractTerms));

