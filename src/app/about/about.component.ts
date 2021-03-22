import { Component, OnInit } from '@angular/core';
import { expand, flyInOut } from '../animations/animation';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders! : Leader[];
  errMess! : string;

  constructor(private leaderService: LeaderService) { }

  ngOnInit(): void {
    this.leaderService.getLeaders()
    .subscribe((leaders) => this.leaders = leaders,
    errmess => this.errMess = <any>errmess);
  }

}
