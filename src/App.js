import { Outlet } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import SearchHeader from './Components/SearchHeader';
import YoutubeApiProvider from './Context/YoutubeApiContext';

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <nav className='sticky top-0 z-50'>
        <SearchHeader />
      </nav>
      <YoutubeApiProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet className='z-0' />
        </QueryClientProvider>
      </YoutubeApiProvider>

    </>
  );
}

export default App;
