import { Toaster } from 'sonner';

import AppRouter from './router/AppRouter';

import './styles/index.scss'

function App() {
  return (
    <>
      <main>
        <Toaster richColours position="center"/>
        <AppRouter/>
      </main>
    </>
  )
}

export default App
