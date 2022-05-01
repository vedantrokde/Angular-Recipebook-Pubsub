import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/model/ingredient';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  editMode = false;
  editItemIndex!: number;
  editItem!: Ingredient;
  @ViewChild('f') slForm!: NgForm;

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.slService.startEditing.subscribe(
      (index: number) => {
        this.editMode=true;
        this.editItemIndex=index;
        this.editItem=this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        })
      }
    );
  }

  onSubmit(form: NgForm) {
    if(this.editMode) {
      this.slService.updateIngredient(
        this.editItemIndex,
        new Ingredient(form.value.name, form.value.amount)
      );
    } else {
      this.slService.addIngredient(
        new Ingredient(form.value.name, form.value.amount)
      );  
    }
    this.onClear();
  }

  onClear() {
    this.editMode=false;
    this.slForm.reset();
  }

  onDelete() {
    this.slService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
