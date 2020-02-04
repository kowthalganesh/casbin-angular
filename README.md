# CasbinAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.24.

## Install casbin dependency

    npm install casbin --save
    npm install buffer --save

## Configuration in Package.json

    `"browser": {
        "fs": false,
        "path": false,
        "os": false
    }`

    Add the above configuration in package.json, casbin is node packager, it allow us to load the policy and datarules through text and file path, since its browser we can't go by file path, fs is a nodejs package, you cant execute this package in browser anyway

## Settings in Polyfill.ts

    (window as any).global = window;
    // @ts-ignore
    window.Buffer = window.Buffer || require('buffer').Buffer;

    Add the above code snippet on polyfill.ts to refer the node packages

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Application overview

    There are two text area, 
        1. Policy -- you can expose an api for policy or refer from angular application itself like a constant value
            Policy supports different combination based on your business need, refer the following link
                https://casbin.org/docs/en/supported-models

        2. Data rules --- you can expose from an api for your application dataset

    Text field - refers to userid, if you map the existing user, who is available in dataset and check the user to authorize for action
                 which return the result as true

                 if you tried different user or different end point it will pass the result as false

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
