import {
  updateWinnerField,
  updateProgressField,
  updateResultsTable,
} from "./dom-helpers.js";
import { getRandomTime } from "./random.js";
import { Timer } from "./timer.js";

const horses = [
  "Secretariat",
  "Eclipse",
  "West Australian",
  "Flying Fox",
  "Seabiscuit",
];

let raceCounter = 0;
const refs = {
  startBtn: document.querySelector(".js-start-race"),
  winnerField: document.querySelector(".js-winner"),
  progressField: document.querySelector(".js-progress"),
  tableBody: document.querySelector(".js-results-table > tbody"),
};

refs.startBtn.addEventListener("click", onStart);

const timer = new Timer({ selector: ".js-start-race" });

function onStart() {
  timer.start();
  refs.startBtn.disabled = true;
  raceCounter += 1;
  const promises = horses.map(run);

  updateWinnerField(refs.winnerField, "");
  updateProgressField(
    refs.progressField,
    "🤖 Заїзд розпочався, ставки не приймаються!"
  );
  determineWinner(promises);
  waitForAll(promises);
}

function determineWinner(horsesP) {
  Promise.race(horsesP).then(({ horse, time }) => {
    updateWinnerField(
      refs.winnerField,
      `🎉 Переможець ${horse}, финишував за ${time}ms
    часу`
    );
    timer.stop();
    updateResultsTable(refs.tableBody, { horse, time, raceCounter });
  });
}

function waitForAll(horsesP) {
  Promise.all(horsesP).then(() => {
    updateProgressField(
      refs.progressField,
      "📝 Заїзд закінчено, принимаются ставки."
    );

    refs.startBtn.disabled = false;

    refs.startBtn.textContent = "Наступний заїзд";
  });
}

function run(horse) {
  return new Promise((resolve) => {
    const time = getRandomTime(2000, 3500);

    setTimeout(() => {
      resolve({ horse, time });
    }, time);
  });
}
