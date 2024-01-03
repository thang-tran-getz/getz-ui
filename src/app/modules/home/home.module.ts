import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from '@home/home-routing.module';
import { HomeComponent } from '@home/pages/home/home.component';
import { CategoryComponent } from '@home/components/category/category.component';
import { ProductCardComponent } from '@home/components/product-card/product-card.component';
import { CategoryCardComponent } from '@home/components/category-card/category-card.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MyCartModule } from '@common/my-cart/my-cart.module';
import { CarouselModule } from 'primeng/carousel';
import { SlideComponent } from './components/slide/slide.component';
import { NgxsModule } from '@ngxs/store';
import { ProductState } from '@app/store/states/product.state';

@NgModule({
  declarations: [
    HomeComponent,
    CategoryComponent,
    ProductCardComponent,
    CategoryCardComponent,
    SlideComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CarouselModule,
    // Form
    FormsModule,
    DropdownModule,
    InputTextModule,
    MyCartModule,
    NgxsModule.forFeature([ProductState]),
  ],
})
export class HomeModule {}
