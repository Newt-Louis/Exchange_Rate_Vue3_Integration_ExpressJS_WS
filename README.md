# Exchange Rate App

- An application that lists exchange rates from many banks.
- THIS PROJECT IS ONLY FOR RESEARCH AND STUDY PURPOSE

## Lessons Learned

- ExpressJS for Back-End, VueJS for Front-End.
- **Websocket** for realtime data from banks website. Understood how **Websocket** Server work flow with HTTP Server.
- **Puppeteer** to controls Chromium and more.
- Read and understand the HTML content structure of websites, know how to synthesize necessary data and package the content as optimally as possible.
- Optimize data to be as standard as possible.
- **Server Side Rendering** techniques.
- Understand and properly apply the context of **heap** and **stack** for primitive data types and reference data types (object, array).
- **Heap** and **stack** are also closely related to errors that accidentally break vue's reactivity abilities.

## Documents, package needed

- HTML CSS Javascript
- NodeJS (ExpressJS)
- VueJS and SSR techniques of Vue
- Vite with SSR
- Pinia store
- Vue-router
- Vue UI library (Ant Design Vue)
- Puppeteer

## Status

_Initialize and install the necessary dependencies for the project._

_Build the basic steps to use Server Side Rendering techniques._

_The project has completed the main task of scraping foreign exchange rate data from banks' websites, then feeding the data to the websocket and automatically pushing the data to the front-end._

_Pre-build file read and write paths to expand when additional databases are needed later._

_Use additional ping and pong methods to check the connection status of the websocket._

_Vuejs front-end has a lot of extensibility capabilities, but always be careful with values ​​that are first initialized in memory on the server and updated again on the client._

---

# Instruction

_First you will need to install nodejs and git on your computer._

_Then you clone this project by click on Code button then copy link to git or just download zip file of this project_

## Requirement

- ==NodeJS ~ v20==
- ==Copy ".env.example" to ".env" so that the server expressjs can use enviroment variables.==

## Install

1. Clone project

> `$ git clone https://github.com/Newt-Louis/Exchange_Rate_Vue3_Integration_ExpressJS_WS.git`

2. Install NPM

> `$ npm install`

3. Copy .env.example and rename it to .env

![Copy env file](/public/env-copy.png)

4. If you have your own eslint file on your computer just delete my eslint.config.mjs

5. Run the project

> `$ npm run dev`

## Authors

[Newt Louis](https://github.com/Newt-Louis)

_Thanks for your concern about this project_
