import React from "react";
import Header from "../components/Header";
import Logs from "../components/Logs";
import PlayerControls from "../components/PlayerControls";
import Score from "../components/Score";
import Tray from "../components/Tray";

const App = () => {
  return (
    <div>
      <Header />
      <Score />
      <Tray />
      <PlayerControls />
      <Logs />
    </div>
  );
};

export default App;
