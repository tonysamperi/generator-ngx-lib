![generator-ngx-lib-banner]

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

[Yeoman](http://yeoman.io) generator to create a standalone [Angular](https://angular.io/) library in seconds.

## Introduction to generator-ngx-lib

This project is the definitive solution for creating Angular 5 6 7 and 8 libs

If you want to create an Angular library with directives, services and/or pipes, then this generator is just what you need.

This generator aligns with the [official Angular Package Format](https://goo.gl/AMOU5G) and automatically generates a [Flat ES Module](http://angularjs.blogspot.be/2017/03/angular-400-now-available.html), a UMD bundle, a single metadata.json and type definitions to make your library ready for AOT compilation by the consuming Angular application.

Watch [Jason Aden's talk](https://www.youtube.com/watch?v=unICbsPGFIA) to learn more about the Angular Package Format.

More specifically, the latest version of this generator:

- supports Angular 5, 6, 7 and 8
- creates and configures `package.json` for the development of your library
- creates and configures `tsconfig.json` for your editor during development
- creates and configures `tslint.json` for linting and consistent codestyling purposes
- creates and configures `.gitignore`, `.npmignore` and `.travis.yml`
- creates the main library file and a sample component which can be immediately be build and imported in other projects
- configures [tslint](https://palantir.github.io/tslint/) for you with [codelyzer](https://github.com/mgechev/codelyzer) support
- creates and configures build scripts to generate the final package through ng-packagr
- supports .scss files
- supports unit tests and code coverage using [jest](https://facebook.github.io/jest/)

This generator is built for Angular version 5 and above, hence the name **ngx-lib**. 

## Quick start

![generator-cmd-demo]

First, install [Yeoman](http://yeoman.io) and generator-ngx-lib using [npm](https://www.npmjs.com/) (assuming you already have [node.js](https://nodejs.org/) pre-installed).

```bash
$ npm install -g yo
$ npm install -g generator-ngx-lib
```

make a new directory and `cd` into it:

```bash
$ mkdir angular-library-name
$ cd angular-library-name
```

and generate your new library (you can omit 'generator-' and just use ngx-lib-two):

```bash
$ yo ngx-lib
```

The generator will prompt you for:

```bash
? Your full name: Tony Samperi
? Your email address: github@tonysamperi.it
? Your library name (kebab case): angular-lib-name
? Git repository url: https://github.com/your-name/angular-lib-name
```

and create the following files for you:

```bash
.
├── README.MD
├── gulpfile.js
├── package.json
├── src
│   ├── index.ts
│   ├── package.json
│   ├── sample.component.ts
│   ├── sample.directive.ts
│   ├── sample.pipe.ts
│   ├── sample.service.ts
│   └── tsconfig.es5.json
├── tsconfig.json
└── tslint.json
```

You can then add or edit `*.ts` files in the `src/` directory and run:

```bash
$ npm run build
```

to automatically create all `*.js`, `*.d.ts` and `*.metadata.json` files in the `dist` directory:

```bash
dist
├── index.d.ts                  # Typings for AOT compilation
├── index.js                    # Flat ES Module (FESM) for use with webpack
├── lib.d.ts                    # Typings for AOT compilation
├── lib.metadata.json           # Metadata for AOT compilation
├── lib.umd.js                  # UMD bundle for use with Node.js, SystemJS or script tag
├── package.json                # package.json for consumer of your library
├── sample.component.d.ts       # Typings for AOT compilation
├── sample.directive.d.ts       # Typings for AOT compilation
├── sample.pipe.d.ts            # Typings for AOT compilation
└── sample.service.d.ts         # Typings for AOT compilation
```

Finally you publish your library to NPM by publishing the contents of the `dist` directory:

```bash
$ npm publish dist
```

## TypeScript config

The generator creates 2 TypeScript config files:

- `tsconfig.json` is used to configure your editor during development and is not used for building your library
- `src/tsconfig.es5.json` is used by the Angular compiler to build the files in the `dist` directory when you run `npm run build`

## Linting your code

Your library comes pre-configured with tslint and codelyzer support. To lint your code:

```bash
$ npm run lint
```

## Building your library

From the root of your library directory, run:

```bash
$ npm run build
```

This will generate a `dist` directory with:

- a `package.json` file specifically for distribution with Angular listed in the `peerDependencies`
- `sample-library.js`: a Flat ES Module (FESM) file that contains all your library code in a single file
- `sample-library.umd.js`: a Universal Module Definition (UMD) bundle file that contains all your library code in UMD format for use in Node.js, SystemJS or via a script tag (e.g. in Plunker, Fiddle, etc)
- `*.d.ts`: type definitions for you library
- `sample-library.metadata.json`: metadata for your library to support AOT compilation 

## Generating documentation for your library

From the root of your library directory, run:

```bash
$ npm run docs:build
```
This will generate a `docs` directory with all documentation of your library.

To serve your documentation, run:

```bash
$ npm run docs:serve
```

and navigate your browser to `http://localhost:8080`.

To automatically rebuild your documentation every time a file in the `src` directory changes, run:

```bash
$ npm run docs:watch
```
 
For more features, check out the [compodoc website](https://compodoc.github.io/website/).

## Publishing your library to NPM

To publish your library to NPM, first generate the `dist` directory:

```bash
$ npm run build
```

and then publish the contents of the `dist` directory to NPM:

```bash
$ npm publish dist
```

## Consuming your library

Once you have published your library to the NPM registry, you can import it in any Angular application by first installing it using NPM:

```bash
$ npm install sample-library # use the name you used to publish to npm
```

and then importing your library in your Angular `AppModule` (or whatever module you wish to import your library into):

```typescript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

// Import your library
import { SampleModule } from "sample-library";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    
    // Specify your library as an import
    SampleModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your shared library is imported, you can use its components, directives and pipes in your Angular application templates:

```xml
<!-- app.component.html -->
<h1>{{ title }}</h1>
<sample-component>
  This component is part of the shared library and will now work as expected.
</sample-component>
```

and if you need to access a service from your shared library, you can inject it using Dependency Injection:

```typescript
import { Component } from "@angular/core";

// Import the shared service
import { SampleService } from "sample-library";

@Component({
  template: "Injecting a service from the shared library"
})
export class HomeComponent {

  // Inject the service using Angular DI 
  constructor(private sampleService: SampleService){
  
  }

}
```

To learn more about Angular Dependency Injection, check out the [Official Angular Documentation](https://angular.io/docs/ts/latest/cookbook/dependency-injection.html).

## Preview your library during development

To preview your library code during development, start the ng-serve:

```bash
$ npm run start
```

Changes to your library code will be updated live in the browser window

## Consuming your library in a local application during development

To consume your library in a local application before you publish it to npm, you can follow the following steps:

1. Create your library:
  ```
  $ yo ngx-lib
  ```
  Let's assume you name your library `sample-library`.
  
2. Navigate to the `sample-library` directory:
  ```
  $ cd sample-library
  ```
  
3. Compile your library files:
  ```
  $ npm run build:lib
  ```
  
4. From the `sample-library` directory:
  ```
  $ npm pack ./dist
  ```
  
5. Create a new Angular app. Let's assume you use angular-cli:
  ```
  $ cd /your-projects-path
  $ ng new my-app
  ```
  
6. Navigate to the `my-app` directory:
  ```
  $ cd my-app
  ``` 
  
7. From the `my-app` directory:
  ```
  $ npm i ../path-to-your-tgz/sample-lib-1-0-0.tgz
  ```
  
8. Import `SampleModule` in your Angular application:

  ```typescript
  import { BrowserModule } from "@angular/platform-browser";
  import { NgModule } from "@angular/core";
  
  import { AppComponent } from "./app.component";
  
  // Import your library
  import { SampleModule } from "sample-library";
  
  @NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      
      // Specify your library as an import
      SampleModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
  ```

9. Once your shared library is imported, you can use its components, directives and pipes in your Angular application templates:

  ```xml
  <!-- app.component.html -->
  <h1>{{ title }}</h1>
  <sample-component>
    This component is part of the shared library and will now work as expected.
  </sample-component>
  ```
  
  and if you need to access a service from your shared library, you can inject it using Dependency Injection:
  
  ```typescript
  import { Component } from "@angular/core";
  
  // Import the shared service
  import { SampleService } from "sample-library";
  
  @Component({
    template: "Injecting a service from the shared library"
  })
  export class HomeComponent {
  
    // Inject the service using Angular DI 
    constructor(private sampleService: SampleService){
    
    }
  
  }
  ```
  
10. When you make a change to your library, recompile your library files again from your `sample-library` directory:
  ```
  $ npm run build:lib
  ```
 
## Frequently asked questions

#### How can I configure Karma?

Currently, the generator does not create a custom Karma configuration for running unit tests.

If your library requires a custom Karma setup, please check out [this tutorial on how to configure Karma for your library](https://github.com/raphael-volt/ng2-testable-lib) (Credits to [Raphael](https://github.com/raphael-volt)).

As soon as official recommendations are available on how to set up Karma for testing libraries, this generator will be updated accordingly.

#### How can I use .scss files?

Simply store your styles in a file with a filename extension of `scss` and reference it in your component's `styleUrls` property.

So if you have a `sample.component.scss`:

```scss
h1 {
  color: red;
}
```
 
then reference it in your component's `styleUrls` in `sample.component.ts` accordingly:

```typescript
@Component({
  selector: "sample-component",
  template: `<h1>Sample component</h1>`,
  styleUrls: [
    "sample.component.scss"
  ]
})
```

The .scss files will automatically be compiled and inlined in your library bundle.

#### How can I import .scss files

To import a .scss file in an existing .scss file, you can specify a relative path:

```
@import '../relative/path/to/other.scss';
```

or use a tilde to import a file from the nearest parent `node_modules` directory:

```
@import '~@angular/material/prebuilt-themes/deeppurple-amber.css';
```

#### How can I see which version of the generator I have installed

From the command line, run:

```
$ npm ls -g --depth=1 2>/dev/null | grep generator-
```

#### How can I update my generator to the latest version?

From the command line, run

```bash
$ yo
```
and select the option *Update your generators*.

#### What if my library depends on a third party library?

If your library depends on a third party library such as Angular Material or PrimeNG, you don't have to include the third party library in your library.

Instead, you should add the third party library as a peer dependency to the `peerDependencies` property in `src/package.json` of your library:

```javascript
"peerDependencies": {
  "@angular/core": "^4.0.0",
  "rxjs": "^5.1.0",
  "zone.js": "^0.8.4"
}
```

This causes a warning to be displayed when the consuming application runs `npm install` and does not have the third party library installed that your library depends on.

The generator already adds `@angular/core`, `rxjs` and `zone.js` as peer dependencies for you by default.

Consider the following scenario where your library depends on a third party library called "PrimeNG".

In your Angular library:

1. run `npm install primeng --save` to install PrimeNG and add it as a devDependency to `package.json` in the root directory
2. add PrimeNG as a peerDependency in `src/package.json`, *NOT* as dependency or devDependency (`src/package.json` is the package.json that is distributed with your library, so you must specify primeng as peer dependency here, *NOT* in the package.json file in the root of your library)
3. import the necessary PrimeNG Angular module(s) in your library Angular module
4. write code that uses PrimeNG components
5. build your library and publish it (or link it locally)

In the consuming Angular application

1. run `npm install yourlibrary` to install your library (which should display a warning if PrimeNG is not installed) or link it locally
2. run `npm install primeng` to install PrimeNG if it is not installed yet
3. import the necessary PrimeNG Angular module(s) in your Angular application module (usually `AppModule`) (this step is not needed if your library exports the PrimeNG module(s) in its module metadata)
4. import your library module in your Angular application module (usually `AppModule`)
5. you can now use your library components

To see a fully documented example, check out [this guide](./guides/import_non_angular_libraries.md).

## Issues

Please report bugs and issues [here](https://github.com/tonysamperi/generator-ngx-lib/issues).

## Development

To run the generator unit tests:

```bash
$ npm run test
```

## License

MIT © [Tony Samperi](http://tonysamperi.github.io)

## Change log

### v1.0.0
- Release!!

### v1.0.1
- Info updated!

### v1.0.2
- Added .gitignore to generated sources

### v1.0.3
- Fixed missing scope from test app.module

### v1.0.4
- Fixed wrong tpl copy (ng-package.json)

### v1.0.5
- Removed useless deps from packages

### v1.0.6
- Fixed Karma config

### v1.0.7
- Added support for Angular v8

[generator-ngx-lib-banner]: https://user-images.githubusercontent.com/5957244/50083676-ce854800-01f4-11e9-8646-bbae4895c081.png
[generator-cmd-demo]: https://user-images.githubusercontent.com/5957244/50083474-36875e80-01f4-11e9-89fc-b5bdfb7fba71.gif
[npm-image]: https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=1.0.6&x2=0
[npm-url]: https://npmjs.org/package/generator-ngx-lib
[travis-image]: https://api.travis-ci.org/tonysamperi/generator-ngx-lib.svg?branch=master
[travis-url]: https://travis-ci.org/tonysamperi/generator-ngx-lib
[daviddm-image]: https://david-dm.org/tonysamperi/generator-ngx-lib.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/tonysamperi/generator-ngx-lib
[coveralls-image]: https://coveralls.io/repos/tonysamperi/generator-ngx-lib/badge.svg
[coveralls-url]: https://coveralls.io/github/tonysamperi/generator-ngx-lib
