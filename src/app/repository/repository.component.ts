import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GithubService } from '../services/github.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
})
export class RepositoryComponent implements OnInit {
  @Input() repo: any;
  contributors: Observable<any>;
  branchs: Observable<any>;

  commits: BehaviorSubject<any> = new BehaviorSubject([]);
  actual: any[] = [];

  constructor(private githubServ: GithubService) {
    this.contributors = of(null);
    this.branchs = of(null);
  }

  ngOnInit(): void {
    this.contributors = this.githubServ.getQueryGithub(
      this.repo.contributors_url
    );
    this.branchs = this.githubServ.getQueryGithub(
      this.convertURL(this.repo.branches_url)
    );
  }

  convertURL(url: string) {
    let find = url.indexOf('{');

    return url.substring(0, find);
  }

  async getBranch(branch: any) {
    let initalcommit: any = await this.getCommit(branch.commit.url);

    this.actual = [];
    let urls: string[] = [];
    this.actual.push(initalcommit.author);
    this.commits.next(this.actual);

    await this.getAllCommits(initalcommit, urls);
    this.commits.pipe(
      map((data:any[])=> data.sort((a,b) => (new Date(a.author.date)).getTime() - (new Date(b.author.date)).getTime() ))
    )
  }

  async getAllCommits(inital: any, urls: string[]) {
    if (inital.parents.length > 0) {
      await inital.parents.forEach(async (data: any) => {
        let exist = urls.indexOf(data.url);
        if (exist == -1) {
          urls.push(data.url);
          let commit: any = await this.getCommit(data.url);
          this.actual.push(commit.author);
          this.commits.next(this.actual);
          await this.getAllCommits(commit, urls);
        }
      });
    }
  }

  async getCommit(url: string) {
    return await this.githubServ.getQueryasPromise(url);
  }
}
