import { Outlet } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import SearchHeader from './Components/SearchHeader';
import YoutubeApiProvider from './Context/YoutubeApiContext';

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <YoutubeApiProvider>
          <nav className='sticky top-0 z-50'>
            <SearchHeader />
          </nav>
          <Outlet className='z-0' />
        </YoutubeApiProvider >
      </QueryClientProvider>

    </>
  );
}

export default App;
