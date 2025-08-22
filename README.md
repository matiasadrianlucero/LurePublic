# Lure  

Lure is a social media web app, it allows users to create posts (containing an initial text, up to 3 images, tags and comments) and view them by following other users, searching for them, visiting profiles, storing them in favourites or in the explore tab.

## Features

- Create posts containing up to three images, text and tags.
- Like and comment posts.
- Follow users to visualize their posts on your feed.
- Visit the explore tab to view posts of users who haven't set their profile to private.
- Visit profiles to view their posts.
- Search profiles by text.
- Search posts by tags and or text.
- Favourite posts and view them on the favourite tab.
- Profile customization | username, avatar, cover, photo and bio.
- Update private settings | email, password and private profile.
- Posts of private profiles will not show up on searches or explore feed, they will only be visible on profile or feed tab if a follow request is accepted.
- Notifications tab that informs the user of new followers and pending follow requests.
- Responsive design.
## Technologies
- Frontend: React, HTML, CSS, Axios, ESLINT, Vite.
- Backend: Node, Express, Prisma, ESLINT.
- DB: PostgreSQL, Prisma.
- Frontend deployement: mdbgo.
- Backend deployement: render.
- Other: Github, pgAdmin4, npm, AWS 3.
## Issues
I initially setup cookies to be delivered through res.cookies but due to hosting backend and frontend on different domains the cookies won't persist, although it is a security risk i stored them in localStorage as a work around until i purchase a domain.
