// Lunch line monitor
// Shows how long the line is and what's sold out, so people know before they get in line.

// ---------- DATA: where the information comes from ----------

// The menu comes from our food truck's company database (week 7).
const MENU_URL = "https://profalexbutler.github.io/mgis130-company/data/menu.json";
// The line comes from this repo. The cashier updates it.
const LINE_URL = "data/line.json";

async function loadData() {
  const menu = await fetch(MENU_URL, { cache: "no-store" }).then(function (r) { return r.json(); });
  const line = await fetch(LINE_URL, { cache: "no-store" }).then(function (r) { return r.json(); });
  return { menu: menu, line: line };
}

// ---------- PROCESSING: the rules ----------

// Wait = orders ahead of you x minutes per order
function estimateWait(line) {
  return line.ordersWaiting * line.minutesPerOrder;
}

// Split the menu into what you can order and what's gone
function splitMenu(menu) {
  return {
    available: menu.filter(function (item) { return item.available; }),
    soldOut: menu.filter(function (item) { return !item.available; })
  };
}

function formatPrice(price) {
  return "$" + price.toFixed(2);
}

// ---------- PRESENTATION: what people see ----------

function showWait(minutes, line) {
  const time = document.getElementById("wait-time");
  const detail = document.getElementById("wait-detail");
  if (minutes === 0) {
    time.textContent = "No wait";
    detail.textContent = "Walk right up";
  } else {
    time.textContent = "About " + minutes + " min";
    detail.textContent = line.ordersWaiting + " orders ahead of you";
  }
}

function showMenu(items) {
  const list = document.getElementById("menu");
  list.innerHTML = "";
  items.forEach(function (item) {
    const li = document.createElement("li");
    li.innerHTML = "<span>" + item.name + "</span><span>" + formatPrice(item.price) + "</span>";
    list.appendChild(li);
  });
}

function showSoldOut(items) {
  const list = document.getElementById("soldout");
  list.innerHTML = "";
  if (items.length === 0) {
    list.innerHTML = "<li>Nothing yet</li>";
    return;
  }
  items.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = item.name;
    list.appendChild(li);
  });
}

function showUpdated(line) {
  document.getElementById("updated").textContent = "Line count updated " + line.updatedAt + ". This screen refreshes every 30 seconds.";
}

function showError() {
  document.getElementById("wait-time").textContent = "Can't load right now";
  document.getElementById("wait-detail").textContent = "Ask at the window";
}

// ---------- RUN IT ----------

async function start() {
  try {
    const data = await loadData();
    const parts = splitMenu(data.menu);
    showWait(estimateWait(data.line), data.line);
    showMenu(data.menu);
    showSoldOut(parts.soldOut);
    showUpdated(data.line);
  } catch (err) {
    showError();
  }
}

start();
setInterval(start, 30000);
