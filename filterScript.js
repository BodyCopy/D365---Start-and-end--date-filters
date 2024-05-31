//Note to self in JS months go from 0 --> 11

// UI stuff
const monthSelect = document.getElementById('month');
const yearSelect = document.getElementById('year');
let yearArray = [];
const startDate = document.getElementById('start-date');
const endDate = document.getElementById('end-date');
const demoInput = document.getElementById('demo-input');

// DEMO DATA
let contractTerms = [
    //how this data is set is causing a bug where if you use the first day of the year it will identify itself as the previous year
    { startDate: new Date('2023-02-02'), endDate: new Date('2023-08-15') },
    { startDate: new Date('2023-03-02'), endDate: new Date('2024-08-15') },
    { startDate: new Date('2024-07-02'), endDate: new Date('2026-08-15') },
    { startDate: new Date('2023-02-02'), endDate: new Date('2025-09-15') }
];

/*
list of months to populate month options.
We use the month integer and the splice method to populate our available months
*/
const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

//sort a list of dates 
function findMinDateAndMaxDate(datesArray) {
    const sortedDates = datesArray.sort((a, b) => a.endDate - b.endDate);
    const firstStartDate = sortedDates[0].startDate;
    const lastEndDate = sortedDates[sortedDates.length - 1].endDate;

    return { sortedList: sortedDates, firstStartDate: firstStartDate, lastEndDate: lastEndDate };
}

const sortedContractTerms = findMinDateAndMaxDate(contractTerms);

/*
Populates the html select elements with the month and year options
REPLACE WITH D365 LOGIC
*/
function addOptionToSelect(element, data) {
    let option = document.createElement('option');
    option.innerHTML = data;
    element.appendChild(option);
}

async function addYearOptions() {
    yearSelect.innerHTML = '';
    let newest = sortedContractTerms.lastEndDate.getFullYear();
    let oldest = sortedContractTerms.firstStartDate.getFullYear();

    yearArray = createDifferenceArray(oldest, newest);
    yearArray.forEach((y) => {
        addOptionToSelect(yearSelect, y);
    })
}

//sortedList,oldest,newest
async function setMonthValues(value) {
    monthSelect.innerHTML = '';
    let oldest = sortedContractTerms.firstStartDate.getFullYear().toString();
    let newest = sortedContractTerms.lastEndDate.getFullYear().toString();
    let monthArray;

    //check if the firstStartDate and lastEndDate are the same year
    if (oldest !== newest) {
        if (value === newest) {
            let month = sortedContractTerms.lastEndDate.getMonth();
            monthArray = months.slice(0, month + 1);
            //updates month options
            monthArray.forEach(m => addOptionToSelect(monthSelect, m));

        } else if (value === oldest) {
            let month = sortedContractTerms.firstStartDate.getMonth();
            monthArray = months.slice(month, 12);
            //updates month options
            monthArray.forEach(m => addOptionToSelect(monthSelect, m));

        } else {
            //updates month options
            months.forEach(m => addOptionToSelect(monthSelect, m));

        }
    } else {
        //If firstStartDate and lastEndDate are the same year splice the month list
        let startMonth = sortedContractTerms.firstStartDate.getMonth();
        let endMonth = sortedContractTerms.lastEndDate.getMonth();
        monthArray = months.slice(startMonth, endMonth + 1);
        //updates month options
        monthArray.forEach(m => addOptionToSelect(monthSelect, m));
    }
}

// addYearOptions();
async function runWithSimulatedDelay() {
    setTimeout(async () => {
        await addYearOptions();
        //Set year selector to this year
        const thisYear = new Date().getFullYear().toString();
        //check if this year is an option
        if (!yearArray.includes(thisYear)) {
            console.log('filtered');
            yearSelect.value = thisYear;
            await setMonthValues(thisYear);
        } else {
            //else use lastEndDate year
            console.log('single year');
            yearSelect.value = sortedContractTerms.lastEndDate.getFullYear().toString()
            await setMonthValues(sortedContractTerms.lastEndDate.getFullYear().toString());
        }

        let newest = sortedContractTerms.lastEndDate;
        let oldest = sortedContractTerms.firstStartDate;
        startDate.querySelector('dd').innerHTML = oldest;
        endDate.querySelector('dd').innerHTML = newest;

    }, 2000);
}

runWithSimulatedDelay();

//WEB INTERACTIONS

yearSelect.addEventListener('change', (e) => {
    let value = e.target.value;
    setMonthValues(value);
})

//HELPER FUNCTIONS

//populate year array from firstStartDate --> lastEndDate
function createDifferenceArray(num1, num2) {
    const diff = num2 - num1;
    const result = new Array(diff + 1).fill().map((_, i) => num1 + i);
    return result;
}