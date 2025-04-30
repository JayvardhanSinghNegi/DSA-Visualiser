function buildHuffman() {
  const input = document.getElementById("inputText").value.trim().split("\\n");
  const nodes = input.map(line => {
    const [char, freq] = line.split(":");
    return { char: char.trim(), freq: parseInt(freq), left: null, right: null };
  });

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq);
    const left = nodes.shift();
    const right = nodes.shift();
    nodes.push({ char: null, freq: left.freq + right.freq, left, right });
  }

  const root = nodes[0];
  const codes = {};
  generateCodes(root, "", codes);

  const codeBox = document.getElementById("codes");
  codeBox.innerHTML = "<h3>Huffman Codes:</h3>";
  for (const char in codes) {
    codeBox.innerHTML += `${char}: <code>${codes[char]}</code><br>`;
  }

  drawHuffmanTree(root);
}

function generateCodes(node, code, codes) {
  if (node.char) {
    codes[node.char] = code;
    return;
  }
  generateCodes(node.left, code + "0", codes);
  generateCodes(node.right, code + "1", codes);
}

function drawHuffmanTree(root) {
  const svg = document.getElementById("svgTree");
  svg.innerHTML = "";
  const nodeRadius = 20;
  const verticalGap = 80;
  const horizontalGap = 30;

  let nextX = 0;
  const positions = new Map();

  function setPositions(node, depth) {
    if (!node) return;

    setPositions(node.left, depth + 1);
    const x = nextX * (nodeRadius * 2 + horizontalGap) + 50;
    const y = depth * verticalGap + 50;
    positions.set(node, { x, y });
    nextX++;
    setPositions(node.right, depth + 1);
  }

  setPositions(root, 0);

  function drawEdges(node) {
    if (!node) return;
    const from = positions.get(node);
    if (node.left) {
      const to = positions.get(node.left);
      svg.innerHTML += `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="#444"/>`;
      drawEdges(node.left);
    }
    if (node.right) {
      const to = positions.get(node.right);
      svg.innerHTML += `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="#444"/>`;
      drawEdges(node.right);
    }
  }

  drawEdges(root);

  for (let [node, pos] of positions.entries()) {
    const label = node.char ? `${node.char} (${node.freq})` : `• (${node.freq})`;
    svg.innerHTML += `
      <circle cx="${pos.x}" cy="${pos.y}" r="${nodeRadius}" fill="#eef" stroke="#333"/>
      <text x="${pos.x}" y="${pos.y + 4}" font-size="12" text-anchor="middle">${label}</text>
    `;
  }

  svg.setAttribute("height", (Math.max(...[...positions.values()].map(p => p.y)) + 100).toString());
}
