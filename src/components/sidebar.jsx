
import { useState } from "react";
import Articles from "../articles";
function Sidebar({ onAdd, news }) {

  return (
    <aside className="sidebar">
      <Articles onAdd={onAdd} news={news}/>
    </aside>
  );
}

export default Sidebar;
