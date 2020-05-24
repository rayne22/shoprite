import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ItemsComponent } from "./items.component";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule, BUCKET } from "@angular/fire/storage";

@NgModule({
  declarations: [ItemsComponent],
  imports: [CommonModule, AngularFireDatabaseModule, AngularFireStorageModule],
})
export class ItemsModule {}
