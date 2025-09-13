import { useState } from "react";

function Dice() {
  const [dice, setDice] = useState<number | null>(null);
  const rollDice = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1; // funktsioon mis genereerib numbri 1–6
    setDice(randomNumber);
  };

  return (
    <div>
      <p>Dice: {dice !== null ? dice : "-"}</p>         {/* see kuvab numbri või "-" kui pole veel visatud  */}
      <button onClick={rollDice}>Roll Dice</button> 
    </div>
  );
}

export default Dice;