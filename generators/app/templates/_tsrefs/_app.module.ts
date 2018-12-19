import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {<%= props.libraryName.pascalCase %>Module} from "<%= props.scope.original %><%= props.libraryName.kebabCase %>";
import {AppComponent} from "./app.component";

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        <%= props.scope.capitalized %><%= props.libraryName.pascalCase %>Module
    ],
    entryComponents: [AppComponent],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class <%= props.scope.capitalized %><%= props.libraryName.pascalCase %>TestModule {
}
