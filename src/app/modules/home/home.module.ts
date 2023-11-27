import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from 'primeng/inputtext';
import { MyCartModule } from '../common/my-cart/my-cart.module';

@NgModule({
  declarations: [
    HomeComponent,
    CategoryComponent,
    ProductCardComponent,
    CategoryCardComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,

    // Form
    FormsModule,
    DropdownModule,
    InputTextModule,
    MyCartModule
  ],
})
export class HomeModule { }
