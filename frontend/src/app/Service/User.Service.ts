import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Users } from "../model/users.model";

@Injectable({
    providedIn:"root"
})
export class UserService{ 

baseUrl:string="http://localhost:8081/users";

constructor(private httpClient:HttpClient){}

getAllUsers()
{ 
    return this.httpClient.get<Users[]>(this.baseUrl);
}

createUser(user:Users)
{ 
    return this.httpClient.post<Users>(this.baseUrl,user);
}

deleteUserById(userId:number)
  { 
    return this.httpClient.delete<Users>(`${this.baseUrl}/${userId}`);
  }

}