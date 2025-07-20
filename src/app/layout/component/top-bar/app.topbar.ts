import { Component, HostListener } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from '../app.configurator';
import { LayoutService } from '../../service/layout.service';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator,ButtonModule,ToggleButtonModule],
    templateUrl:'topbar.html'
})
export class AppTopbar {
    items!: MenuItem[];
    userData:any;
      dropdownOpen = false;
    constructor(public layoutService: LayoutService,public router:Router) {}

     toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

      @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.layout-topbar-actions')) {
      this.dropdownOpen = false;
    }
  }

      getAuthorFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.name || payload.email || null;
    } catch {
      return null;
    }
  }

  logout() {
    console.log("workinggg")
  // ✅ Clear stored user info (token, username, etc.)
  localStorage.removeItem('token');

  // ✅ Optional: Clear entire local storage
  localStorage.clear();

  // ✅ Redirect to login page
  this.router.navigate(['/auth/login']);
}
}
