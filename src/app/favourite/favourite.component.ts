import { Component, OnInit, Inject } from '@angular/core';
import { flyInOut, expand } from '../animations/animation';
import { FavouriteService } from '../services/favourite.service';
import { Favourite } from '../shared/favourites';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class FavouriteComponent implements OnInit {

  favourites!: Favourite;
  delete!: boolean;
  errMess!: string;

  constructor(private favouriteService: FavouriteService) { }

  ngOnInit() {
    this.favouriteService.getFavourites()
      .subscribe(favourites => this.favourites = favourites,
        errmess => this.errMess = <any>errmess);
  }

  deleteFavourite(id: string) {
    console.log('Deleting Dish ' + id);
    this.favouriteService.deleteFavourite(id)
      .subscribe(favourites => this.favourites = <Favourite>favourites,
        errmess => this.errMess = <any>errmess);
    this.delete = false;
  }

}
