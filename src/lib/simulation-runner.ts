import { Choice, Algorithm, points } from './algorithms';

export interface SimulationResult {
  player1Choices: Choice[];
  player2Choices: Choice[];
  player1Score: number[];
  player2Score: number[];
}

export function runSimulation(
  player1Algorithm: Algorithm,
  player2Algorithm: Algorithm,
  iterations: number
): SimulationResult {
  const result: SimulationResult = {
    player1Choices: [],
    player2Choices: [],
    player1Score: [0],
    player2Score: [0],
  };

  for (let i = 0; i < iterations; i++) {
    const player1Choice = player1Algorithm(result.player1Choices, result.player2Choices);
    const player2Choice = player2Algorithm(result.player2Choices, result.player1Choices);

    result.player1Choices.push(player1Choice);
    result.player2Choices.push(player2Choice);

    const [score1, score2] = points(player1Choice, player2Choice);
    result.player1Score.push(result.player1Score[i] + score1);
    result.player2Score.push(result.player2Score[i] + score2);
  }

  return result;
}