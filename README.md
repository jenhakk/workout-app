# Workout app

**This repository is created for the frontend of our workout app. The project is for Mobile Programming course of Häme University of Applied Sciences. Here you can check [the backend](https://github.com/jenhakk/BE_WorkoutApp) part.**

## Description

App is designed to keep track of workouts and personal measurements. It focuses primarily on training done with weights or own body weight, which consists of series, repeats and weights or duration. The app is easy and simple to use and doesn’t take time from the actual workout. The user can browse their previous measurements and workout sessions and see their progress. The app is targeted for goal-oriented trainers regardless of gender or age, but for now the app doesn’t serve all sports, for example running, swimming, etc. 

The application is clear and simple to use during workouts. There are round shapes and bigger sized texts and buttons and it has space around elements with light and bright colors. Navigation is fluid and logical with minimal effort.

The frontend has been created with **React Native** and the app runs with **Android Studio**. The shown data is fetched from **MySQL database**. 

## Screens

### Home
This view shows date and zen quotes and forwards to add exercise and measurements and see workout and **Measurement history** by simple buttons.

### Profile
The user can fill in their personal information on profile, like name, location, their slogan and add a profile picture. 

### Measurements 
The user can add their weight and other measurements via inputs. For now, there’s limited amount of different measurements the user can add, but later the list could be extended and the user could update their measurements. User can examine and update the changes from the history view.

### Workout
When starting a new workout, the app forwards user to a view, which consists of the list of possible exercise moves that user can choose from. The list comes from the database. After the user has built their upcoming workout, they press the Start Exercise button.  

On the next view, the user can see their chosen moves with the chart they can fill in series, repeats and weights or duration. After the user has done their workout, they press Finish Workout button, the app asks for confirmation that information is correct and this triggers another alert, which congratulates the user and asks for a review of workout.  

Finally, the user is directed to summary view of their workout. The user can examine their progress of workout on **Workout History view**, which can be accessed either from workout summary view or home view. The user can view and possible delete their workouts.

## Conclusion

In this project we made our first mobile application. The project was very educational and gave us good knowledge on what to consider when creating a mobile app. Not only did we learn the techniques but also the difference when creating logic and layout of basic web applications. It improved our Javascript and general UI skills. We also had more complex database structure than before which brought as some extra challenge. We also learned how to combine frontend and backend written in different languages and IDEs and how to transfer data between them. The navigation caused some difficulties e.g. how to transfer data between screens and components, but we were able to figure it out.

## How to improve the application in the future

* Loading screen with logo
* We wanted the application to be in one person's use only but with login feature it could have the possibility to add more accounts.
* Editing saved measurements
* Adding new exercises to the database
* Getting date from date picker (calendar)
* Changing app's language
* Calculating exercise's duration with stopwatch
* Editing the number of series of exercise
* Saving favourite exercises

