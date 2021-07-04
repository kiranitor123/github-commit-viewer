import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  baseUrl = 'https://api.github.com/users/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'xxxxxxxxxxxxxxxxxxxxxxxxxx'
    })
  }

  constructor(private http: HttpClient) { }

  getGitHubUser(user:string){
    return this.http.get(this.baseUrl+user,this.httpOptions).pipe(
      map((data:any) => {
        return {error:'', avatar:data.avatar_url, bio: data.bio, location: data.location, name: data.name, repo: data.repos_url};
      }),
      catchError(()=>{
        return of({error:'No hay usuario'})
      })
    );
  }

  getQueryGithub(url:string){
    return this.http.get(url,this.httpOptions).pipe(
      catchError(()=>{
        return of([])
      })
    );
  }
  
  getQueryasPromise(url:string){
    return this.http.get(url,this.httpOptions).pipe(
      map( (data:any)=> {
        return { author: data.commit, parents: data.parents}
      }),
      catchError(()=>{
        return of([])
      })
    ).toPromise<any>();
  }
}
