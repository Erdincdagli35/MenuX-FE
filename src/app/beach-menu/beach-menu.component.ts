import { Component } from '@angular/core';

import { BeachCategory } from '../model/beach-category';
import { BeachMenu } from '../model/beach-menu';
import { MenuService } from '../service/menu-service';

@Component({
  selector: 'app-beach-menu',
  templateUrl: './beach-menu.component.html',
  styleUrls: ['./beach-menu.component.css']
})
export class BeachMenuComponent {
  menuItems: BeachMenu[] = [];
    isLoading: boolean = true;
    hasError: boolean = false;
    categories = Object.values(BeachCategory);
    selectedCategory: BeachCategory | null = null;
    currentLang: string = 'TR'; 
  
    constructor(private menuService: MenuService) {}
  
    ngOnInit(): void {
      this.fetchMenu();
    }
  
    fetchMenu(): void {
      this.isLoading = true;
      this.menuService.getBeachMenuList(this.currentLang).subscribe({
        next: (data) => {
          this.menuItems = data;
          this.isLoading = false;
          this.hasError = false;
          this.selectedCategory = this.categories[0];
        },
        error: (err) => {
          console.error('Menü verisi çekilemedi', err);
          this.hasError = true;
          this.isLoading = false;
        }
      });
    }
  
    changeLanguage(lang: string): void {
      if (this.currentLang !== lang) {
        this.currentLang = lang;
        this.fetchMenu(); // ✅ API tekrar çağırılır
      }
    }
  
    getCategoryLabel(category: BeachCategory): string {
      if (this.currentLang === 'EN') {
        switch (category) {
          case BeachCategory.Beer: return 'Beer';
          case BeachCategory.Gin: return 'Gin';
          case BeachCategory.Cocktail: return 'Cocktail';
          case BeachCategory.Raki: return 'Raki';
          case BeachCategory.Wine: return 'Wine';
          case BeachCategory.Whiskey: return 'Whiskey'; 
          case BeachCategory.Votka: return 'Votka'; 
          case BeachCategory.Meal: return 'Meal';
          case BeachCategory.Snack: return 'Snack';
          case BeachCategory.Burger: return 'Burger';
          case BeachCategory.HotDrink: return 'Hot Drink';
          
        }
      } else {
        switch (category) {
          case BeachCategory.Beer: return 'Bira';
          case BeachCategory.Gin: return 'Cin';
          case BeachCategory.Cocktail: return 'Kokteyl';
          case BeachCategory.Raki: return 'Rakı';
          case BeachCategory.Wine: return 'Şarap';
          case BeachCategory.Whiskey: return 'Viski'; 
          case BeachCategory.Votka: return 'Votka'; 
          case BeachCategory.Meal: return 'Ana Yemek';
          case BeachCategory.Snack: return 'Aperatifler';
          case BeachCategory.Burger: return 'Burger';
          case BeachCategory.HotDrink: return 'Sıcak İçecek';
        }
      }
      return category;
    }
  
    getItemsByCategory(category: BeachCategory): BeachMenu[] {
      return this.menuItems.filter(item => item.category === category);
    }
  
    selectCategory(category: BeachCategory) {
      this.selectedCategory = category;
    }
}
