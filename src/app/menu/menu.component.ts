import { Component, Inject, OnInit } from '@angular/core';
import { flyInOut } from '../animations/animation';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut()
    ]
})
export class MenuComponent implements OnInit {

  dishes!: Dish[];
  errMess!: string;

  constructor(private dishService : DishService) { }

  ngOnInit(): void {
   this.getMyStuff();
  }

  getMyStuff(){
    this.dishService.getDishes()
    .subscribe((dishes) => this.dishes = dishes,
    errmess => this.errMess = <any>errmess);
  }

}
