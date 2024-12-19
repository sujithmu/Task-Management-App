import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Option } from "./option.model";
import { ThemeService } from "./theme.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
//   styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit  {
  options$: Observable<Array<Option>> = this.themeService.getThemeOptions();

  constructor(private readonly themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.setTheme("deeppurple-amber");
  }

  themeChangeHandler(themeToSet: any) {
    this.themeService.setTheme(themeToSet);
  }
}