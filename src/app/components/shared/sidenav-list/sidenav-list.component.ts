import { AuthService } from './../../../services/auth.service';
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSideNav = new EventEmitter<void>();
  isAuth = false;

  authSubscription: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.auhtChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );
  }

  Onclose(): void {
    this.closeSideNav.emit();
  }

  logOut(): void {
    this.authService.logOut();
    this.Onclose();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
