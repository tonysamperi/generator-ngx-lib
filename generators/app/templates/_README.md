# <%= props.libraryName.pascalCase %> 0.0.1

A cool Angular<%= props.angularVersion %> library!

# Before starting

##Styling

As you may know directives don't have a "Styles" property.
So it's impossible to let them style your markup,
**unless** you include an external CSS.

For this purpose the style of directives is compiled in

* /css/<%= props.libraryName.camelCase %>.css
* /scss/<%= props.libraryName.camelCase %>.scss

Be sure of including at least one of these in your styles.css / styles.scss
to get the basic style

## Installation

```bash
$ npm install sample@latest
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import what you need from ngx-mat-lib
import { SampleModule } from 'sample';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify the import
    SampleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```html
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<sample class="foo">MY CONTENT 1</any>
```

##Versioning

Sample will be maintained under the Semantic Versioning guidelines as much as possible. Releases will be numbered with the following format:

<major>.<minor>.<patch>

And constructed with the following guidelines:

Breaking backward compatibility bumps the major (and resets the minor and patch)
New additions, including new icons, without breaking backward compatibility bumps the minor (and resets the patch)
Bug fixes, changes to brand logos, and misc changes bumps the patch
For more information on SemVer, please visit http://semver.org.

## License

MIT © [John Doe](mailto:johndoe@gmail.com)

This library is free, open source, and GPL friendly. You can use it for
commercial projects, open source projects, or really almost whatever you want.

Attribution is required by MIT, SIL OLF, and CC BY licenses. Downloaded files already
contain embedded comments with sufficient
attribution, so you shouldn't need to do anything additional when using these
files normally.

# TODOS
* Add an awesome feature
