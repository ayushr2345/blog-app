# Blog App

This repo consists of the frontend and the backend of the web app created by me [Tweeter](https://github.com/ayushr2345/Tweeter) which can be visited [here](https://ayushr2345.github.io/Tweeter).
 - The user needs to create an account on the app to view blogs from other users and create any blogs
 - The app allows user to create, read, update or delete any of their blogs and view others blogs also
 - The app also gives an option to add any bio, update DOB, view other users' bio, blogs
 - The app also supports adding a profile picture to your account which is visible to all the users

## Frontend

The frontend uses ReactJS with bootstrap and MUI icons in it. The frontend allows users to perform CRUD (create, read, update and delete) operations on their blogs and their account. The app asks for an email which would be unique and the name, password for authentication. The front end is responsive to laptops and mobile screens

 - Home Page
![image](https://user-images.githubusercontent.com/64428099/163404986-5ef4a2fd-1c03-4a5c-8b8d-c062f66f72c1.png)
 - Login & Signup
![image](https://user-images.githubusercontent.com/64428099/163405208-ff044393-84bd-4bd9-929e-ac4f4ccea7bb.png)
![image](https://user-images.githubusercontent.com/64428099/163405254-fa84b8e3-4c45-4051-9611-584b5392cd06.png)
 - Dashboard - It shows a form to create a new blog, view all the blogs and take a look on the latest three blogs, an option to view the profile and logout of the session
![image](https://user-images.githubusercontent.com/64428099/163405616-82079490-c0c4-4c17-b5e7-685dd4ddec91.png)
 - Profile Page - The user can view their blogs, edit them, delete them, update their profile and their profile picture
![image](https://user-images.githubusercontent.com/64428099/163405910-86236295-62d3-4b31-9efe-d4b064c136de.png)
 - Update Blog Option
![image](https://user-images.githubusercontent.com/64428099/163406070-c3db33d5-fcc6-4582-94a0-4f4e1d274188.png)
 - Delete Blog Option
![image](https://user-images.githubusercontent.com/64428099/163406175-f5e17a7d-f434-4ea8-aaf3-56ff1960eded.png)
 - Update Profile Option
![image](https://user-images.githubusercontent.com/64428099/163406237-1ac4721e-75a4-4c62-8544-41e7585d56bc.png)
 - Deleting Profile Option
![image](https://user-images.githubusercontent.com/64428099/163406326-d7717885-e935-41cc-a71c-086139ee1a26.png)


## Backend

 - The backend is made using NodeJS and uses the ExpressJS framework
 - The database used is MongoDB Atlas
 - The authentication of users is done by PassportJS which stores the password in encrypted format using the crypto module
 - The profile pictues of the users are stored in the form of base64 string
