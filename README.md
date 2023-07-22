# Stock Chart Viewer

React based Application for tracking Stock Day, Weekly and Monthly movement. You can search stock directly by `Name` and `Ticker`.

## Tech Stack

### Frontend

-   Frontend: React, TypeScript, Material UI, ReCharts, Axios and Lodash(Debouncer)
-   Backend: ExpressJs, Cors, Yahoo-finance.

## Folder Structure

There are 2 main folders: Frontend and Backend.

-   Frontend: Entry point `index.tsx`. Smallest atomic components are present in `components` folder and developing functional components in `containers` folder. Interfaces for arguments and Responses in `types` folder.

## Development Philosophy

1. Frontend

    - Reusable functional components with type checking using `TypeScript`.
    - Used `React Context APIs` for props passing and updating props state.
    - `Responsive UI` making it accessible from different devices.

2. Backend
    - ExpressJS for APIs development.
    - Functional business logic separated in `service` folder
    - `CORS` for different domain/Port access
    - `Express Router` for easy development of different services which are be scaled by different devs
    - `Recommendation` API for Autosuggestion
    - Search functionality based on `Name` and `Ticker`

## How to Run

## Walkthrough

1. ![Initial Loading State](./screenshots/initial.png)
