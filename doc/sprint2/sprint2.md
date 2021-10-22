# Sprint 2 Planning

#### Meeting and sprint goal is documented, all spikes clearly identified,
- decisions about user stories to be completed this sprint are clear,
- tasks breakdown is done.

## Sprint goal:
 - Finish user stories: __WRLD-141__, __WRLD-140__, __WRLD-137__, __WRLD-138__, __WRLD-15__, __WRLD-16__, __WRLD-17__, __WRLD-18__, __WRLD-19__, __WRLD-20__, __WRLD-34__

 Associated Tasks:


---

## Tasks Breakdown:
### Epic: Project Setup
Setup project wireframe and app routing

Story: __WRLD-141__

Tasks:
 - Add main page routing
 - Initialize vue frontend and router
 - Create basic vue components
 - Add axios for api calls
 - Add bootstrap for css
 - Add vuetify for builtins

Story: __WRLD-140__

Tasks:
 - Add swagger to the package
 - Add swagger-ui for api documentation

---

### Epic: Application Static Pages
This epic is for creating any pages that don't require a signed in user or pertain to app functionality

Story: __WRLD-137__

Tasks:
 - Setup app design languages
 - Create index Page
 - Add navigation menu

Story: __WRLD-138__

Tasks:
 - Setup app design language
 - Create welcome pages
 - Add navigation menu

Story: __WRLD-15__

Tasks:
 - Create users in db
 - Add jwts, register + login

Story: __WRLD-16__

Tasks:
 - Insert appropriate icons for sign in options
 - Ask if they don't have an account -> Redirect to sign up page
 - Insert a backwards button to go back to the index page
---

### Epic: Users Personal KanBan Board
This epic is for making the basic components for the creation/deletion and view of person KanBan boards


Story: __WRLD-17__

Tasks:
 - Database entry insertion
 - Endpoint for creating boards
 - Modal for configuring the board (Name, Color, Preset/Custom)
 - Button to redirect to the new board
 - Make a default empty board based on present/custom value
 - Make an option to stop creating (close the modal: X button)

Story: __WRLD-18__

Tasks:
 - Database search query
 - Endpoint for retrieving boards
 - List of boards that correspond to me
 - A visual representation together with the board name for each of the user’s boards

Story: __WRLD-19__

Tasks:
 - Endpoint for retrieving all specifications of a specific board, given ID
 - Board name display (modifiable name)
 - States display (modifiable name)
 - Cards display (modifiable text)

 Story: __WRLD-20__

 Tasks:
 - Endpoint for deleting a specific board, given ID and being the owner
 - Side bar boards deletion icon display
 - Update board deletion option display
 - Board deletion confirmation modal
 - Redirection after board deletion if inside board

 Story: __WRLD-34__

 Tasks:
 - Endpoint for deleting a specific card, given ID and being the owner
 - Card deletion option display
 - Card deletion confirmation modal

---

## Spikes:
 - Creating functional Vue and CSS components for the top navbar and side navbar were difficult.
 - Ensuring Authentication works fine.
 - Connecting swagger-ui to authenticated endpoints

---

## Capacity
| Name | Capacity (hours per day) |
| --- | --- |
| Mohamed Halat | 3 |
| Christian Liu | 3 |
| David Petrov | 3 |
| Armand Sarkezians | 2 |
| Ahmed Halat | 3 |

## Participants
- Mohamed Halat
- Christian Liu
- David Petrov
- Armand Sarkezians
- Ahmed Halat
