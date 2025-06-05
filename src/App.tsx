import { HiddenModeToggle } from './components/system/modeToggle'
import AnimatedOutlet from './components/system/animatedOutlets'

function App() {
  return (
    <div className={'bg-base-300 grid h-screen w-screen'}>
      <HiddenModeToggle />
      <AnimatedOutlet />
    </div>
  )
}

export default App
