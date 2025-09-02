import { useState } from "react";
import "./RPSGame.css";

// Типы возможных значений 
type Choice = "rock" | "paper" | "scissors";
type Result = "win" | "lose" | "draw";

// Справочник вариантов — используем и для логики, и для отрисовки кнопок
const CHOICES: Array<{ key: Choice; label: string; emoji: string }> = [
  { key: "rock",     label: "Rock",     emoji: "🪨" },
  { key: "paper",    label: "Paper",    emoji: "📄" },
  { key: "scissors", label: "Scissors", emoji: "✂️" },
];

// Правила игры: возвращаем исход (win/lose/draw)
function decide(player: Choice, cpu: Choice): Result {
  if (player === cpu) return "draw";
  if (
    (player === "rock"     && cpu === "scissors") ||
    (player === "paper"    && cpu === "rock")     ||
    (player === "scissors" && cpu === "paper")
  ) return "win";
  return "lose";
}

export default function RPSGame() {
  // Состояние: выборы игрока/компьютера и итог раунда
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [cpuChoice, setCpuChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  // Обработка клика по карточке-варианту
  const onPick = (choice: Choice) => {
    if (playerChoice) return; // не даём кликать повторно до reset
    const cpu = CHOICES[Math.floor(Math.random() * CHOICES.length)].key; // случайный ход CPU
    setPlayerChoice(choice);
    setCpuChoice(cpu);
    setResult(decide(choice, cpu)); // считаем исход
  };

  // Сброс к начальному состоянию (новая партия)
  const reset = () => {
    setPlayerChoice(null);
    setCpuChoice(null);
    setResult(null);
  };

  return (
    <div className="rps-wrap">
      <h1>Rock · Paper · Scissors</h1>
      <p className="subtitle">Choose your weapon</p>

      {/* Кнопки выбора: строим из CHOICES */}
      <div className="arena">
        {CHOICES.map(({ key, label, emoji }) => (
          <button
            key={key}
            className={`card ${playerChoice === key ? "selected" : ""}`}
            onClick={() => onPick(key)}
            disabled={!!playerChoice}            // блокируем после выбора
            aria-label={`Choose ${label}`}       // доступность для скринридеров
          >
            <span className="emoji" aria-hidden>{emoji}</span>
            <span className="label">{label}</span>
          </button>
        ))}
      </div>

      {/* Статус раунда: что выбрали игрок и CPU */}
      <div className="status">
        <p>You choose: <b>{playerChoice ?? "—"}</b></p>
        <p>CPU chooses: <b>{cpuChoice ?? "—"}</b></p>

        {/* Итог + эмодзи */}
        <div className={`result-row ${result ?? ""}`}>
          <span className="result-title">Result:</span>
          <span className="result-value">
            {result
              ? result === "win"
                ? "You win!"
                : result === "lose"
                ? "You lose"
                : "Draw"
              : "—"}
          </span>

          {result && (
            <span
              className="result-emoji"
              aria-label={
                result === "win" ? "victory" : result === "lose" ? "sad" : "handshake"
              }
              title={
                result === "win" ? "Victory" : result === "lose" ? "Sad" : "Handshake"
              }
            >
              {result === "win" ? "🏆" : result === "lose" ? "😢" : "🤝"}
            </span>
          )}
        </div>
      </div>

      {/* Кнопка перезапуска игры */}
      <button className="reset" onClick={reset}>Restart game</button>
    </div>
  );
}
