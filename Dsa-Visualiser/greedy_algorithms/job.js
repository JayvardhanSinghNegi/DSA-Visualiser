function runJobSequencing() {
  const input = document.getElementById("jobInput").value.trim().split("\n");
  const jobs = input.map(line => {
    const [id, d, p] = line.split(",").map(x => x.trim());
    return { id, deadline: parseInt(d), profit: parseInt(p) };
  });

  jobs.sort((a, b) => b.profit - a.profit);
  const maxSlot = Math.max(...jobs.map(j => j.deadline));
  const slots = Array(maxSlot).fill(null);

  const selected = [];

  for (let job of jobs) {
    for (let i = job.deadline - 1; i >= 0; i--) {
      if (!slots[i]) {
        slots[i] = job;
        selected.push(job);
        break;
      }
    }
  }

  const timeline = document.getElementById("jobTimeline");
  timeline.innerHTML = "<h3>Scheduled Jobs:</h3>";
  selected.forEach((job, i) => {
    const bar = document.createElement("div");
    bar.className = "activity";
    bar.style.left = (i * 70) + "px";
    bar.style.width = "60px";
    bar.innerText = `${job.id} ($${job.profit})`;
    timeline.appendChild(bar);
  });
}
