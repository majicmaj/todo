import { HiddenModeToggle } from './components/system/modeToggle'
import { Outlet } from 'react-router'

function App() {
  return (
    <div className={'bg-base-300 grid h-screen w-screen overflow-auto'}>
      <HiddenModeToggle />
      <Outlet />
    </div>
  )
}

export default App
