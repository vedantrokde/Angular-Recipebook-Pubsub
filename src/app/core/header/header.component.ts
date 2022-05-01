import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { DataStorageService } from '../../services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private dataStorageService: DataStorageService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe((response: Response) => {
      console.log('Saved recipes successfully!');
    });
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.signoutUser();
    this.router.navigate(['/signin']);
  }
}
