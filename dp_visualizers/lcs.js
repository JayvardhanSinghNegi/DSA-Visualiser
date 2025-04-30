function startLCS() {
  const str1 = document.getElementById("str1").value;
  const str2 = document.getElementById("str2").value;
  const m = str1.length, n = str2.length;

  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  const dir = Array.from({ length: m + 1 }, () => Array(n + 1).fill(""));

  const container = document.getElementById("grid");
  container.innerHTML = "";

  // Fill DP table and direction tracker
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        dir[i][j] = "↖"; // match
      } else if (dp[i - 1][j] >= dp[i][j - 1]) {
        dp[i][j] = dp[i - 1][j];
        dir[i][j] = "↑"; // from top
      } else {
        dp[i][j] = dp[i][j - 1];
        dir[i][j] = "←"; // from left
      }
    }
  }

  // Create table with values and directions
  const table = document.createElement("table");
  table.style.margin = "0 auto";
  table.style.borderCollapse = "collapse";

  for (let i = 0; i <= m; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j <= n; j++) {
      const cell = document.createElement("td");
      const val = dp[i][j];
      cell.innerHTML = `<div>${val}</div><div style="font-size:10px; color:gray">${dir[i][j]}</div>`;
      cell.style.border = "1px solid #ccc";
      cell.style.padding = "8px";
      cell.style.textAlign = "center";
      cell.style.width = "40px";
      cell.style.height = "40px";
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  container.appendChild(table);

  // Trace back to find actual LCS
  let i = m, j = n;
  let lcs = "";

  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      lcs = str1[i - 1] + lcs;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  // Show LCS string
  const resultDiv = document.createElement("div");
  resultDiv.style.marginTop = "20px";
  resultDiv.style.fontSize = "18px";
  resultDiv.innerHTML = `<strong>Longest Common Subsequence:</strong> <code>${lcs}</code>`;
  container.appendChild(resultDiv);
}
