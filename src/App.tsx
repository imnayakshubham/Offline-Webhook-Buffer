import './App.css'
import { HitMeButton } from './components/HitMeButton/HitMeButton'
import { useOnlineStatus } from './hoots/useOnlineStatus';

function App() {
  const isOnline = useOnlineStatus();

  return (
    <>
      <p>Current Status: <span className={`${isOnline ? "online" : "offline"}`}>{isOnline ? "Online" : "Offline"}</span></p>
      <HitMeButton />
    </>
  )
}

export default App
