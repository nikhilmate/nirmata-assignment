import { Switch, Route } from "wouter"
import Players from "./pages/Players"
import Player from "./pages/Player"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <main className="w-full min-h-screen">
      <Switch>
        <Route path="/" component={Players} />
        <Route path="/:playerId" component={Player} />
        <Route component={NotFound} />
      </Switch>
    </main>
  )
}

export default App
