import { Subject } from 'rxjs';
import { AuthData } from '../models/auth-data.model';
import { User } from '../models/user.model';

export class AuthService {
  auhtChange = new Subject<boolean>();
  private user: User;

  registerUser(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString(),
    };
    this.auhtChange.next(true);
  }

  login(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString(),
    };
    this.auhtChange.next(true);
  }

  logOut(): void {
    this.user = null;
  }

  getUser(): User {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
    this.auhtChange.next(false);
  }
}
