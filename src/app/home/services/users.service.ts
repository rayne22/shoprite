import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { NzMessageService } from "ng-zorro-antd";
import { HttpClient } from "@angular/common/http";
import { AngularFireStorage } from "@angular/fire/storage";
import { filter, first, map, finalize } from "rxjs/operators";
import { UserModel } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private usersCollection: AngularFirestoreCollection<UserModel>;
  users: Observable<UserModel[]>;

  constructor(
    private firebase: AngularFirestore,
    private msg: NzMessageService,
    private http: HttpClient,
    private storage: AngularFireStorage
  ) {
    this.usersCollection = firebase.collection<UserModel>("users");
    this.users = this.usersCollection.valueChanges();
  }

  getUsers() {
    return this.users;
  }

  addUser(user: UserModel) {
    this.users.pipe(first()).subscribe((users) => {
      // user.userNumber = this.generateOrderNumber(users.length);
      this.usersCollection
        .doc(user.id)
        .set(user)
        .then((res) => {
          this.msg.success("Added Successfully");
        })
        .catch((err) => {
          this.msg.warning("failed");
        });
    });
  }

  updateUser(user: UserModel) {
    this.usersCollection
      .doc(user.id)
      .update(user)
      .then((res) => {
        this.msg.success("Updated Successfully");
      })
      .catch((err) => {
        this.msg.warning("failed");
      });
  }

  countGenerator(numb) {
    if (numb <= 9999) {
      numb = ("0000" + numb).slice(-5);
    }
    return numb;
  }

  // Generating Category Number
  generateUserNumber(totalUsers: number) {
    const count = this.countGenerator(totalUsers);
    const today = new Date();
    const dateString: string =
      today.getFullYear().toString().substr(-2) +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      +("0" + today.getDate()).slice(-2);

    return "USR" + dateString + count;
  }
}
