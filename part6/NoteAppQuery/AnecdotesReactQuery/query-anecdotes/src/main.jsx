import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotiContextProvider } from './components/NotificationContex'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotiContextProvider>
      <App />
    </NotiContextProvider>
  </QueryClientProvider>
)