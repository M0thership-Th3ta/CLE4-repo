/**
 * Beheert score en win condities voor het Fruit Grabber spel
 */
export class ScoreManager {
  constructor() {
    this.score = 0;
    this.targetScore = 100; // Score nodig om te winnen
    this.fruitValues = {
      'lime': 10,
      'lemon': 15,
      'passionfruit': 20
    };
  }

  /**
   * Voeg punten toe voor correct geplaatst fruit
   */
  addScore(fruitType) {
    const points = this.fruitValues[fruitType] || 5;
    this.score += points;
    console.log(`Score: +${points} (Total: ${this.score})`);
  }

  /**
   * Trek punten af voor verkeerd geplaatst fruit
   */
  subtractScore(penalty = 5) {
    this.score = Math.max(0, this.score - penalty);
    console.log(`Score: -${penalty} (Total: ${this.score})`);
  }

  /**
   * Krijg huidige score
   */
  getScore() {
    return this.score;
  }

  /**
   * Check of speler heeft gewonnen
   */
  hasWon() {
    return this.score >= this.targetScore;
  }

  /**
   * Reset score naar 0
   */
  reset() {
    this.score = 0;
  }
}
