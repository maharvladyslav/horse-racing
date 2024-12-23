export class Timer {
  constructor({ selector }) {
    this.clockface = document.querySelector(selector);
    this.intervalId = null;
    this.isActive = false;
    this.startTime = null;
  }

  start() {
    if (!this.clockface) {
      throw new Error("В HTML не існує елемента за таким селекторм");
    }

    if (this.isActive) return;

    this.isActive = true;
    this.startTime = Date.now();

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - this.startTime;
      const time = this.formatTime(deltaTime);
      this.updateTime(time);
    }, 10);
  }
  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.isActive = false;
    this.startTime = null;
  }

  formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const msecond = ms % 1000;
    return { days, hours, minutes, seconds, msecond };
  }
  updateTime({ days, hours, minutes, seconds, msecond }) {
    const formattedTime = `${seconds.toString().padStart(2, "0")}:${msecond
      .toString()
      .padStart(3, "0")}`;
    this.clockface.textContent = formattedTime;
  }
}
