import { GoogleAnalytics } from '@next/third-parties/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration } from 'react-router-dom';
import Live from './pages/Live'
import NewLive from './pages/NewLive'
import LiveBaseScreen from './pages/NewLive/components/Background'
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    element: (
      <div className="text-white relative">
        <LiveBaseScreen />
        <div className="relative z-10">
          <Outlet />
          <ScrollRestoration />
        </div>
      </div>
    ),
    children: [
      {
        path: '/',
        element: <Live />,
      },
      {
        path: '/newlive',
        element: <NewLive />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

export default function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <svg className="clippings">
        <defs>
          <clipPath id="killsFrame" clipPathUnits="objectBoundingBox">
            <path d="M0.102778 0H0.897222L1 0.5L0.897222 1H0.102778L0 0.5L0.102778 0Z" />
          </clipPath>
          <clipPath id="hexagonClip" clipPathUnits="objectBoundingBox">
            <path
              d="M0 0.26777C0 0.250786 0.0104641 0.235114 0.0273961 0.226738L0.473342 0.00613499C0.489878 -0.00204501 0.510122 -0.00204499 0.526658 0.00613502L0.972604 0.226738C0.989536 0.235114 1 0.250786 1 0.267771V0.73223C1 0.749214 0.989536 0.764886 0.972604 0.773262L0.526658 0.993865C0.510122 1.00205 0.489878 1.00205 0.473342 0.993865L0.0273961 0.773262C0.010464 0.764886 0 0.749213 0 0.732229V0.26777Z"
              fill="#D9D9D9"
            />
          </clipPath>
        </defs>
      </svg>
      <GoogleAnalytics gaId="G-CF8PSBSLVY" />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
