# BulkBuddy
This application serves as an online fitness community, with the purpose of tracking progress, setting challenges and comparing your progress and stats with your friends.  
## Specification Deliverable
### Elevator Pitch 
Going to the gym with friends is the best when your trying to make progress, but what if your schedules dont line up? BulkBuddy lets you create and join personalized weightlifting challenges, track your lifting progress, and connect with your lifting community. Its the best way to bulk up your lifting experience – where challenges are fun, progress is shared, and gains are celebrated!
### Design
![](Images/Bulkbuddyidea.png)
### Key Features 
* Secure login.
* Create challenges for your friends and yourself.
* Display personal maxes.
* Ability to view friends maxes and progress.
* Progress section to see weekly growth.
* Results and progress is persistantly stored.
### Technologies
* HTML and CSS - Create the user interface. Design the layout, buttons, and overall presentation of pages offered in the app (login, home, friends).
* JavaScript - Implement the behavior of the application. This includes handling user interactions, updating the UI in real-time, and sending/receiving data to/from the server.
* Service - Create a backend service using a server-side technology, with endpoints for logging in, retrieving progress and max stats, as well as challenges given by users.
* Websocket - Enable real-time communication between the server and clients. This is crucial for updating the UI in real-time as stats are recorded.
* React - Builds front end components, allowing a better user interface, with updates recieved through websockets. 
