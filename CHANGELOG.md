# Changelog

All changes made to Chef Christoffel's Garden Menu since Part 2.

---

## Final POE->

### Bug Fixes Based on Part 2 Feedback

- **Course selection was not a real dropdown** — replaced the three toggle buttons with an actual Picker dropdown component from @react-native-picker/picker. Selected course highlights green, unselected options have a black background with white text.
- **Total items and prices not visible enough** — redesigned the stats section on the home screen with a green bordered card, larger white numbers and clearer labels per course.

### New Features

- Average price per course (Starters, Mains, Dessert) displayed on home screen
- Menu items saved in a shared array in App.tsx and passed to all screens
- Remove dish functionality added with red delete button on each dish card
- Filter screen allows guests to filter dishes by course with large tap buttons showing dish count per course
- Separate Manage Menu screen handles all adding and removing of dishes

### UI Improvements

- Stats section redesigned with green bordered overview card
- Dish cards now have a green left border accent for visual consistency
- Filter buttons made larger and easier to tap
- Course tags styled as pill badges on home screen
- Chef Christoffel earth and herbs logo added to top left of every screen header
- Removed italic styling from course tags on filter screen

### Code Refactoring

- calcAverage function in HomeScreen now uses a for loop instead of reduce
- Separated render functions into named functions (renderMenuItem, renderDish) for cleaner code
- Added descriptive comments to all key functions across all screens
- Improved input validation in saveItem to handle invalid or negative prices
- Logo extracted into its own HeaderLogo component in App.tsx

---

## Part 2 — Original Submission

- Home screen displaying full menu with dish name, description, course and price
- Manage Menu screen with add dish form and remove functionality
- Filter screen with course filter buttons
- Bottom tab navigation between all three screens
- Shared state managed in App.tsx

