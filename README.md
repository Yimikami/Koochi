
![Koochi](https://utfs.io/f/9d689796-3b1a-4140-99ba-efe074139e6d-q4rzvd.png)

Koochi is a Discord Clone project built with Next.js 14 and React, featuring real-time chat, video and audio communication, file uploading, and authentication.

## Technologies Used

- **Frontend:** Next.js 14, React
- **Backend:** Prisma (Database), Socket.IO (Real-time Chat)
- **Additional Services:** Livekit (Video and Audio Chat), Uploadthings (File Upload), Clerk (Authentication)

## Features

- **Real-time Chat:** Utilizes Socket.IO for instant messaging between users.
- **Video and Audio Chat:** Integrated Livekit for seamless voice and video calls.
- **File Upload:** Allows users to upload files using Uploadthings.
- **Authentication:** Uses Clerk for secure user authentication.
- **Custom UI:** Inspired by Discord's interface with customizations for a unique user experience.

## Status

This is an ongoing project. There is still a lot of work to be done, and new features will be added over time. Contributions and suggestions are welcome!

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Yimikami/Koochi.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Configure environment variables

   ```sh
   cp .env.example .env
   ```

   Edit `.env` with your configuration details.

4. Start the development server
   ```sh
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000` to view Koochi.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgements

- [Code with Antonio](https://www.youtube.com/watch?v=ZbX4Ok9YX94) - For the inspiring tutorial on building a Discord Clone.
- Discord - For the inspiration behind the user interface design.
- Open-source community - For the invaluable resources and contributions.
