import React from "react";
import Stats from "./Stats";
import Tasks from "./Tasks";

export default function Content({ nav }) {
  if (nav === "tasks") {
    return <Tasks />;
  } else if (nav === "stats") {
    return <Stats />;
  }
}
