import { ChatBot } from './assets/components/ChatBot'
import { ChatProvider } from './assets/context/ChatContext'

export const App = () => {
  return (
    <ChatProvider>
      <ChatBot />
    </ChatProvider>
  )
}
