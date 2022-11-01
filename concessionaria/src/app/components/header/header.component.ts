import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth?: boolean;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public userService: UserService, private router: Router) {
    iconRegistry.addSvgIcon('account-circle-outline', sanitizer.bypassSecurityTrustResourceUrl('../../assets/account_circle_black_24dp.svg'));

  }

  ngOnInit(): void {
    
  }
  Logout(){
    this.userService.Logout();
    this.router.navigate(['carros-usados']);
  }
}
