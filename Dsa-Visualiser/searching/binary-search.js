let array = [];

function generateArray() {
  array = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)).sort((a, b) => a - b);
  renderArray();
  populateDropdown();
}

function renderArray(highlight = -1) {
  const container = document.getElementById("bars-container");
  container.innerHTML = "";
  array.forEach((value, i) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${value * 3}px`;
    bar.title = value;
    if (i === highlight) bar.style.backgroundColor = "orange";
    container.appendChild(bar);
  });
}

function populateDropdown() {
  const dropdown = document.getElementById("target-select");
  dropdown.innerHTML = "";
  array.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.text = value;
    dropdown.appendChild(option);
  });
}

async function startSearch() {
  const target = parseInt(document.getElementById("target-select").value);
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    renderArray(mid);
    await new Promise((res) => setTimeout(res, 300));

    if (array[mid] === target) break;
    else if (array[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
}

function resetArray() {
  generateArray();
}

window.onload = generateArray;
