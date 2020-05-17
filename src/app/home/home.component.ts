import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  backgroundImg: any;

  constructor(private sanitizer: DomSanitizer) {
    this.backgroundImg = sanitizer.bypassSecurityTrustStyle(
      "url(http://www.freephotos.se/images/photos_medium/white-flower-4.jpg)"
    );
  }

  ngOnInit(): void {}
}
