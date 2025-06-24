
import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../Service/User.Service';
import { Users } from '../model/users.model';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  userList: Users[] = [];

  alertMessage = '';
  showAlert = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userId: [],
      name: [,Validators.required],
      email: [,[Validators.required,Validators.email]],
      password: [,[Validators.required,Validators.minLength(6)]]
    });

    this.loadUsers();
  }

  deleteUser(userId: number): void {
  this.userService.deleteUserById(userId).subscribe({
    next: () => {
      console.log('User deleted successfully');
      this.loadUsers(); // optional: refresh the list after deletion
    },
    error: (err) => {
      console.error('Error deleting user:', err);
    }
  });
}


  loadUsers() {
    this.userService.getAllUsers().subscribe(
      response => {
        this.userList = response;
      },
      error => {
        console.log("Unable to fetch", error);
      }
    );
  }

  triggerAlert(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.showAlert = false;
      this.cdr.detectChanges();
    }, 1200);
  }

  

  onSubmit() {
    if (this.loginForm.invalid) return;
  
    const userData = this.loginForm.value;
  
    // to check if email already exists 
    const emailExists = this.userList.some(user =>
      user.email === userData.email
    );
  
    if (emailExists) {
      this.triggerAlert('Email already registered. Please use a different email.');
      return;
    }
  
    // If email is unique, proceed to register
    this.userService.createUser(userData).subscribe(
      response => {
        console.log(response);
        this.loadUsers();
        this.loginForm.reset();
        this.triggerAlert('Registered Successfully!');
      },
      error => {
        console.log(error);
      }
    );
  }
  

  navigateToProducts() {
    let userFound = false;

    for (const user of this.userList) {
      if (
        this.loginForm.value['name'] === user['name'] &&
        this.loginForm.value['email'] === user['email'] &&
        this.loginForm.value['password'] === user['password']
      ) {
        this.triggerAlert('Logged in successfully!');
        userFound = true;

        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 800); 

        break;
      }
    }

    if (!userFound) {
      this.triggerAlert('Invalid credentials, please try again.');
    }
  }
}
