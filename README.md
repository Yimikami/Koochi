Koochi is a Discord clone built with modern web technologies. It provides a platform for users to communicate in real-time through text channels, voice channels, and direct messages. This project is created using Next.js 14, React and other technologies.

## Features

- **Fully Customizable:** Create and customize your own server with a desired name and image, create text, voice and video channels, and invite friends to join.
- **Real-time Messaging:** Send and receive messages in real-time. (WIP)
- **Voice Channels:** Join voice channels and communicate with others. (WIP)
- **User Authentication:** Secure login and registration.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Dark Mode:** Toggle between light and dark mode.

## Tech Stack

- **Next.js 14:** Framework for server-rendered React applications.
- **React:** JavaScript library for building user interfaces.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Prisma:** ORM for database access.
- **Clerk:** User authentication and authorization.
- **Lucide:** SVG icons for the web.
- **shadcn/ui:** Custom UI components.
- **uploadthing**: File upload component.

## Status

This is an ongoing project. There is still a lot of work to be done, and new features will be added over time. Contributions and suggestions are welcome!

## Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Yimikami/Koochi.git
   cd Koochi
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up your environment variables:
   Copy the example environment file and update it with your own values:

   ```bash
   cp .env.example .env
   ```

### Running the Application

1. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request
