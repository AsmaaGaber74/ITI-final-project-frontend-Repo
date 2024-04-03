import { Component, OnInit } from '@angular/core';
import { DealService } from '../../services/deal.service';
import { deal } from '../../models/deal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'] // Change styleUrl to styleUrls
})
export class MainComponent implements OnInit {
  startSlider: number = 0;
  startSlider1: number = 0;
  imgItem: any;
  endSlider: number = 0;
  endSlider1: number = 0;
  deals: deal[] = [];
  constructor(private _deal: DealService) {

  }
  ngOnInit(): void {
    this._deal.getDeals().subscribe(deals => {
      this.deals = deals;
      this.imgItem = document.querySelectorAll(".today_deals_product_item");
      this.endSlider = (this.imgItem.length - 1) * 100;
      this.endSlider1 = (this.imgItem.length - 1) * 100;
    });
  }
  handleLeftBtn(): void {
    if (this.startSlider < 0) {
      this.startSlider = this.startSlider + 100;
    }
    this.translateSlider();
  }

  handleRightBtn(): void {
    if (this.startSlider >= -this.endSlider + 100) {
      this.startSlider = this.startSlider - 100;
    }
    this.translateSlider();
  }

  handleLeftBtn1(): void {
    if (this.startSlider1 < 0) {
      this.startSlider1 = this.startSlider1 + 100;
    }
    this.translateSlider1();
  }

  handleRightBtn1(): void {
    if (this.startSlider1 >= -this.endSlider1 + 100) {
      this.startSlider1 = this.startSlider1 - 100;
    }
    this.translateSlider1();
  }

  translateSlider(): void {
    this.imgItem.forEach((element: any) => {
      element.style.transform = `translateX(${this.startSlider}%)`; // Fix string interpolation
    });
  }

  translateSlider1(): void {
    this.imgItem.forEach((element: any) => {
      element.style.transform = `translateX(${this.startSlider1}%)`; // Fix string interpolation
    });
  }

  openSidebarNavigation(): void {
    const sidebarNavigationEl = document.getElementById("sidebar-container-navigation-id");
    if (sidebarNavigationEl) {
      sidebarNavigationEl.classList.add("slidebar-show"); // Use add instead of toggle
    }
  }

  closeSidebarNavigation(): void {
    const sidebarNavigationEl = document.getElementById("sidebar-container-navigation-id");
    if (sidebarNavigationEl) {
      sidebarNavigationEl.classList.remove("slidebar-show"); // Use remove instead of toggle
    }
  }
}
