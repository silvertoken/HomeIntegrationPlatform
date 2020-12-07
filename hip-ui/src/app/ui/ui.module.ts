import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MainComponent } from './layout/main/main.component';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [LayoutComponent, HeaderComponent, SidebarComponent, MainComponent],
  imports: [
    CommonModule,
    ClarityModule,
    RouterModule
  ],
  exports: [LayoutComponent]
})
export class UiModule { }
