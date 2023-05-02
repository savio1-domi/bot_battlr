import React, { useEffect, useState } from "react";
import BotItem from "./BotItem";
import YourBotArmy from "./YourBotArmy";

const url = "http://localhost:3000/bots";

function BotCollection() {
  const [bots, setBots] = useState([]);
  const [botId, setBotId] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBots(data);
      });
  }, []);

  function handleDelete(id) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setBots((prevBots) => prevBots.filter((bot) => bot.id !== id));
      })
      .catch((error) => console.log(error));
  }

  function handleClicked(idInput) {
    setBotId([...botId, idInput]);
  }

  const botContent = bots.map((content, index) => (
    <BotItem
      key={content.id}
      image={content.avatar_url}
      name={content.name}
      health={content.health}
      damage={content.damage}
      armor={content.armor}
      bot_class={content.bot_class}
      catchphrase={content.catchphrase}
      id={content.id}
      handleClicked={handleClicked}
      handleDelete={handleDelete}
    />
  ));

  return (
    <div>
      <YourBotArmy botId={botId} bots={bots} setBotId={setBotId} />
      <div className="container mt-4">
        <div className="row">{botContent}</div>
      </div>
    </div>
  );
}

export default BotCollection;
