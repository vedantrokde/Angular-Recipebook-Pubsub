import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../model/ingredient';
import { Recipe } from '../model/recipe';
import { ShoppingListService } from './shopping-list.service';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipeChange = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is a simple test recipe.',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCSkn06xHEPZo3L-0CUCw1Rsmi560Dg73Swg&usqp=CAU',
      [
        new Ingredient('Meat', 2),
        new Ingredient('French Fries', 30),
        new Ingredient('Buns', 2),
      ]
    ),
    new Recipe(
      'A Dummy Recipe',
      'This is a dummy test recipe.',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXuJojVxFMGgitqOS_64kZDu7RHXpaeFurVA&usqp=CAU',
      [new Ingredient('Meat', 2), new Ingredient('Bread', 10)]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  setRecipes(response: any) {
    this.recipes = response;
    this.recipeChange.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addToList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChange.next(this.getRecipes());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChange.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChange.next(this.getRecipes());
  }
}
