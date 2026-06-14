# Chef Christoffel Garden Menu 

## Project Overview
This application is a cross platform mobile menu management system developed for a private chef using React Native and Expo. It allows for real time updates to a digital menu ensuring that guests always see the most current culinary selections. The project focuses on state management across multiple screens and data filtering based on specific categories.

## Core Functionality
Home Screen
The primary landing page displays the complete menu. It includes a dynamic summary section that shows the total number of items and the average price for each course category including Starters, Mains, and Desserts.

Manage Menu Screen
This administrative screen allows the chef to add new dishes by providing a name, description, price, and course category. It includes input validation to ensure data integrity. Users can also remove items from the menu using the delete function.

Filter Screen
The filter screen provides a read only view for guests. It utilizes specific logic to sort and display menu items based on the selected course, allowing for an organized browsing experience.

## Technical Implementation
State Management
The application utilizes the React useState hook within the root App component. This serves as the single source of truth, ensuring that data is synchronized across the Home, Manage, and Filter screens through props.

## Navigation
Navigation is handled by a Bottom Tab Navigator. This provides a persistent and intuitive way for users to switch between the three main functional areas of the app.

## Animation
A custom scale and fade animation is implemented on the Home Screen. This enhances the user experience by providing a smooth visual transition when the menu list updates.

## Language and Tools
TypeScript

React Native

Expo

GitHub for version control

## Setup Instructions
Clone the repository from GitHub

Install dependencies using npm install

Start the application using npx expo start

View the app using the Expo Go mobile application or an emulator

## Changelog — Changes Since Part 2

### Bug Fixes from Part 2 Feedback
- **Course selection was not a real dropdown** — replaced the three buttons with an actual Picker dropdown component from @react-native-picker/picker. The selected course highlights in green.
- **Total items and prices not visible enough** — redesigned the stats section on the home screen with a bordered green card, larger white numbers and clearer labels for each course average.

### New Features Added for Final POE
- Added average price per course breakdown on the home screen (Starters, Mains, Dessert)
- Moved dish adding functionality to a dedicated Manage Menu screen
- Menu items are stored in a shared array in App.tsx and passed down to all screens
- Added remove functionality with a red delete button on each dish
- Added Filter screen allowing guests to filter dishes by course
- Added Chef Christoffel logo to the header of all screens

### Code Improvements
- Refactored calcAverage function in HomeScreen to use a for loop
- Added descriptive comments to all key functions and components
- Separated render functions (renderMenuItem, renderDish) for cleaner code
- Improved input validation in saveItem to check for invalid prices

### UI Improvements
- Stats section redesigned to be more visible with green bordered card
- Dish cards now have a green left border accent
- Filter buttons made larger and easier to tap
- Course tags on home screen styled as pill badges
- Logo added to top left of every screen header

---

## References

- React Native Documentation: https://reactnative.dev/docs/getting-started
- Expo Documentation: https://docs.expo.dev
- React Navigation: https://reactnavigation.org/docs/getting-started
- React Native Picker: https://github.com/react-native-picker/picker
- TypeScript Documentation: https://www.typescriptlang.org/docs


