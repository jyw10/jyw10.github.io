const STORAGE_KEY = "iogii-arena-v1";

const problems = [
  {
    id: "hello",
    title: "Hello, iogii!",
    level: "Warm-up",
    points: 100,
    lede: "Start with the smallest possible contract: produce one exact line of text.",
    copy: `
      <p>Write an iogii program that outputs <code>Hello, world!</code> exactly. The program receives no input.</p>
      <h3>Output</h3>
      <p>The required greeting. Capitalization and punctuation matter.</p>
    `,
    starter: `"Hello, world!`,
    sampleInput: "(empty)",
    sampleOutput: "Hello, world!",
    customInput: "",
    tests: [{ name: "Greeting", input: "", expected: "Hello, world!" }]
  },
  {
    id: "reverse",
    title: "Mirror text",
    level: "Easy",
    points: 150,
    lede: "Turn the incoming string around without changing any of its characters.",
    copy: `
      <p>The input is a single string. Output the same string in reverse order.</p>
      <h3>Input</h3>
      <p>One non-empty line of plain text.</p>
      <h3>Output</h3>
      <p>The reversed string, with no extra decoration.</p>
    `,
    starter: `# Input is placed on the stack automatically\nreverse`,
    sampleInput: "iogii",
    sampleOutput: "iigoi",
    customInput: "iogii",
    tests: [
      { name: "Language name", input: "iogii", expected: "iigoi" },
      { name: "Palindrome", input: "racecar", expected: "racecar" },
      { name: "Mixed text", input: "code golf", expected: "flog edoc" }
    ]
  },
  {
    id: "sum",
    title: "Vector sum",
    level: "Easy",
    points: 200,
    lede: "Reduce a vector of integers to a single total—the classic iogii one-op problem.",
    copy: `
      <p>The input is a comma-separated vector of integers. Output the sum of every element.</p>
      <h3>Input</h3>
      <p>A vector containing at least one integer.</p>
      <h3>Hint</h3>
      <p>The long-form operation is <code>sum</code>; its one-byte form is <code>_</code>.</p>
    `,
    starter: `_`,
    sampleInput: "1,2,3,4",
    sampleOutput: "10",
    customInput: "1,2,3,4",
    tests: [
      { name: "First four", input: "1,2,3,4", expected: "10" },
      { name: "Tens", input: "10,20,30", expected: "60" },
      { name: "Pair", input: "42,0", expected: "42" },
      { name: "Zeros", input: "0,0,0,0,0", expected: "0" }
    ]
  },
  {
    id: "fibonacci",
    title: "Fibonacci window",
    level: "Intermediate",
    points: 300,
    lede: "Generate the lazy Fibonacci sequence, then keep exactly as many values as requested.",
    copy: `
      <p>The input is an integer <code>n</code>. Output the first <code>n</code> Fibonacci numbers, beginning with <code>1, 1</code>, one per line.</p>
      <h3>Constraints</h3>
      <p><code>1 ≤ n ≤ 15</code>. Your program should derive the sequence rather than print a fixed answer.</p>
    `,
    starter: `# expand mdup 1 cons + > input take\nke;1c+`,
    sampleInput: "7",
    sampleOutput: "1\n1\n2\n3\n5\n8\n13",
    customInput: "7",
    tests: [
      { name: "One value", input: "1", expected: "1" },
      { name: "Seven values", input: "7", expected: "1\n1\n2\n3\n5\n8\n13" },
      { name: "Ten values", input: "10", expected: "1\n1\n2\n3\n5\n8\n13\n21\n34\n55" }
    ]
  },
  {
    id: "primes",
    title: "Prime cut-off",
    level: "Intermediate",
    points: 350,
    lede: "Filter the counting numbers and emit every prime strictly below the input limit.",
    copy: `
      <p>The input is an integer <code>n</code>. Output every prime number smaller than <code>n</code>, one per line.</p>
      <h3>Constraints</h3>
      <p><code>3 ≤ n ≤ 50</code>. The browser runner applies a short execution limit.</p>
    `,
    starter: `# pred countTo succ dup mdup repeat pred countTo tail mod prod filter\n(}):;r(}t%.v`,
    sampleInput: "12",
    sampleOutput: "2\n3\n5\n7\n11",
    customInput: "12",
    tests: [
      { name: "Below twelve", input: "12", expected: "2\n3\n5\n7\n11" },
      { name: "Below twenty-five", input: "25", expected: "2\n3\n5\n7\n11\n13\n17\n19\n23" },
      { name: "Small bound", input: "4", expected: "2\n3" }
    ]
  }
];

const els = {
  list: document.querySelector("#problem-list"),
  number: document.querySelector("#problem-number"),
  difficulty: document.querySelector("#difficulty"),
  points: document.querySelector("#points"),
  title: document.querySelector("#problem-title"),
  lede: document.querySelector("#problem-lede"),
  copy: document.querySelector("#problem-copy"),
  sampleInput: document.querySelector("#sample-input"),
  sampleOutput: document.querySelector("#sample-output"),
  editor: document.querySelector("#code-editor"),
  byteCount: document.querySelector("#byte-count"),
  customInput: document.querySelector("#custom-input"),
  customOutput: document.querySelector("#custom-output"),
  results: document.querySelector("#judge-results"),
  progressCount: document.querySelector("#progress-count"),
  progressBar: document.querySelector("#progress-bar"),
  runtimeFrame: document.querySelector("#iogii-runtime"),
  runtimeChip: document.querySelector("#runtime-chip"),
  runtimeLabel: document.querySelector("#runtime-label"),
  runButton: document.querySelector("#run-button"),
  submitButton: document.querySelector("#submit-button"),
  resetButton: document.querySelector("#reset-button"),
  toast: document.querySelector("#toast")
};

const tabs = {
  input: { button: document.querySelector("#input-tab"), view: document.querySelector("#input-view") },
  output: { button: document.querySelector("#output-tab"), view: document.querySelector("#output-view") },
  results: { button: document.querySelector("#results-tab"), view: document.querySelector("#results-view") }
};

let state = loadState();
let activeProblem = problems.find((problem) => problem.id === state.active) || problems[0];
let runtimeReady = false;
let runtimePromise;
let busy = false;
let toastTimer;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    return {
      active: typeof saved.active === "string" ? saved.active : problems[0].id,
      solved: Array.isArray(saved.solved) ? saved.solved : [],
      solutions: saved.solutions && typeof saved.solutions === "object" ? saved.solutions : {}
    };
  } catch {
    return { active: problems[0].id, solved: [], solutions: {} };
  }
}

function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeOutput(value) {
  return String(value).replaceAll("\r\n", "\n").replace(/[\t ]+$/gm, "").trimEnd();
}

function updateBytes() {
  const bytes = new Blob([els.editor.value]).size;
  els.byteCount.textContent = `${bytes} ${bytes === 1 ? "byte" : "bytes"}`;
}

function renderProblemList() {
  els.list.innerHTML = problems.map((problem, index) => {
    const active = problem.id === activeProblem.id;
    const solved = state.solved.includes(problem.id);
    return `
      <button class="problem-item${active ? " is-active" : ""}${solved ? " is-solved" : ""}" type="button" data-problem="${problem.id}"${active ? ' aria-current="true"' : ""}>
        <span class="problem-item-index">${String(index + 1).padStart(2, "0")}</span>
        <span>
          <span class="problem-item-title">${problem.title}</span>
          <span class="problem-item-level">${problem.level} · ${problem.points} pts</span>
        </span>
        <span class="problem-state" aria-label="${solved ? "Solved" : "Not solved"}">✓</span>
      </button>
    `;
  }).join("");

  els.list.querySelectorAll("[data-problem]").forEach((button) => {
    button.addEventListener("click", () => selectProblem(button.dataset.problem));
  });
}

function renderProgress() {
  const solved = state.solved.length;
  els.progressCount.textContent = `${solved}/${problems.length}`;
  els.progressBar.style.width = `${(solved / problems.length) * 100}%`;
}

function selectProblem(id) {
  saveCurrentSolution();
  activeProblem = problems.find((problem) => problem.id === id) || problems[0];
  state.active = activeProblem.id;
  saveState();

  const index = problems.indexOf(activeProblem);
  els.number.textContent = String(index + 1).padStart(2, "0");
  els.difficulty.textContent = activeProblem.level;
  els.points.textContent = `${activeProblem.points} pts`;
  els.title.textContent = activeProblem.title;
  els.lede.textContent = activeProblem.lede;
  els.copy.innerHTML = activeProblem.copy;
  els.sampleInput.textContent = activeProblem.sampleInput;
  els.sampleOutput.textContent = activeProblem.sampleOutput;
  els.editor.value = state.solutions[activeProblem.id] ?? activeProblem.starter;
  els.editor.dataset.problem = activeProblem.id;
  els.customInput.value = activeProblem.customInput;
  els.customOutput.textContent = "Run your solution to see output.";
  els.results.innerHTML = "<p>No submission yet.</p>";
  updateBytes();
  renderProblemList();
  setTab("input");
}

function saveCurrentSolution() {
  const problemId = els.editor.dataset.problem;
  if (!problemId) return;
  state.solutions[problemId] = els.editor.value;
  saveState();
}

function setTab(name) {
  Object.entries(tabs).forEach(([key, tab]) => {
    const active = key === name;
    tab.button.classList.toggle("is-active", active);
    tab.button.setAttribute("aria-selected", String(active));
    tab.view.hidden = !active;
  });
}

function showToast(message, type = "") {
  window.clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.className = `toast is-visible${type ? ` is-${type}` : ""}`;
  toastTimer = window.setTimeout(() => { els.toast.className = "toast"; }, 3200);
}

function setRuntimeState(status, label) {
  els.runtimeChip.dataset.state = status;
  els.runtimeLabel.textContent = label;
}

function waitForRuntime() {
  if (runtimeReady) return Promise.resolve();
  if (runtimePromise) return runtimePromise;

  runtimePromise = new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error("The WebAssembly runtime took too long to load.")), 30000);

    const inspect = () => {
      try {
        const frameWindow = els.runtimeFrame.contentWindow;
        const frameDocument = els.runtimeFrame.contentDocument;
        const status = frameDocument?.querySelector("#status")?.textContent.trim();
        if (typeof frameWindow?.run_ruby_iogii === "function" && status === "") {
          window.clearTimeout(timeout);
          runtimeReady = true;
          setRuntimeState("ready", "iogii 1.2.1 ready");
          resolve();
          return;
        }
      } catch (error) {
        window.clearTimeout(timeout);
        reject(error);
        return;
      }
      window.setTimeout(inspect, 120);
    };

    if (els.runtimeFrame.contentDocument?.readyState === "complete") inspect();
    else els.runtimeFrame.addEventListener("load", inspect, { once: true });
  }).catch((error) => {
    setRuntimeState("error", "Runtime failed to load");
    throw error;
  });

  return runtimePromise;
}

async function executeIogii(source, input) {
  await waitForRuntime();

  const frameWindow = els.runtimeFrame.contentWindow;
  const frameDocument = els.runtimeFrame.contentDocument;
  const program = frameDocument.querySelector("#program");
  const inputsContainer = frameDocument.querySelector("#inputsContainer");
  const inputBoxes = [...inputsContainer.querySelectorAll("textarea")];

  inputBoxes.slice(1).forEach((box) => box.closest(".textarea-row")?.remove());
  program.value = source;
  inputBoxes[0].value = input;
  frameDocument.querySelector("#prettyprintbox").checked = false;
  frameDocument.querySelector("#stdinbox").checked = false;
  frameDocument.querySelector("#output").value = "";
  setRuntimeState("loading", "Running in WebAssembly");

  const execution = frameWindow.run_ruby_iogii();
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = window.setTimeout(() => reject(new Error("Execution exceeded the browser time limit.")), 10000);
  });

  try {
    await Promise.race([execution, timeout]);
  } finally {
    window.clearTimeout(timeoutId);
  }
  setRuntimeState("ready", "iogii 1.2.1 ready");
  return frameDocument.querySelector("#output").value;
}

function setBusy(nextBusy) {
  busy = nextBusy;
  els.runButton.disabled = busy;
  els.submitButton.disabled = busy;
  els.runButton.innerHTML = busy ? "Running…" : '<span aria-hidden="true">▶</span> Run custom';
}

async function runCustom() {
  if (busy) return;
  saveCurrentSolution();
  setBusy(true);
  setTab("output");
  els.customOutput.textContent = "Running…";

  try {
    const output = await executeIogii(els.editor.value, els.customInput.value);
    els.customOutput.textContent = output || "(no output)";
  } catch (error) {
    els.customOutput.textContent = `Runtime error: ${error.message}`;
    setRuntimeState("error", "Runtime error");
  } finally {
    setBusy(false);
  }
}

function renderJudgeResults(results) {
  const passed = results.filter((result) => result.pass).length;
  const allPassed = passed === results.length;
  const rows = results.map((result, index) => {
    const detail = result.pass ? "" : `
      <div class="failure-detail">
        <pre>Expected\n${escapeHtml(result.expected || "(no output)")}</pre>
        <pre>Received\n${escapeHtml(result.actual || "(no output)")}</pre>
      </div>
    `;
    return `
      <div class="test-row ${result.pass ? "is-pass" : "is-fail"}">
        <span>Test ${index + 1} · ${escapeHtml(result.name)}</span>
        <strong>${result.pass ? "PASSED" : "FAILED"}</strong>
        ${detail}
      </div>
    `;
  }).join("");

  els.results.innerHTML = `
    <div class="result-summary ${allPassed ? "is-pass" : "is-fail"}">
      <span>${allPassed ? "Accepted" : "Not accepted"}</span>
      <span>${passed}/${results.length} tests</span>
    </div>
    ${rows}
  `;
  return allPassed;
}

async function submitSolution() {
  if (busy) return;
  saveCurrentSolution();
  setBusy(true);
  setTab("results");
  els.results.innerHTML = "<p>Judging test 1…</p>";
  const results = [];

  try {
    for (const [index, test] of activeProblem.tests.entries()) {
      els.results.innerHTML = `<p>Judging test ${index + 1} of ${activeProblem.tests.length}…</p>`;
      const actual = normalizeOutput(await executeIogii(els.editor.value, test.input));
      const expected = normalizeOutput(test.expected);
      results.push({ ...test, actual, expected, pass: actual === expected });
    }

    const accepted = renderJudgeResults(results);
    if (accepted) {
      if (!state.solved.includes(activeProblem.id)) state.solved.push(activeProblem.id);
      saveState();
      renderProblemList();
      renderProgress();
      showToast(`Accepted · ${activeProblem.points} points`, "success");
    } else {
      showToast("Some tests did not pass yet.", "error");
    }
  } catch (error) {
    results.push({ name: "Runtime", input: "", expected: "Completed execution", actual: error.message, pass: false });
    renderJudgeResults(results);
    setRuntimeState("error", "Runtime error");
    showToast(error.message, "error");
  } finally {
    setBusy(false);
  }
}

Object.entries(tabs).forEach(([name, tab]) => tab.button.addEventListener("click", () => setTab(name)));

els.editor.addEventListener("input", () => {
  updateBytes();
  saveCurrentSolution();
});

els.editor.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    const start = els.editor.selectionStart;
    const end = els.editor.selectionEnd;
    els.editor.setRangeText("  ", start, end, "end");
    updateBytes();
  }
});

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    event.preventDefault();
    submitSolution();
  }
});

els.runButton.addEventListener("click", runCustom);
els.submitButton.addEventListener("click", submitSolution);
els.resetButton.addEventListener("click", () => {
  if (!window.confirm("Reset this solution to its starter code?")) return;
  els.editor.value = activeProblem.starter;
  saveCurrentSolution();
  updateBytes();
  showToast("Starter code restored.");
});

selectProblem(activeProblem.id);
renderProgress();
waitForRuntime().catch((error) => showToast(error.message, "error"));
