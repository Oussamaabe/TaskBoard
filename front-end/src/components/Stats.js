import GetStats from "../hooks/GetStats";

export default function Stats() {
  const stats = GetStats();

  if (stats !== "load") {
    return (
      <div className="w-65">
        {stats.length > 0 && (
          <div>
            <h1>Page de statistiques</h1>
            <ul>
              {stats.map((st, index) => (
                <li key={index}>
                  <div>tasks number: {st.nbrTasks}</div>
                  <div>Done tasks number: {st.nbrTasksDone}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="d-flex justify-content-center align-items-center w-65">
        <div className="loader"></div>
      </div>
    );
  }
}
