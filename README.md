# Latent Space | Shaik Zaheer Hussain's Portfolio

**Latent Space** is a specialized portfolio website designed for a Generative AI & Computer Vision researcher. It features an immersive, shader-based 3D environment that represents the internal state of a neural network.

![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React Three Fiber](https://img.shields.io/badge/R3F-8.x-orange)

## ✨ Features

- **Neural Cloud Background**: A custom interactive particle system (`THREE.Points`) that simulates a living neural network field. The cloud's color shifts dynamically to match the user's current role.
- **Dynamic Role Cycling**: Animated text that cycles through professional titles (AI Researcher, Gen AI Specialist, etc.), synchronized with the background theme.
- **Immersive Interactions**: Smooth transitions, parallax effects, and hover-triggered UI enhancements using `framer-motion`.
- **Project Showcase**: A responsive grid layout for projects with glassmorphism cards and hover-lift effects.
- **Optimized Performance**: Hardware-accelerated 3D graphics and efficient asset handling via Next.js.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
- **3D Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) & [Drei](https://github.com/pmndrs/drei)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `app/components/NeuralCloud.tsx` - The core 3D particle system component.
- `app/page.tsx` - The main entry point containing the Hero and Projects sections.
- `public/resume.pdf` - Downloadable resume file.

## 🚢 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
