import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthenticationService } from 'src/libs/api/src/lib/authentication/authentication.service';
import { Role, User } from 'src/libs/entities/src/lib/user/user';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router) { }

    user$: Observable<User> = new Observable<User>();

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authService.getCurrentUser().pipe(
            map((user: User) => {
                console.log(user)
                if (user && user.role.toString() === "ADMIN") {
                    return true;
                } else {
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        );
    }
}