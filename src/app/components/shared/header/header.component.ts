import { AuthService } from './../../../services/auth.service';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sideNavToogle = new EventEmitter<void>();
  isAuth = false;
  authSubscrption: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.auhtChange.subscribe((autStatus) => {
      this.isAuth = autStatus;
    });
  }

  OntoggleSideNav(): void {
    this.sideNavToogle.emit();
  }

  ngOnDestroy(): void {
    this.authSubscrption.unsubscribe();
  }

  logOut(): void {
    this.authService.logOut();
  }
}
