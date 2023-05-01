import React from "react";
import BotCard from "./BotCard";

function BotCollection({bots, addBot, deleteBot}) {

  return (
    <div className="ui four column grid">
      <div className="row">
        {bots.map((bot) => (
          <BotCard bot={bot} handleBot={addBot} handleDeleteBot={deleteBot}/>
        ))}
        
        Collection of all bots
      </div>
    </div>
  );
}

export default BotCollection;