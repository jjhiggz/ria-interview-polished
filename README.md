# Weather App

A simple weather application that displays forecast data for multiple cities using the OpenWeather API.

## Features

- View weather forecasts for Rio De Janeiro, Beijing and Los Angeles
- See hourly and daily weather forecasts for each city
- Refresh weather data on demand
- Search for additional cities (bonus feature)

## Setup

### Installation

#### 1. Clone the repository

First, you need to clone the repository to your local machine. Open your terminal and run the following command:

```bash
git clone https://github.com/jjhiggz/ria-interview-polished.git
cd weather-app
```

#### 2. Install dependencies

Navigate to the project directory and install the necessary dependencies by running:

```bash
npm install
```

#### 3. Start the development server

After installing the dependencies, you can start the development server to run the application locally. Use the following command:

```bash
npm run dev
```

#### 4. Open the application in your browser

Once the development server is running, open your web browser and navigate to `http://localhost:3000` to view the weather application.

### Configuration

To use the OpenWeather API, you need to obtain an API key. Follow these steps to configure the application:

1. Sign up for a free account at [OpenWeather](https://openweathermap.org/) and get your API key.
2. Plug your api key into the UI

### Making a Query

To make a query to the OpenWeather API, follow these steps:

1. Enter a city name in the search bar at the top of the application.
2. Press the "Search" button or hit the "Enter" key to submit the query.
3. The application will send a request to the OpenWeather API using the provided city name.
4. If the city is found, the weather data will be displayed on the screen.
5. If the city is not found or an error occurs, an appropriate message will be shown.

Note: The application uses the OpenWeather API's "Current Weather Data" and "5 Day / 3 Hour Forecast" endpoints to retrieve weather information for the specified city.

## Technologies Used

The weather application is built using the following technologies:

- **Tanstack Start**: Tanstack Start is a full-stack framework built on top of Tanstack Router. It provides a powerful and flexible routing solution with features like file-based routing, data loading, and server-side rendering. Tanstack Start simplifies the development process and offers a seamless integration between the frontend and backend. For more information on why Tanstack Start was chosen, refer to the [Tanstack Router documentation](https://tanstack.com/router/v1/docs/overview).

- **Tailwind CSS**: Tailwind CSS is a utility-first CSS framework that allows for rapid UI development. It provides a comprehensive set of pre-defined utility classes that can be easily composed to create custom designs. Tailwind CSS enables consistent styling, responsive layouts, and easy customization. The decision to use Tailwind CSS was based on its flexibility, developer experience, and the ability to quickly build attractive user interfaces. For more details on the benefits of Tailwind CSS, check out the [Tailwind UI documentation](https://tailwindui.com/documentation).

- **React**: React is a popular JavaScript library for building user interfaces. It provides a component-based architecture that allows for modular and reusable code. React's virtual DOM and efficient rendering mechanism make it suitable for building dynamic and interactive applications. The weather application leverages React's capabilities to create a responsive and user-friendly interface. For more information on React and its ecosystem, refer to the [React documentation](https://reactjs.org/docs).

- **TypeScript**: TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing, classes, and other features to enhance the development experience and catch potential errors early in the development process. The weather application is written in TypeScript to benefit from its type safety, improved tooling support, and enhanced code maintainability. For more details on TypeScript and its advantages, see the [TypeScript documentation](https://www.typescriptlang.org/docs).

- **Vitest**: Vitest is a fast and lightweight testing framework for Vite-based projects. It provides a simple and intuitive API for writing unit tests, integration tests, and snapshot tests. Vitest leverages the power of Vite's build system to enable lightning-fast test execution and minimal configuration. The weather application uses Vitest to ensure the correctness and reliability of its codebase. Tests are written to verify the functionality of components, utility functions, and data fetching logic. Vitest's seamless integration with Vite and its focus on performance make it an excellent choice for testing modern web applications. For more information on Vitest and its features, refer to the [Vitest documentation](https://vitest.dev/guide/).

## Weather App Poem

Oh, the weather, it's quite a show
With Tanstack and TypeScript, it's all aglow
Tailwind styles, so flashy and bold
Vitest makes sure, the code's not mold

From scorching heat to freezing toes
The app adapts, with its fancy prose
With types so strict, and components galore
The codebase is like, a well-organized store

Through rain or shine, sleet or hail
The weather app, it shall not fail
Built with love, and tested with glee
It's like a digital weatherman, you see

So let the weather, be wild and free
With these tech tools, we'll make it a spree
For an experience, that's oh so grand
The weather app, it's like a rock band

Tanstack, TypeScript, Vitest, and Tailwind
Together they form, a quirky kind
Of weather-telling, code-slinging delight
The weather application, a hilarious sight!
