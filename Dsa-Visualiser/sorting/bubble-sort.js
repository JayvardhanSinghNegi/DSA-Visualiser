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
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        renderArray();
        await new Promise(r => setTimeout(r, 50));
      }
    }
  }
}

function resetArray() {
  generateArray();
}

window.onload = generateArray;
