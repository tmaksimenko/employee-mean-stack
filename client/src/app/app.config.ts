import {provideHttpClient, withFetch} from "@angular/common/http";
import {ApplicationConfig, importProvidersFrom} from "@angular/core";
import {provideRouter} from "@angular/router";
import {AppRoutingModule, routes} from "./app-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withFetch()),
        importProvidersFrom(BrowserModule, AppRoutingModule),
        provideAnimations()
    ]
};
