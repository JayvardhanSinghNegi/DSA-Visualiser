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

async function mergeSort(arr, start, end) {
  if (start >= end) return;

  const mid = Math.floor((start + end) / 2);
  await mergeSort(arr, start, mid);
  await mergeSort(arr, mid + 1, end);
  await merge(arr, start, mid, end);
}

async function merge(arr, start, mid, end) {
  let left = arr.slice(start, mid + 1);
  let right = arr.slice(mid + 1, end + 1);
  let i = 0, j = 0, k = start;

  while (i < left.length && j < right.length) {
    arr[k++] = left[i] <= right[j] ? left[i++] : right[j++];
    renderArray();
    await new Promise(res => setTimeout(res, 30));
  }

  while (i < left.length) {
    arr[k++] = left[i++];
    renderArray();
    await new Promise(res => setTimeout(res, 30));
  }

  while (j < right.length) {
    arr[k++] = right[j++];
    renderArray();
    await new Promise(res => setTimeout(res, 30));
  }
}

async function startSort() {
  await mergeSort(array, 0, array.length - 1);
}

function resetArray() {
  generateArray();
}

window.onload = generateArray;
