import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { Location } from '@angular/common';

@Component({
  selector: 'app-leaderdetail',
  templateUrl: './leaderdetail.component.html',
  styleUrls: ['./leaderdetail.component.scss']
})
export class LeaderdetailComponent implements OnInit {

  leader! : Leader;

  constructor(private leaderService: LeaderService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.leaderService.getLeader(id)
    .subscribe((leader) => this.leader = leader);
  }

  goBack(): void {
    this.location.back();
  }

}
