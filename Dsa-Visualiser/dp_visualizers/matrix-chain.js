function startMCM() {
  const dims = document.getElementById("dims").value.split(",").map(Number);
  const n = dims.length - 1;
  const m = Array.from({ length: n }, () => Array(n).fill(0));
  const s = Array.from({ length: n }, () => Array(n).fill(-1));

  // Fill DP table
  for (let l = 2; l <= n; l++) {
    for (let i = 0; i <= n - l; i++) {
      const j = i + l - 1;
      m[i][j] = Infinity;
      for (let k = i; k < j; k++) {
        const q = m[i][k] + m[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1];
        if (q < m[i][j]) {
          m[i][j] = q;
          s[i][j] = k;
        }
      }
    }
  }

  // Reconstruct optimal order
  function printOptimalParens(i, j) {
    if (i === j) return `A${i + 1}`;
    return `(${printOptimalParens(i, s[i][j])} × ${printOptimalParens(s[i][j] + 1, j)})`;
  }

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <h3>Optimal Parenthesization:</h3>
    <p><code>${printOptimalParens(0, n - 1)}</code></p>
    <strong>Minimum Cost:</strong> ${m[0][n - 1]}
  `;
}
