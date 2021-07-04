import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.scss']
})
export class ContributorsComponent implements OnInit {
  @Input() contributor: any;
  constructor() { }

  ngOnInit(): void {
  }

}
