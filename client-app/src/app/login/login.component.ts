import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/libs/api/src/lib/authentication/authentication.service';
import { JwtService } from '../services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router, private jwtService: JwtService) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const user = this.loginForm.value;

      this.authService.login(user).subscribe(
        (response) => {
          // The login was successful, and the token is stored in authService.token
          console.log('Login successful', response);

          this.jwtService.GetIsLoggedInObservable().subscribe((isLoggedIn: boolean) => { console.log('isLoggedIn: ', isLoggedIn); });
          this.authService.isAdmin().subscribe((isAdmin: boolean) => { console.log('isAdmin: ', isAdmin); });

          this.router.navigate(['/home']);

          // Redirect to another page or perform any other necessary action
        },
        (error) => {
          // Handle login error (e.g., display an error message)
          console.error('Login failed', error);
        }
      );
    }
  }
}
