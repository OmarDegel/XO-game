import { useState } from "react";
export default function Player({ name, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(name);
  const [edit, setEdit] = useState(false);
  function handleEdit() {
    setEdit((editing) => !editing);
    if (edit) {
      onChangeName(symbol, playerName);
    }
  }
  function handlePlayerName(event) {
    setPlayerName(event.target.value);
  }
  let EditPlayerName = <span className="player-name">{playerName}</span>;
  if (edit)
    EditPlayerName = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handlePlayerName}
      />
    );
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {EditPlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{edit ? "save" : "edit"}</button>
    </li>
  );
}
