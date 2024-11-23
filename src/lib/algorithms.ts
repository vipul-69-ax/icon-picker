export type Choice = 'cooperate' | 'steal';
export type Algorithm = (history: Choice[], opponentHistory: Choice[]) => Choice;

const randomChoice = (): Choice => Math.random() < 0.5 ? 'cooperate' : 'steal';

export const algorithms: Record<string, Algorithm> = {
  AlwaysCooperate: () => 'cooperate',
  AlwaysSteal: () => 'steal',
  Random: () => randomChoice(),
  TitForTat: (_, opponentHistory) => opponentHistory.length === 0 ? 'cooperate' : opponentHistory[opponentHistory.length - 1],
  GrudgerTitForTat: (_, opponentHistory) => opponentHistory.includes('steal') ? 'steal' : 'cooperate',
  SuspiciousTitForTat: (_, opponentHistory) => opponentHistory.length === 0 ? 'steal' : opponentHistory[opponentHistory.length - 1],
  TitForTwoTats: (_, opponentHistory) => {
    if (opponentHistory.length < 2) return 'cooperate';
    return opponentHistory.slice(-2).every(choice => choice === 'steal') ? 'steal' : 'cooperate';
  },
  Pavlov: (history, opponentHistory) => {
    if (history.length === 0) return 'cooperate';
    const lastRound = history[history.length - 1] === opponentHistory[opponentHistory.length - 1];
    return lastRound ? 'cooperate' : 'steal';
  },
  SoftMajority: (_, opponentHistory) => {
    if (opponentHistory.length === 0) return 'cooperate';
    const cooperateCount = opponentHistory.filter(choice => choice === 'cooperate').length;
    return cooperateCount >= opponentHistory.length / 2 ? 'cooperate' : 'steal';
  },
  HardMajority: (_, opponentHistory) => {
    if (opponentHistory.length === 0) return 'steal';
    const cooperateCount = opponentHistory.filter(choice => choice === 'cooperate').length;
    return cooperateCount > opponentHistory.length / 2 ? 'cooperate' : 'steal';
  },
  GradualTitForTat: (history, opponentHistory) => {
    if (opponentHistory.length === 0) return 'cooperate';
    const defectionCount = opponentHistory.filter(choice => choice === 'steal').length;
    return Math.random() < (1 - defectionCount / opponentHistory.length) ? 'cooperate' : 'steal';
  },
  AdaptiveTitForTat: (history, opponentHistory) => {
    if (opponentHistory.length < 10) return 'cooperate';
    const recentOpponentHistory = opponentHistory.slice(-10);
    const cooperationRate = recentOpponentHistory.filter(choice => choice === 'cooperate').length / 10;
    return Math.random() < cooperationRate ? 'cooperate' : 'steal';
  },
  ForgivingTitForTat: (_, opponentHistory) => {
    if (opponentHistory.length === 0) return 'cooperate';
    if (opponentHistory[opponentHistory.length - 1] === 'cooperate') return 'cooperate';
    return Math.random() < 0.1 ? 'cooperate' : 'steal';
  },
  RandomTitForTat: (_, opponentHistory) => {
    if (opponentHistory.length === 0 || Math.random() < 0.1) return randomChoice();
    return opponentHistory[opponentHistory.length - 1];
  },
  NoisyTitForTat: (_, opponentHistory) => {
    if (opponentHistory.length === 0) return 'cooperate';
    return Math.random() < 0.9 ? opponentHistory[opponentHistory.length - 1] : randomChoice();
  },
  GrimTrigger: (_, opponentHistory) => opponentHistory.includes('steal') ? 'steal' : 'cooperate',
  Alternator: (history) => history.length % 2 === 0 ? 'cooperate' : 'steal',
  TwoTitsForTat: (_, opponentHistory) => {
    if (opponentHistory.length < 2) return 'cooperate';
    return opponentHistory.slice(-2).includes('steal') ? 'steal' : 'cooperate';
  },
  TitForTwoTatsWithForgiveness: (_, opponentHistory) => {
    if (opponentHistory.length < 2) return 'cooperate';
    if (opponentHistory.slice(-2).every(choice => choice === 'steal')) {
      return Math.random() < 0.1 ? 'cooperate' : 'steal';
    }
    return 'cooperate';
  },
  GenerousTitForTat: (_, opponentHistory) => {
    if (opponentHistory.length === 0) return 'cooperate';
    return opponentHistory[opponentHistory.length - 1] === 'steal' && Math.random() > 0.1 ? 'steal' : 'cooperate';
  },
  Joss: (_, opponentHistory) => {
    if (opponentHistory.length === 0) return 'cooperate';
    return opponentHistory[opponentHistory.length - 1] === 'cooperate' && Math.random() > 0.1 ? 'cooperate' : 'steal';
  },
  NaiveProber: (_, opponentHistory) => {
    if (opponentHistory.length === 0 || Math.random() < 0.1) return randomChoice();
    return opponentHistory[opponentHistory.length - 1];
  },
  RemorsefulProber: (history, opponentHistory) => {
    if (history.length === 0) return 'cooperate';
    if (Math.random() < 0.1) return 'steal';
    if (history[history.length - 1] === 'steal' && opponentHistory[opponentHistory.length - 1] === 'cooperate') return 'cooperate';
    return opponentHistory[opponentHistory.length - 1];
  },
  SoftGrudger: (_, opponentHistory) => {
    const lastThree = opponentHistory.slice(-3);
    if (lastThree.includes('steal')) {
      return lastThree.every(choice => choice === 'cooperate') ? 'cooperate' : 'steal';
    }
    return 'cooperate';
  },
  Prober: (history) => {
    if (history.length < 3) return history.length % 2 === 0 ? 'cooperate' : 'steal';
    const [first, second, third] = history;
    return (first === 'cooperate' && second === 'steal' && third === 'cooperate') ? 'steal' : 'cooperate';
  },
  FirmButFair: (history, opponentHistory) => {
    if (history.length === 0) return 'cooperate';
    if (history[history.length - 1] === 'cooperate' && opponentHistory[opponentHistory.length - 1] === 'steal') return 'steal';
    return 'cooperate';
  },
  GradualCooperator: (history) => {
    const defectionCount = history.filter(choice => choice === 'steal').length;
    return Math.random() < (1 - defectionCount / (history.length + 1)) ? 'cooperate' : 'steal';
  },
  AdaptiveCooperator: (_, opponentHistory) => {
    if (opponentHistory.length === 0) return 'cooperate';
    const cooperationRate = opponentHistory.filter(choice => choice === 'cooperate').length / opponentHistory.length;
    return Math.random() < cooperationRate ? 'cooperate' : 'steal';
  },
  OmegaTitForTat: (history, opponentHistory) => {
    if (opponentHistory.length === 0) return 'cooperate';
    const cooperationRate = opponentHistory.filter(choice => choice === 'cooperate').length / opponentHistory.length;
    return Math.random() < cooperationRate ? opponentHistory[opponentHistory.length - 1] : randomChoice();
  },
  ZDExtortion: (_, opponentHistory) => {
    if (opponentHistory.length === 0) return 'cooperate';
    const phi = 2;
    const cooperationRate = opponentHistory.filter(choice => choice === 'cooperate').length / opponentHistory.length;
    return Math.random() < (1 - phi * (1 - cooperationRate)) ? 'cooperate' : 'steal';
  },
  ZDGenerousTitForTat: (_, opponentHistory) => {
    if (opponentHistory.length === 0) return 'cooperate';
    const chi = 0.8;
    const cooperationRate = opponentHistory.filter(choice => choice === 'cooperate').length / opponentHistory.length;
    return Math.random() < (chi + (1 - chi) * cooperationRate) ? 'cooperate' : 'steal';
  },
  MetaStrategy: (history, opponentHistory) => {
    const strategies = [algorithms.TitForTat, algorithms.Pavlov, algorithms.GrimTrigger];
    const scores = strategies.map(strategy => {
      let score = 0;
      for (let i = 0; i < history.length; i++) {
        const choice = strategy(history.slice(0, i), opponentHistory.slice(0, i));
        if (choice === opponentHistory[i]) score += 3;
        if (choice === 'cooperate' && opponentHistory[i] === 'steal') score += 0;
        if (choice === 'steal' && opponentHistory[i] === 'cooperate') score += 5;
      }
      return score;
    });
    const bestStrategyIndex = scores.indexOf(Math.max(...scores));
    return strategies[bestStrategyIndex](history, opponentHistory);
  },
};

export function points(choice_a: Choice, choice_b: Choice): [number, number] {
  if (choice_a === "steal" && choice_b === "steal") {
    return [1, 1];
  } else if (choice_a === "cooperate" && choice_b === "steal") {
    return [0, 5];
  } else if (choice_a === "steal" && choice_b === "cooperate") {
    return [5, 0];
  } else if (choice_a === "cooperate" && choice_b === "cooperate") {
    return [3, 3];
  } else {
    return [0, 0];
  }
}