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
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      renderArray();
      await new Promise(res => setTimeout(res, 50));
    }
  }
}

function resetArray() {
  generateArray();
}

window.onload = generateArray;
