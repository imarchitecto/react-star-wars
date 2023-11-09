import PeoplePage from '@containers/PeoplePage';
import PersonPage from '@containers/PersonPage';
import HomePage from '@containers/HomePage';
import NotFoundPage from '@containers/NotFoundPage';
import FavoritePage from '@containers/FavoritesPage';
import SearchPage from '@containers/SearchPage';

const routesConfig = [
    {
        path: '/',
        exact: 'true',
        element: <HomePage />
    },
    {
        path: '/people',
        exact: 'true',
        element: <PeoplePage />
    },
    {
        path: '/favorites',
        exact: 'true',
        element: <FavoritePage />
    },
    {
        path: '/search',
        exact: 'true',
        element: <SearchPage />
    },
    {
        path: '/people/:id',
        exact: 'true',
        element: <PersonPage />
    },
    {
        path: '/not-found',
        exact: 'true',
        element: <NotFoundPage />
    },
    {
        path: '/*',
        exact: 'false',
        element: <NotFoundPage />
    }
];

export default routesConfig;