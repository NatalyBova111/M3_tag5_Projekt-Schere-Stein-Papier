import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

/**
 * Инициализация React-приложения (React 18)
 *
 * 1) Берём контейнер из index.html: <div id="root"></div>
 *    "as HTMLElement" подсказывает TypeScript, что элемент точно существует.
 * 2) createRoot(...) — создаёт корень React (новый API в React 18).
 * 3) render(<App />) — монтируем наше приложение в DOM.
 */
const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);