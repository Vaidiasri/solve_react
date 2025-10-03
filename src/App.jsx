import Todo from "./components/Todo";
import ToStorage from "./components/ToStroage";
import Weather from "./components/Weather";

export default function App() {
  return(
    <div className="app">
      {/* <h1>Todo Application</h1> */}
      {/* <Todo /> */}
      {/* <Weather/> */}
      <ToStorage />
    </div>
  )
}