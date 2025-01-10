import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Subject } from "rxjs";

import { Configuration } from "./config.modal";

@Injectable({
  providedIn: "root"
})
export class ConfigurationLoader {
  // private readonly CONFIGURATION_URL = "./assets/config/configuration.json";
  private _configuration!: Configuration;
    appConfig: any;

  constructor(private _http: HttpClient) {
    
  }
  loadAppConfig() {
      return new Promise<boolean>((resolve, reject) => {
        fetch('../assets/appConfig/config.json').then(res => res.json())
        .then(jsonData => {
          this.appConfig = jsonData;
          resolve(true);
        });
    })
  }

  apiBaseUrl() {
    return this.appConfig;
  }
}
