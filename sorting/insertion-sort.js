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

async function startSort() {
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
      renderArray();
      await new Promise(res => setTimeout(res, 50));
    }
    array[j + 1] = key;
    renderArray();
    await new Promise(res => setTimeout(res, 50));
  }
}

function resetArray() {
  generateArray();
}

window.onload = generateArray;
