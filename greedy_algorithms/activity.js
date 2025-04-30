function runActivitySelection() {
  const input = document.getElementById("activities").value.trim().split("\n");
  const activities = input.map(str => {
    const [start, end] = str.replace(/[()]/g, "").split(",").map(Number);
    return { start, end };
  });

  activities.sort((a, b) => a.end - b.end);
  const selected = [];
  let lastEnd = 0;

  for (let act of activities) {
    if (act.start >= lastEnd) {
      selected.push(act);
      lastEnd = act.end;
    }
  }

  const timeline = document.getElementById("timeline");
  timeline.innerHTML = "<h3>Selected Activities:</h3>";

  selected.forEach(act => {
    const bar = document.createElement("div");
    bar.className = "activity";
    bar.style.left = (act.start * 20) + "px";
    bar.style.width = ((act.end - act.start) * 20) + "px";
    bar.innerText = `(${act.start},${act.end})`;
    timeline.appendChild(bar);
  });
}
