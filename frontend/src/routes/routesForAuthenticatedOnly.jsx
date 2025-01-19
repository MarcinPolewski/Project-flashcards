import CreateFlashcard from "../Components/pages/CreateFlashcard/CreateFlashcard";
import DeckPage from "../Components/pages/DeckPage/DeckPage";
import Decks from "../Components/pages/Decks/Decks";
import FolderPage from "../Components/pages/FolderPage/FolderPage";
import Home from "../Components/pages/Home/Home";
import Settings from "../Components/pages/Settings/Settings";
import Share from "../Components/pages/Share/Share";
import Statistics from "../Components/pages/Statistics/Statistics";
import Study from "../Components/pages/Study/Study";
import UserProfile from "../Components/pages/UserProfile/UserProfile";
import ProtectedRoute from "./ProtectedRoute";
import { UserProvider } from "../contexts/UserContext/UserContext";

const routesForAuthenticatedOnly = [
    {
      path: "/",
      element:
        <ProtectedRoute />
      ,
      children: [
        {
            path: "/",
            element:
            <UserProvider><Home/>
            </UserProvider>,
        },
        {
            path: "/settings",
            element:
            <UserProvider><Settings/>
            </UserProvider>,
        },
        {
            path: "/share",
            element:
            <UserProvider><Share/>
            </UserProvider>,
        },
        {
            path: "/statistics",
            element:
            <UserProvider><Statistics/>
            </UserProvider>,
        },
        {
            path: "/decks",
            element:
            <UserProvider><Decks/>
            </UserProvider>,
        },
        {
            path: "/study/:deckId",
            element:
            <UserProvider><Study/>
            </UserProvider>,
        },
        {
            path: "/folder/:id",
            element:
            <UserProvider><FolderPage/>
            </UserProvider>,
        },
        {
            path: "/deck/:deckId",
            element:
            <UserProvider><DeckPage/>
            </UserProvider>,
        },
        {
            path: "/create-flashcard",
            element:
            <UserProvider><CreateFlashcard/>
            </UserProvider>,
        },
        {
            path: "/user-profile",
            element:
            <UserProvider><UserProfile/>
            </UserProvider>,
        },
      ],
    },
];

export default routesForAuthenticatedOnly;