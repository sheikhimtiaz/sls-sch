import * as request from 'request'
import {User} from './User.component';
import {Repos} from './Repos.component';
export class SeliseSchoolServices{
  getUserInfo(userName : string , callBack: (user: User) => any){
    let options: any = {
      headers: {
        'User-Agent': 'request'
      }
    }
    request.get('https://api.github.com/users/'+userName,options,(error:any, response:any, body:any) => {
      let userInfo  = new User(JSON.parse(body));
        callBack(userInfo);
    })
  }
  getRepoInfo(userName : string , callBack: (repo: Repos[]) => any){
    let options: any = {
      headers: {
        'User-Agent': 'request'
      },
      json: true
    }
    request.get('https://api.github.com/users/'+userName+'/repos',options,(error:any, response:any, body:any) => {
      let repoInfo =body.map(repo => new Repos(repo))
      callBack(repoInfo);
    })
   
  }
}