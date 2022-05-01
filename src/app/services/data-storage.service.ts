import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { AuthService } from './auth.service';
import { Recipe } from '../model/recipe';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }
 
    storeRecipes() {
        const token = this.authService.getToken();

        return this.httpClient.put('https://ng-recipe-book-32960-default-rtdb.asia-southeast1.firebasedatabase.app/recipe.json', this.recipeService.getRecipes(), {
            params: new HttpParams().set('auth', token)
        });
    }

    getRecipes() {
        const token = this.authService.getToken();

        return this.httpClient.get<Recipe[]>('https://ng-recipe-book-32960-default-rtdb.asia-southeast1.firebasedatabase.app/recipe.json?auth=' + token).subscribe(
            (recipes) => {
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}