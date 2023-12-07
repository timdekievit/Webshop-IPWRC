import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/libs/api/src/lib/product/jwt.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  // get jwt token data from local storage
  token: any;
  email = '';

  constructor( private jwtService: JwtService) { }
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
      if (this.token) {
        console.log('token', this.token);
        const decodedToken = this.jwtService.decodeJwt(this.token);
        console.log('decodedToken', decodedToken);
        this.email = decodedToken.sub;
      }
  }

}
