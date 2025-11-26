// import { useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { GAME_ROUTES } from '../components/Header/constants/navItems';

// export function useNavigation() {
//   const navigate = useNavigate();

//   const handleAnchorClick = useCallback(
//     (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
//       e.preventDefault();

//       if (href.startsWith('http')) {
//         window.open(href, '_blank');
//         return;
//       }

//       if (href.includes('#')) {
//         const [baseUrl, anchor] = href.split('#');

//         if (baseUrl && window.location.pathname !== baseUrl) {
//           void navigate(href);
//           return;
//         }

//         const element = document.getElementById(anchor);
//         if (element) {
//           element.scrollIntoView({ behavior: 'smooth' });
//           window.history.pushState(null, '', href);
//         }
//         return;
//       }

//       if (window.location.pathname !== href) {
//         void navigate(href);
//         return;
//       }

//       if (href === '/' && window.location.pathname === '/') {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//       }
//     },
//     [navigate],
//   );

//   const isGameActive = useCallback(() => {
//     const gameRoutes = Object.values(GAME_ROUTES).map((route) => route.toLowerCase());
//     return gameRoutes.includes(location.pathname.toLowerCase());
//   }, []);

//   return { handleAnchorClick, isGameActive };
// }

// export default useNavigation;
