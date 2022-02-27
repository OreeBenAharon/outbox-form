import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public userId:string = "a82bdfd2-285b-4576-bbb6-6c7acbb95e60"
  public userStatus:number = 0
  public formData = new FormData()

    constructor(public _r:Router,
            ) { }
    
    
}
