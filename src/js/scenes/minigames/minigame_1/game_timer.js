/**
 * Beheert game timer functionaliteit
 */
export class GameTimer {
  constructor(timeInSeconds = 60) {
    this.totalTime = timeInSeconds * 1000; // Convert naar milliseconden
    this.remainingTime = this.totalTime;
    this.isRunning = false;
  }

  /**
   * Start de timer
   */
  start() {
    this.isRunning = true;
    this.remainingTime = this.totalTime;
  }

  /**
   * Stop de timer
   */
  stop() {
    this.isRunning = false;
  }

  /**
   * Update timer elke frame
   */
  update(delta) {
    if (!this.isRunning) return;

    this.remainingTime -= delta;
    
    if (this.remainingTime <= 0) {
      this.remainingTime = 0;
      this.isRunning = false;
    }
  }

  /**
   * Check of tijd op is
   */
  isTimeUp() {
    return this.remainingTime <= 0;
  }

  /**
   * Krijg resterende tijd in seconden
   */
  getRemainingTimeInSeconds() {
    return Math.ceil(this.remainingTime / 1000);
  }

  /**
   * Krijg resterende tijd als geformatteerde string (MM:SS)
   */
  getFormattedTime() {
    const seconds = this.getRemainingTimeInSeconds();
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  /**
   * Reset timer naar beginwaarde
   */
  reset() {
    this.remainingTime = this.totalTime;
    this.isRunning = false;
  }
}
