import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    exp: number; // expiration timestamp in seconds
}

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {
         if (this.isLoggedIn()) {
            this.router.navigate(['/blog/blogs-list']);
        } 
    }

    canActivate(): boolean {
        if (this.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/auth/login']);
            return false;
        }
    }

    isLoggedIn(): boolean {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            const decoded = jwtDecode<JwtPayload>(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp > currentTime;
        } catch (err) {
            // Token is invalid or corrupted
            return false;
        }
    }
}
