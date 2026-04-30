import { ChatBot } from './assets/components/ChatBot'
import { FormularioPeliculas } from './assets/components/FormularioPeliculas'
import { ChatProvider } from './assets/context/ChatContext'

export const App = () => {
  return (
    <ChatProvider>
      {/* <ChatBot /> */}
      <FormularioPeliculas />
    </ChatProvider>
  )
}
