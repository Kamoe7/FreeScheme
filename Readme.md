1. 

Clone the repository
git clone https://github.com/Kamoe7/FreeScheme.git
cd FreeScheme


2.

Install dependencies
npm install


3. 

Set up your FreeSchema credentials
This app uses mftsccs-browser for data storage and sync. You need to be logged in via the login service before the app will work.
Make sure your login.service.ts is configured and getLocalUserId() returns a valid user ID. If your project has a login page, log in first before navigating to the todo app.


4.
 
Run the development server
npm run dev
Open your browser at http://localhost:5173 (or whichever port your bundler uses).



How It Works
Creating a task

Fill in the Task Name, Task Description, and Task Status fields in the Create Task form.
Click Create Task.
The task is saved locally and synced to the FreeSchema backend automatically.

Editing a task

Click the Edit button on any task card.
An edit form will appear below the task list pre-filled with the task's current values.
Make your changes and click Update.
Click Cancel to dismiss the form without saving.

Deleting a task

Click the Delete button on any task card.
Confirm the deletion in the prompt.
The task is removed and the edit form closes if it was open for that task.

Task status color

Tasks with status done display in green.
All other statuses display in yellow


Contributing

Create a new branch for your feature: git checkout -b feature/your-feature-name
Make your changes.
Commit with a clear message: git commit -m "add: description of what you did"
Push and open a pull request: git push origin feature/your-feature-name