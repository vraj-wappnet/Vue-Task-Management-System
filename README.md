# Task Management System with Vue 3

A modern task management application built with Vue 3, TypeScript, Pinia, and Vuetify featuring a Kanban board interface with drag-and-drop functionality.

## Features

- 🗂 **Task Management**

  - Create, read, update, and delete tasks
  - Task fields: Title, Description, Due Date, Priority, Status
  - Form validation for all required fields

- 📊 **Interactive Dashboard**

  - List view with search and filtering
  - Kanban board with drag-and-drop status updates
  - Task counters for each status column

- 🛠 **Technical Highlights**
  - Vue 3 Composition API with TypeScript
  - Pinia for state management with localStorage persistence
  - Vuetify for Material Design UI components
  - Vue Router for navigation
  - Drag-and-drop functionality with vuedraggable

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/vue-task-manager.git
   cd vue-task-manager
   ```

2.**Install dependencies**
````bash
npm install

3. **Run development server**

````bash
npm run dev


# Project Structure
src/
├── assets/            # Static assets
├── components/        # Reusable components
│   └── tasks/         # Task-specific components
├── composables/       # Composition functions
├── models/            # TypeScript interfaces
├── router/            # Vue Router configuration
├── services/          # API/services layer
├── stores/            # Pinia stores
├── views/             # Route components
├── App.vue            # Main application component
└── main.ts            # Application entry point

## Dependencies

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/) (State Management)
- [Vuetify](https://vuetifyjs.com/) (UI Components)
- [Vue Router](https://router.vuejs.org/)
- [date-fns](https://date-fns.org/) (Date utilities)
- [vuedraggable](https://github.com/SortableJS/vue.draggable.next) (Drag and drop)
- [uuid](https://github.com/uuidjs/uuid) (ID generation)


## Development Dependencies

- [Vite](https://vitejs.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [TypeScript Vue Plugin](https://github.com/vuejs/language-tools)
- [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue)
- [@types/node](https://www.npmjs.com/package/@types/node)

## Available Scripts

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint

# Format code with Prettier
npm run format
````
