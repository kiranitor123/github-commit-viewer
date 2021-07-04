import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { GithubService } from '../services/github.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user:string;
  profile:Observable<any>;
  repos:Observable<any>;

  limit:Observable<any>;
  
  constructor(private githubServ: GithubService) { 
    this.user = "";
    this.profile = of(null)
    this.repos = of(null);
    this.limit = of(null);
  }
  
  ngOnInit(): void {
  }

  buscar(){
    this.repos = of(null);
    this.limit = of(null);
    this.profile = this.githubServ.getGitHubUser(this.user);
  }

  getRepos(repos:string){
    this.repos = this.githubServ.getQueryGithub(repos);
  }

  limits(){
    const url = 'https://api.github.com/rate_limit'
    this.limit = this.githubServ.getQueryGithub(url);
  }

}
