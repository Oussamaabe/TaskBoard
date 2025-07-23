# TaskBoard - Collaborative Task Management 🚀

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)


TaskBoard is a powerful Notion-inspired task management platform that enables teams to organize projects using customizable boards, lists, and cards. Featuring real-time collaboration, intuitive drag-and-drop functionality, and granular permissions, TaskBoard helps teams stay productive and aligned on their goals.

**GitHub Repository:** [https://github.com/Oussamaabe/TaskBoard](https://github.com/Oussamaabe/TaskBoard)

## ✨ Key Features

- **Customizable Workspaces**  
  Create boards for projects, departments, or teams with personalized layouts
- **Drag-and-Drop Interface**  
  Intuitive card movement between lists with smooth animations
- **Real-time Collaboration**  
  Synchronized updates across all connected devices
- **Task Management**  
  Assign tasks, set due dates, add labels, and track progress
- **Granular Permissions**  
  Control access with role-based permissions for teams and individuals
- **Activity Tracking**  
  Full audit log of all changes and updates
- **File Attachments**  
  Upload documents and images directly to tasks
- **Responsive Design**  
  Works seamlessly on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

**Frontend**  
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![React DnD](https://img.shields.io/badge/React_DnD-FF4154?style=flat-square)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socketdotio)

**Backend**  
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens)

**Database**  
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square)

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB instance (local or Atlas)
- npm or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/Oussamaabe/TaskBoard.git

# Install backend dependencies
cd TaskBoard/server
npm install

# Install frontend dependencies
cd ../client
npm install

# Configure environment variables
cp .env.example .env

# Start backend server (from /server directory)
npm run dev

# Start frontend development server (from /client directory)
npm start
```

## 🧩 Project Structure

```
TaskBoard/
├── client/                  # React frontend
│   ├── public/              # Static assets
│   ├── src/                 # Application source
│   │   ├── components/      # Reusable components
│   │   │   ├── boards/      # Board components
│   │   │   ├── cards/       # Card components
│   │   │   ├── ui/          # UI elements
│   │   │   └── modals/      # Modal components
│   │   ├── context/         # React context providers
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Application views
│   │   ├── services/        # API services
│   │   ├── utils/           # Utility functions
│   │   ├── App.js           # Main application
│   │   └── index.js         # Entry point
│
├── server/                  # Express backend
│   ├── config/              # Configuration files
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/              # MongoDB models
│   ├── routes/              # API endpoints
│   ├── utils/               # Utility functions
│   ├── server.js            # Server entry point
│   └── socket.js            # Socket.io configuration
│
├── .gitignore               # Git ignore rules
└── README.md                # Project documentation
```

## 💡 Key Implementation Details

### Real-time Synchronization
```javascript
// Socket.io implementation for real-time updates
io.on('connection', (socket) => {
  socket.on('joinBoard', (boardId) => {
    socket.join(boardId);
  });

  socket.on('cardMoved', (data) => {
    io.to(data.boardId).emit('cardUpdated', data);
  });

  socket.on('cardUpdated', (data) => {
    io.to(data.boardId).emit('cardUpdated', data);
  });
});
```

### Drag-and-Drop Functionality
```jsx
// React DnD implementation for card movement
const [{ isDragging }, drag] = useDrag(() => ({
  type: 'CARD',
  item: { id: card._id, index, listId },
  collect: (monitor) => ({
    isDragging: !!monitor.isDragging(),
  }),
}));

const [, drop] = useDrop(() => ({
  accept: 'CARD',
  drop: (item) => handleDrop(item, listId, index),
}));

return (
  <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
    <CardContent ref={drop}>
      {/* Card content */}
    </CardContent>
  </div>
);
```

### Permission System
```javascript
// Role-based permission middleware
const checkPermission = (requiredRole) => {
  return async (req, res, next) => {
    const board = await Board.findById(req.params.boardId)
      .populate('members.user', 'role');
    
    const membership = board.members.find(
      m => m.user._id.toString() === req.user.id
    );
    
    if (!membership || membership.role < requiredRole) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
};

// Usage in routes
router.put('/:boardId', 
  checkPermission(PermissionLevel.EDITOR), 
  boardController.updateBoard
);
```

## 🌟 Advanced Features

1. **Custom Board Templates**  
   Create and save board configurations for different project types
2. **Automated Workflows**  
   Set up rules for automatic task assignments and status changes
3. **Time Tracking**  
   Log hours spent on tasks with start/stop timers
4. **Calendar View**  
   Visualize deadlines and milestones in a calendar layout
5. **Reporting Dashboard**  
   Generate insights on team productivity and project progress
6. **Keyboard Shortcuts**  
   Navigate and manage tasks with efficient keyboard controls

## 🤝 Contributing

We welcome contributions to TaskBoard! Here's how to get started:

1. Fork the repository on GitHub
2. Clone your forked repository locally
3. Create a new branch for your feature (`git checkout -b feature/your-feature`)
4. Make your changes and commit them with descriptive messages
5. Push your branch to your fork (`git push origin feature/your-feature`)
6. Open a pull request on the original repository

Please ensure your code follows the existing style and includes appropriate tests.

## 📜 License

TaskBoard is open-source software licensed under the MIT License. See the [LICENSE](https://github.com/Oussamaabe/TaskBoard/blob/main/LICENSE) file for details.

## ✉️ Contact

**Oussama Belfakir** - [GitHub Profile](https://github.com/Oussamaabe)  
Project Link: [https://github.com/Oussamaabe/TaskBoard](https://github.com/Oussamaabe/TaskBoard)

---

**TaskBoard** - Crafted with React & Express.js • May 2024 - June 2025  
*Streamline your workflow, amplify your productivity*
