![WirSindOhana](/src/client/resources/wirsindohana.png?raw=true "WirSindOhana")

# WirSindOhana - Survey

All source code for our [WirSindOhana Survey](https://wirsindohana.herokuapp.com) App on Heroku. An app where Trailblazers can suggest topics/learning goals for their community meetings. 

## How to start?

Start simple by running `npm run watch`. This will start the project with a local development server.

The source files are located in the [`src`](./src) folder. All web components are within the [`src/client/modules`](./src/modules) folder. The folder hierarchy also represents the naming structure of the web components. The entry file for the custom Express configuration can be found in the ['src/server'](./src/server) folder.

This repo includes a JSForce connection that needs username and password to be set up as environment variables. In the `unmanaged` folder you will find all necessary metadata.

This LWC project comes pre-bundled with the Lightning Design Sytem [SLDS](https://www.lightningdesignsystem.com/).

Kudos for the the main repo on [GitHub](https://github.com/muenzpraeger/create-lwc-app) to [Muenzpraeger](https://github.com/muenzpraeger/create).
