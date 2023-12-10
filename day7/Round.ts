import { CamelCardsGame } from "./CamelCardsGame";

type CardCount = { card: string; count: number };

export class Round {
  getPattern(hand: string[], jokerMod?: boolean) {
    const pattern = this.countCards(hand);
    const updatedPattern = jokerMod ? this.jokerModification(pattern) : pattern;
    return updatedPattern
      .map((card) => card.count)
      .sort()
      .reverse()
      .join("");
  }

  private countCards(hand: string[]): CardCount[] {
    return CamelCardsGame.availableCards
      .map((option) => ({
        card: option,
        count: hand.filter((card) => card === option).length,
      }))
      .filter((option) => !!option.count);
  }

  jokerModification(hand: CardCount[]): CardCount[] {
    const numberOfJokers = hand.filter((set) => set.card === "J")[0]?.count;
    if (!numberOfJokers || numberOfJokers === 5) return hand;
    const cardsWithoutJokers = hand.filter((set) => set.card !== "J");
    cardsWithoutJokers.sort((a, b) => {
      if (a.count === b.count) return 0;
      return a.count > b.count ? -1 : 1;
    });

    cardsWithoutJokers[0].count += numberOfJokers;
    return cardsWithoutJokers;
  }
}
