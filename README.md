# Crunchyroll Mobile App Recreation

## Project Overview

This project is a recreation of the Crunchyroll mobile application, developed using **React Native, Expo, and TypeScript**.

The goal of this assignment was to recreate the layout and navigation of an existing mobile application while demonstrating the use of multiple screens, Tab and Stack navigation, reusable components, and dynamic content.

The application uses sample anime data and placeholder images to recreate the appearance and basic interactions of Crunchyroll.

**GitHub Repository:** https://github.com/Patrick-Bouley/multi-screen-app

## Features

### Home
- Featured anime carousel with automatic transitions.
- Horizontal carousels for trending anime and simulcasts.
- Continue Watching section displaying episode information.
- Navigation from anime cards to individual details screens.

### My Lists
- Watchlist that displays saved anime.
- Ability to add or remove anime from the Watchlist.
- Shared Watchlist information across screens using React Context.
- Additional categories for Crunchylists, History, and Downloads.

### Browse
- Two-column grid displaying anime from the catalogue.
- Horizontal category navigation.
- Separate All Anime and Simulcasts categories.
- Navigation to individual anime details.
- Options to add or remove anime from the Watchlist.

### Shopping
- Placeholder screen representing the Crunchyroll Store.

### Account
- Profile banner with avatar and username.
- Account settings and preferences.
- Interactive switches and sample selection options.

### Anime Details
- Dynamic details screen based on the selected anime.
- Anime artwork, title, description, genres, and ratings where available.
- Expandable description.
- Ability to add or remove anime from the Watchlist.
- Placeholder controls for playback, sharing, and other features.

## Technologies Used

- **React Native** – Mobile application development
- **Expo** – Development and testing environment
- **TypeScript** – Application programming language
- **Expo Router** – Tab and Stack navigation
- **React Context API** – Shared Watchlist state
- **Expo Vector Icons** – Application icons


## Getting Started

### Requirements
- Node.js
- npm
- Visual Studio Code or another code editor
- Expo Go on a compatible mobile device, or an Android/iOS emulator

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Patrick-Bouley/multi-screen-app.git
   ```

2. Navigate into the project folder:

   ```bash
   cd multi-screen-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the Expo development server:

   ```bash
   npx expo start
   ```

5. Scan the QR code using Expo Go on a compatible mobile device, or launch the application using a configured emulator.

## Navigation

The application uses a combination of **Tab and Stack navigation**.

- **Tab Navigation:** Allows users to switch between Home, My Lists, Browse, Shopping, and Account.
- **Stack Navigation:** Opens individual anime details screens and allows users to return to the previous screen.
- **Dynamic Routing:** Uses the selected anime's ID to display the appropriate details.

## Notes and Limitations

- This is an educational recreation and is not affiliated with Crunchyroll.
- Anime information is stored locally in sample data files.
- All images use placeholder URLs.
- Playback, shopping, and certain menu options are visual placeholders.
- Watchlist information is stored in React state and resets when the application restarts.
- Some categories and settings contain placeholder content.

## Reference Application

The application layout is based on the Crunchyroll mobile app. Reference screenshots and comparison screenshots were captured to demonstrate the recreated interface.

## Purpose

This project demonstrates the use of React Native components, Expo Router navigation, TypeScript, reusable components, shared state, and consistent styling to create a multi-screen mobile application.