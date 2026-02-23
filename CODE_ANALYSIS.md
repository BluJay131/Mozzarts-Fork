## **Cyclomatic Complexity Analysis (Arteen Ramezani):**

For this task, I analyzed the bot by measuring the cyclomatic complexity of its methods, with a primary focus on the trivia command where most of the core logic for our bot is. I reviewed the code to identify decision points such as conditional statements, loops, and error-handling paths that increase the number of possible execution flows within each method. This analysis showed that most helper functions fall within a low to moderate complexity range, which is good. But, two outliers are the main `execute(interaction)` handler and the `getRandomItunesTrack` method that have significantly higher complexity due to a lot of branching and control flow. Although the bot functions correctly, these areas represent higher risk for maintenance and testing because of the number of possible paths through the code.

### **Cyclomatic Complexity by Method**

- `execute(interaction)` → ~45 (**Very High**)
- `getRandomItunesTrack` → ~20 (**High**)
- `isCorrectGuess` → ~9 (**Moderate**)
- `findTextChannel` → ~9 (**Moderate**)
- `requestBuffer` → ~6 (**Low–Moderate**)
- `cleanupSession` → ~5 (**Low**)
- `ensureVoiceConnection` → ~5 (**Low**)
- `normalizeString` → ~3 (**Low**)

## **Cohesion and Coupling Analysis (David Hochberg):**

In software engineering, cohesion is when a function operates as its own unit, creating a stable and efficient architecture. Contrarily, coupling occurs when there are many interdependencies between the features of the project. I analyzed our bot’s architecture and code to determine which aspects are cohesive and what is coupled. From this, I found that most of our bot is cohesive. However, player interactions are currently coupled, with multiple components sending messages to the players.

### **Cohesion and coupling of Different Functionalities**

What is cohesive in our current design/architecture:

- **Score count**: Keeps track of itself and has methods to call it from other files.
- **Rules**: Is its own, separated feature with few connections.
- **Data for questions**: It’s stored in its own file that other files can interact with.
- **Playing music in voice chat**: neatly put into 2 files with one method to call it.

What is coupled in our current design/architecture:

- **List of players / player interaction**: there are many things that interact with the players (send messages, etc) but no dedicated object to manage players

What is in the middle (could be improved, but not the worst):

- **Getting songs from iTunes API**: We currently have two methods for this in two places: getRandomItunesTrack in trivia.js and getRandomItunesPreview in game.js. Could be put into its own cohesive object, which would also remove the repetition.

## **Technical Debt & Code Smells** (Will Sarmiento)

For this task, I investigated our bots technical debt and code smells to use to develop high priority issues to solve to create a better infrastructure and maintainability for the bot.

To begin with, the bot has many code smells and technical debt as of currently. We have technical debt in our code with namely documentation, outdated, and code debt where we can see how our design has changed throughout the development cycle. One debt that we have comes in the form of documentation debt from the [trivia.js](src/commands/trivia.js), [getScore.js](src/commands/getScore.js), [game.js](src/commands/game.js), and the [score.js](src/commands/score.js) ( All within the src/commands/ folder) files. We have a huge amount of documentation debt with little to no documentation per file. Namely the biggest debt is [trivia.js](src/commands/trivia.js) but only because it is such a huge file. The other helpers, commands and events have little to no documentation. Based on OOP, we have a huge function [trivia.js](src/commands/trivia.js) that has one huge export function that contains a whole 400 lines of code with some documentation, however, a lot of files have this.

Next, we have outdated debt which we can see due to outdated functions that are no longer used. One such file is the [rules.js](src/helpers/rules.js) with the [game.js](src/commands/game.js) which does not seem to be used anymore for the core gameplay loop. This needs to be addressed.

Lastly for the technical debt is code debt, a merge conflict with the [getScore.js](src/commands/getScore.js) and [score.js](src/commands/score.js) and [scoreStore.js](src/helpers/scoreStore.js) led to undetermined and lacking review which has led to a broken unfixed score tracker and rewarding system.

As for code smells, our bot has is a large class in which can be further broken down to be better, as well as import "mayhem" withh so many imports that maintaining the class would be hard mainly due to it using so many which is attributed to the large class. [trivia.js](src/commands/trivia.js)

## **Test Coverage Analysis (Jayden Elishaw):**
For this task, I attempted to measure our test coverage across the entire project by running Mocha test suite under a standard Node coverage tool (c8/nyc). The plan was: install dependencies (npm ci), confirm tests run (npm test), then generate coverage (npx c8 npm test or an npm run coverage script). Currently we have ZERO tests at all thus 'npm test' outputs "Error: No test files found: "./tests/*.spec.js"". Even without a tool-generated report, I verified that our current tests coverage as in commands, event handlers, game state transitions, score persistence, hint/rules helpers, and loader logic are all currently untested. On top of that, the existing trivia test suite includes assertions explicitly marked “expected to fail,” which means we don’t yet have a clean “green” baseline suitable for gating or tracking coverage over time.

## Threat Model Analysis (Kieran Moynihan)

For this task, I developed a threat model to analyze potential security risks and weaknesses in our Discord bot. Because the bot accepts input directly from Discord users through slash commands and interaction events, it is important to evaluate how malicious or unexpected input could affect the bot’s stability, reliability, and integrity.

### Assets to Protect

The primary assets that need protection include:

- Bot uptime and overall stability  
- Score tracking and game state data  
- Discord server integrity  
- Bot configuration and authentication credentials  

If any of these assets are compromised, the bot could crash, behave incorrectly, or produce inaccurate results.

### Threat Actors

The most likely threat actors are Discord users, including those who may intentionally try to break the bot by providing invalid input, spamming commands, or triggering unexpected behavior. Since the bot is publicly accessible within the server, any user can interact with it and potentially exploit weaknesses.

### Attack Surfaces

The primary attack surface is user input through slash commands and interaction events. Because users control the input, they may provide malformed, unexpected, or extreme values that the bot does not properly handle. This could result in crashes, undefined behavior, or corrupted game state.

Another attack surface is the bot’s dynamic loading of command and event files. If file handling is not carefully controlled, it increases the risk of loading unintended or invalid code.

### Identified Threats

The following threats were identified during this analysis:

- Malformed or unexpected user input causing crashes or incorrect behavior  
- Command spam leading to performance degradation or denial of service  
- Improper input validation allowing corruption of score or game state data  
- Unhandled exceptions causing the bot to stop responding  

These threats primarily impact the bot’s stability and reliability.

### Mitigations

To reduce these risks, the bot should implement stronger input validation and improved error handling. Adding try/catch blocks around command execution would prevent crashes caused by unexpected input. Implementing rate limiting would reduce the risk of command spam. Additionally, improving logging and validation would make the bot more resilient and easier to maintain.

Overall, this threat model identified several vulnerabilities related to user input and command handling. Addressing these risks would improve the bot’s reliability, stability, and overall security.
