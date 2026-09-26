# AngularExercise

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.9.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Mock API

Product and category data is served live at:

```
https://runaq-api.onrender.com
```

- `GET /categories`
- `GET /products`

This is hosted on a free instance that sleeps after ~15 minutes of no traffic, so the first request after a while can take up to a minute to respond — that's expected, not a bug.

The source data lives at [github.com/YoussefEzzat17/runaq-api](https://github.com/YoussefEzzat17/runaq-api) — check it if you need to see the exact shape of a category or product.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
