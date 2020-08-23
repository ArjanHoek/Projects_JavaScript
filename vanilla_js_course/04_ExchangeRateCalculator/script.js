const selectFrom = document.getElementById('select-from');
const selectTo = document.getElementById('select-to');
const input = document.getElementById('input');
const output = document.getElementById('output');
const swapButton = document.getElementById('swap-button');
const rate = document.getElementById('rate');

fetch('https://api.exchangeratesapi.io/latest')
  .then(response => response.json())
  .then(data => {
    appendElements(selectFrom, createOptions(data));
    appendElements(selectTo, createOptions(data));
  });

const appendElements = (parent, children) =>
  children.forEach(child => parent.appendChild(child));

const createOptions = data => {
  return Object.entries(data.rates)
    .concat([[data.base, '1']])
    .sort()
    .map(item => {
      const option = document.createElement('option');
      option.innerHTML = item[0];
      option.value = item[1];
      return option;
    });
};

const calculateOutput = () => {
  const calulcatedValue = (input.value / selectFrom.value) * selectTo.value;
  output.innerHTML = calulcatedValue.toFixed(2);
  rate.innerHTML = (selectTo.value / selectFrom.value).toFixed(2);
};

const swap = () => {
  const fromOld = selectFrom.value;
  selectFrom.value = selectTo.value;
  selectTo.value = fromOld;
};

input.addEventListener('input', calculateOutput);
selectFrom.addEventListener('change', calculateOutput);
selectTo.addEventListener('change', calculateOutput);
swapButton.addEventListener('click', () => {
  swap();
  calculateOutput();
});
