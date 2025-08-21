import './global.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from 'react-dom/client'

import Landing from './LoggedOut/LandingPage.jsx'
import LoggedIn from './LoggedIn/LoggedIn.jsx';

import Home from './LoggedIn/outlets/home/Home.jsx'
import Profile from './LoggedIn/outlets/profile/Profile.jsx'

import Settings from './LoggedIn/outlets/settings/Settings.jsx';
import FollowingAndFollowers from './LoggedIn/outlets/followingAndFollowers/FollowingAndFollowers.jsx';
import Search from './LoggedIn/outlets/searchResults/Search.jsx';
import Favourites from './LoggedIn/outlets/favourites/Favourites.jsx';
import Notifications from './LoggedIn/outlets/Notifications/Notifications.jsx';

import RenderPost from './LoggedIn/outlets/searchResults/RenderPost.jsx';
import RenderProfileSearch from './LoggedIn/outlets/searchResults/RenderProfileSearch.jsx';
import RenderPostWTags from './LoggedIn/outlets/searchResults/RenderPostWTags.jsx';
import RenderTags from './LoggedIn/outlets/searchResults/RenderTags.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "Home/",
    element: <LoggedIn />,
    children: [
      {path: "Feed", element: <Home tabSelected={"Feed"} /> },
      {path: "Explore", element: <Home tabSelected={"Explore"} /> }
    ],
  },
  {
    path: "Profile/:username",
    element: <LoggedIn />,
    children: [
      {
        index: true,
        element: <Profile />
      },
      {
        path: "Followers",
        element: <FollowingAndFollowers followers={true} />
      },
      {
        path: "Following",
        element: <FollowingAndFollowers followers={false}/>
      },
      {
        path: "Favourites",
        element: <Favourites />
      }
    ],
  },
  {
    path: "Search",
    element: <LoggedIn />,
    children: [
      {
        path: "",
        element: <Search />, 
        children: [
          {
            path: "Post/:text",
            element: <RenderPost />
          },
          {
            path: "Post/:text/:tags",
            element: <RenderPostWTags />
          },
          {
            path: "Tags/:tags",
            element: <RenderTags />
          },
          {
            path: "Profile/:text",
            element: <RenderProfileSearch />
          }
        ]
      }
    ]
  },
  {
    path: "Settings/",
    element: <LoggedIn />,
    children: [
      {path: "", element: <Settings /> }
    ],
  },
  {
    path: "Notifications/",
      element: <LoggedIn />,
      children: [
        {path: "", element: <Notifications /> }
      ],
    },
]);

createRoot(document.getElementById('root')).render(
      <RouterProvider router={router} />
)
