function runKnapsack() {
  const weights = document.getElementById("weights").value.split(",").map(Number);
  const values = document.getElementById("values").value.split(",").map(Number);
  const capacity = parseInt(document.getElementById("capacity").value);

  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  // Build DP table
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          dp[i - 1][w - weights[i - 1]] + values[i - 1]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  // Trace selected items
  let w = capacity;
  let selectedItems = [];
  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selectedItems.push(i - 1);
      w -= weights[i - 1];
    }
  }

  selectedItems.reverse();

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <h3>Selected Items</h3>
    <ul>
      ${selectedItems.map(i => `<li>Item #${i + 1} → Weight: ${weights[i]}, Value: ${values[i]}</li>`).join("")}
    </ul>
    <strong>Total Weight:</strong> ${selectedItems.reduce((sum, i) => sum + weights[i], 0)}<br>
    <strong>Total Value:</strong> ${selectedItems.reduce((sum, i) => sum + values[i], 0)}
  `;
}
