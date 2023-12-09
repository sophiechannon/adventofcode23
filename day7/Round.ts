import { CamelCardsGame } from "./CamelCardsGame";

export class Round {
  getPattern(hand: string[]) {
    return this.countCards(hand).join("");
  }

  private countCards(hand: string[]): number[] {
    const res: number[] = [];
    return CamelCardsGame.availableCards
      .map((option) => hand.filter((card) => card === option).length)
      .filter((option) => !!option)
      .sort((a, b) => a - b);
  }
}
