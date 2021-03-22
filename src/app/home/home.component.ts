import { Component, Inject, OnInit } from '@angular/core';
import { flyInOut } from '../animations/animation';
import { DishService } from '../services/dish.service';
import { LeaderService } from '../services/leader.service';
import { PromotionService } from '../services/promotion.service';
import { Dish } from '../shared/dish';
import { Leader } from '../shared/leader';
import { Promotion } from '../shared/promotion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut()
    ]
})
export class HomeComponent implements OnInit {

  errMess! : string;
  dish!: Dish;
  promotion!: Promotion;
  leader! : Leader;
  baseUrl = ('../shared/baseUrl');

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService: LeaderService) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
    .subscribe((dish) => this.dish = dish,
    errmess => this.errMess = <any>errmess);
    this.promotionservice.getFeaturedPromotion()
    .subscribe((promotion) => this.promotion = promotion,
    errmess => this.errMess = <any>errmess);
    this.leaderService.getFeaturedLeader()
    .subscribe((leader) => this.leader = leader,
    errmess => this.errMess = <any>errmess);
  }

}
