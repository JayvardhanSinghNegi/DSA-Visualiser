let array = [];

function generateArray() {
  array = Array.from({ length: 50 }, () => Math.floor(Math.random() * 300) + 20);
  renderArray();
}

function renderArray() {
  const container = document.getElementById("bars-container");
  container.innerHTML = "";
  array.forEach(height => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${height}px`;
    container.appendChild(bar);
  });
}

async function quickSort(arr, low, high) {
  if (low < high) {
    const pi = await partition(arr, low, high);
    await quickSort(arr, low, pi - 1);
    await quickSort(arr, pi + 1, high);
  }
}

async function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      renderArray();
      await new Promise(res => setTimeout(res, 30));
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  renderArray();
  await new Promise(res => setTimeout(res, 30));
  return i + 1;
}

async function startSort() {
  await quickSort(array, 0, array.length - 1);
}

function resetArray() {
  generateArray();
}

window.onload = generateArray;
