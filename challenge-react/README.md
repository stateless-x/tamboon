<p align="center">
  <a href='https://www.omise.co'>
    <img src="https://cdn.omise.co/assets/omise-logo/omise-wordmark.png" width="300" />
  </a>
</p>

**Tamboon React** is a code challenge for frontend developer.

## Scenario

Once upon a time.. nope!  
So here, you have been temporarily hired by Omise and assigned to work on the charity donation project which the previously assigned front-end developer and designer got the urgent matters to solve, so they will not be able to finish the project on time..

Fortunately, the API server is already done. You will need to grab on the requirements and complete the project while ensuring the application to have great engineering and well-design ✨

![tamboon-react-screenshot](https://git.omise.co/storage/user/56/files/b407c6c4-ad09-11e7-8792-dc5b468333df)

## Mission

Well, grap your guns, stock up your food and bring down your armor. We gonna need it for tonight!  
**Here are the tasks you must complete:**

- [✅] Complete the application according to the design (image above).
- [✅] Complete these features that are not in the design (you have freedom to design and position to display).
  - Display all donation amount.
  - Display a message when paid.
- [✅] Make the donation feature works correctly.
  - Amount in all donations should be displayed correctly despite users close and come back later.
  - Database (db.json) should have the new valid data when paid.
- [✅] Refactor the code to be more readable and enhance reusability.
- [✅] Use [styled-component](https://www.styled-components.com/), [JSS](https://cssinjs.org/) or CSS, for styling part.
- [✅] Write a nice commit message and order it well.
- [✅] Display well in most modern browser (Google Chrome, Safari, Firefox).

#### Bonus

- [✅] Supporting different screen sizes (responsive).
- [🤔] Write helpers or components unit tests with [jest](https://facebook.github.io/jest/).

## Rules

Desire to win the war? Well, to make it a little more fun, please remember that

**You cannot:**

- Change existing behaviors.
- Change the API server.
- Change from JavaScript/TypeScript to other languages.

**In the other hand, feel free to:**

- Improve the design to have better UI and UX.
- Re-organize the codebase.
- Create new modules/methods/components.
- Modify existing code.
- Add new packages.
- Update `webpack` config.
- Change language from JavaScript to TypeScript.
- Take reasonable time to complete the challenge, no need to rush.
- Edit `README.md` to add documentation. What have you done or how to run or test your app?

**Note**: You can see design inside folder `resources`.

## Surprise us!

You can push the project to your Github then share the link with us, or you can zip the project and send it back to us as well. Your commit message must communicate clearly what has been done in each commit.

If you notice more bugs in the original implementation you can add fixes for those as well. You won't be penalized if you don't. However we ask you not to add more features than the one given in the mission list.

Let's rock! :metal:


## What I Did
**In summary:**
 - Tried to understand the behavior of the code
 - Refactor it into parts for maintainability
 - Design simple wireframe
 - Research UI lib (I want to keep component into the same themes)
 - Picked Mantine
 - Started working on UI
 - Made it responsive
 - Added logic to show amount donated to each charity
 - Added/Fix test case
 
 ---

 ## How I run:
 I use Node version 20.11.0
 - Get `nvm` and use the same version [Read More Details](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)
 - run `yarn install` to get all the packages
 - `yarn server` to start database
 - `yarn client` to start client

Note: I have issue with the config. You might not be able to run it, but I wrote a test case and thefixed incorrect one.
 - `yarn jest` to run jest testing file 
