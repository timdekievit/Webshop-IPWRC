import { Component, OnInit } from '@angular/core';
import { JwtService } from '../services/jwt.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/libs/api/src/lib/authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/libs/entities/src/lib/user/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {

  accountForm: FormGroup;
  user$: Observable<User> = new Observable<User>();

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
    this.user$ = this.authenticationService.getCurrentUser();
    this.user$.subscribe((user) => {
      this.accountForm.patchValue({ email: user.email });
      this.accountForm.patchValue({ name: user.name });
      this.accountForm.patchValue({ address: user.address });
      this.accountForm.patchValue({ city: user.city });
      this.accountForm.patchValue({ zipCode: user.zipCode });
    });
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      const accountDetails = this.accountForm.value;
      this.authenticationService.update(accountDetails).subscribe((response) => {
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
