# Sudo Academy: Capstone Project

### OVERVIEW
RE-Board is a student project with aim to create collaboration tool that organizes your projects into boards. Imagine a white board, filled with lists of sticky notes, with each note as a task for you and your team. 

### Funcional Features

These are non-negotiable project requirements that you HAVE TO meet to consider your
project shippable:
# Implemented
- Creating / Editing / Deleting new boards
- Board labels
- Color management of board and list
- Creating new lists within a board
- Editing and deleting lists
- Create / edit / copy  new cards within a list
- Moving list to another boards or moving tasks to another lists

# To be implemented
- User management 
- Multiple versions based on subscription
- Reminders
- Priority labels
- Action history log
- Archiving cards
- Drag and drop cards between lists  - already in testing phase

# Test versions is deployed on heroku  
   keep in mind there is a lot of desing elements to be just done.
   https://re-board.herokuapp.com/
   
 ### Image preview
 ![Screen Shot 2021-06-02 at 13 53 12-fullpage](https://user-images.githubusercontent.com/29810931/120318998-cd6f0500-c2e0-11eb-8a3f-61c7cc8e60d9.png)

   ![Screen Shot 2021-06-02 at 13 53 02-fullpage](https://user-images.githubusercontent.com/29810931/120319043-d95ac700-c2e0-11eb-9da6-df876191a101.png)
![Screen Shot 2021-06-02 at 13 52 46-fullpage](https://user-images.githubusercontent.com/29810931/120319046-db248a80-c2e0-11eb-981b-35e59d7de428.png)!![Screen Shot 2021-06-02 at 13 57 24-fullpage](https://user-images.githubusercontent.com/29810931/120319465-54bc7880-c2e1-11eb-935f-f01206f9bceb.png)




   
### Environment Setup

1. Fork the repository using the "Use this template" button
2. Clone the repository

   ```sh
   git clone https://github.com/USERNAME/REPONAME.git
   # or use ssh
   git clone git@github.com:USERNAME/REPONAME.git

   # optionally add this template as an upstream remote
   git remote add upstream https://github.com/sudolabs-io/bootcamp-final-assignment.git
   # or use ssh
   git remote add upstream git@github.com:sudolabs-io/bootcamp-final-assignment.git
   ```

3. Make a copy of [data/database.json.dist](data/database.json.dist) and rename it to `data/database.json`
4. ```npm install```
5. ```npm run start:server```
6. ```npm run start:client```
7. Head out to the Trello board, pick a task and start working on it, then rinse and repeat.
8. ```code REPONAME``` and install the recommended extension


## Documentation

- <https://github.com/typicode/json-server#table-of-contents>
- <https://vitejs.dev/>
- <https://chakra-ui.com/docs/getting-started>
- <https://react-icons.github.io/react-icons/>
- <https://reactrouter.com/web/guides/quick-start>

## Known Issues

### The site is not reloading on change to source files

Open [vite.config.js](vite.config.js) and uncomment the relevant section that enables polling.

### Esbuild is failing to build the project on Windows

You'll need to run `node node_modules/esbuild/install.js` in the root of your project.
