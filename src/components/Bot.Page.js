import React, { useEffect, useState } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

function BotsPage() {

  const [bots, setBots] = useState([]);
  const [botArmy, setBotArmy] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/bots")
      .then(res => res.json())
      .then(bots => setBots(bots))
  }, []);

  const enlistBotToArmy = (bot) => {
    if (!botArmy.includes(bot)) {
      setBotArmy([...botArmy, bot]);
    }
  }


  const removeBotFromArmy = (bot) => {
    const newBotArmy = botArmy.filter((armyBot) => armyBot !== bot);
    setBotArmy(newBotArmy);
  };

  const deleteBotPermanently = (bot) => {
    const newBots = bots.filter((b) => b !== bot);
    const newBotArmy = botArmy.filter((armyBot) => armyBot !== bot);
    setBots(newBots);
    setBotArmy(newBotArmy);
    fetch(`http://localhost:3000/bots/${bot.id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .catch(error => console.error(error));
  }

  return (
    <div>
      <YourBotArmy botArmy={botArmy} removeBot={removeBotFromArmy} deleteBot={deleteBotPermanently} />
      <BotCollection bots={bots} addBot={enlistBotToArmy} deleteBot={deleteBotPermanently} />
    </div>
  )
}

export default BotsPage;
