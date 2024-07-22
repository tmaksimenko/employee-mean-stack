import {provideHttpClient, withFetch} from "@angular/common/http";
import {ApplicationConfig} from "@angular/core";
import {provideRouter} from "@angular/router";
import {routes} from "./routes";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withFetch()),
        provideAnimations()
    ]
};
