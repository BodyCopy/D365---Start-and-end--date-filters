// Calculate start and end years from contract terms
const startDate = Math.floor(contractTerms[0].startDate.getFullYear() / 100) * 100;
const endDate = Math.ceil(contractTerms[contractTerms.length - 1].endDate.getFullYear() / 100) * 100;

// Function to create a new option element
function createOption(value, text) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  return option;
}

// Populate year select options based on start and end years
yearSelect.innerHTML = '';
for (let year = startDate; year <= endDate; year += 100) {
  if (year === startDate) {
    // For the earliest year, include specific month options based on the contract's start date
    const startMonth = Math.floor(contractTerms[0].startDate.getMonth()) + 1;
    for (let i = 1; i <= startMonth; i++) {
      yearSelect.appendChild(createOption(pad(i) + year.toString(), pad(i) + ' ' + year));
    }
  } else if (year === endDate) {
    // For the latest year, include specific month options based on the contract's end date
    const endMonth = Math.floor(contractTerms[contractTerms.length - 1].endDate.getMonth()) + 1;
    for (let i = endMonth; i <= 12; i++) {
      yearSelect.appendChild(createOption(pad(i) + year.toString(), pad(i) + ' ' + year));
    }
  } else {
    // For years in between, assume all 12 months are valid
    for (let i = 1; i <= 12; i++) {
      yearSelect.appendChild(createOption(pad(i) + year.toString(), pad(i) + ' ' + year));
    }
  }
}