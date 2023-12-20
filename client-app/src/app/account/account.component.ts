import { Component, OnInit } from '@angular/core';
import { JwtService } from '../services/jwt.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/libs/api/src/lib/authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {

  // get jwt token data from local storage
  token: any;
  email = '';

  accountForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private jwtService: JwtService, private authenticationService: AuthenticationService, private snackBar: MatSnackBar) {
    this.accountForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
      if (this.token) {
        console.log('token', this.token);
        const decodedToken = this.jwtService.decodeJwt(this.token);
        console.log('decodedToken', decodedToken);
        this.email = decodedToken.sub;
        this.accountForm.patchValue({ email: this.email });
      }
  }

  // TODO show confirmation that the account has been updated.
  onSubmit(): void {
    if (this.accountForm.valid) {
      const accountDetails = this.accountForm.value;
      this.authenticationService.update(accountDetails).subscribe((response) => {
        console.log('response', response);
        this.snackBar.open('Account updated successfully', 'Close', {
          panelClass: ['custom-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'end',
          duration: 3000,
        });
      });
    }
  }

}
