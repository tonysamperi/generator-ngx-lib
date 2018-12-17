import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {<%= props.libraryName.pascalCase %>TestModule} from "./app/app.module";


platformBrowserDynamic().bootstrapModule(<%= props.libraryName.pascalCase %>TestModule);
