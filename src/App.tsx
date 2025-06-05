import { HiddenModeToggle } from './components/system/modeToggle'
import AnimatedOutlet from './components/system/AnimatedOutlet'

function App() {
  return (
    <div className={'bg-base-300 grid h-screen w-screen overflow-hidden'}>
      <HiddenModeToggle />
      <AnimatedOutlet />
    </div>
  )
}

export default App
