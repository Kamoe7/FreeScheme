# FreeSchema Todo App

A simple todo list app built using the FreeSchema (mftsccs-browser) framework.  
You can create, edit, and delete tasks with real-time sync.

## Getting Started

Before getting started, make sure you have:

- Node.js (v18 or higher)
- npm or yarn

## Setup

1. Clone the repository<br>
git clone https://github.com/Kamoe7/FreeScheme.git<br>
cd FreeScheme

2. Install dependencies<br>
npm install

3. Run the development server<br>
npm run dev

## How to Access

After running the app, open:

http://localhost:5173/todo

This is where the todo app is available.

## Features

- Create tasks  
- Edit tasks  
- Delete tasks  
- Task status (done = green, others = yellow)

## Note

Make sure the login system is working properly.  
The app depends on `getLocalUserId()` returning a valid user ID, otherwise data won’t sync correctly.

## Contributing

Create a new branch:
git checkout -b feature/your-feature-name

Commit your changes:
git commit -m "add: your message"

Push and open PR:
git push origin feature/your-feature-name