import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserIn4Service {

  
  userInfo: BehaviorSubject<User | null> ;
  constructor(private auth:Auth) {
    this.userInfo = new BehaviorSubject<User | null>({
      id: 'id-001',
      name: 'Mập đẹp trai',
      email: 'map@gmail.com',
      imgUrl:
        'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    } as User);
    onAuthStateChanged(this.auth,(user)=>{
      if(user){
        console.log(user);
        this.userInfo.next({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          imgUrl: user.photoURL
        } as User)
      } else{
        this.userInfo.next(null);
      }
    },
    (error)=>{
      console.log(error);
    })
   }
   
   async logout() {
    await signOut(this.auth);
  }
}
