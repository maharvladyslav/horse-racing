export function updateWinnerField(element, message) {
  element.textContent = message;
}

export function updateProgressField(element, message) {
  element.textContent = message;
}

export function updateResultsTable(element, { horse, time, raceCounter }) {
  const tr = `<tr><td>${raceCounter}</td><td>${horse}</td><td>${time}</td></tr>`;
  element.insertAdjacentHTML("beforeend", tr);
}
