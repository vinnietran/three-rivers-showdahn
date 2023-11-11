# three-rivers-showdahn

## Overview
This repository contains a simple, customizable HTML quiz game. Users can modify the var questions array to create their own set of questions, making the quiz adaptable for different topics and audiences.

## Features
Easy to customize question set
Simple, user-friendly interface
Compatible with most web browsers

## How to Use
Clone the Repository

Use git clone [[three-rivers-showdahn](https://github.com/vinnietran/three-rivers-showdahn)] to clone this repository to your local machine.

## Customize Questions 
Navigate to the index.html file.
Locate the var questions array.
Modify the array with your desired questions and answers.
Launch the Quiz

Open the index.html file in any web browser to start the quiz.
Customizing Questions
To customize the quiz, edit the var questions array in the script.js file. The array format is as follows:

```javascript
var questions = [
  {
    question: "Your Question Here?",
    choices: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correctAnswer: 1 // index of the correct option
  },
  // ... Add more questions in the same format
];
```

## Contributing
Contributions to enhance this simple quiz game are welcome. Please fork this repository and submit a pull request with your improvements.

## License
This project is open-sourced under the MIT License.

## Contact
For any queries or suggestions, feel free to open an issue in this repository.
