import { User } from './User.component';
import { Repos } from './Repos.component';
import { SeliseSchoolServices } from './SeliseSchool.services';
let user = 'saif-lesnar';
let val = new SeliseSchoolServices();
val.getUserInfo(user,(user: User) => {
    console.log('Name: '+user.fullName);
    console.log('Number of Repo: '+user.repoCount);
    console.log('User Name: '+user.login);
    // console.log('User Email: '+user.email);
});
val.getRepoInfo(user,(repo: Repos[]) => {
    let j =0;
    for(let i in repo){
        j++;
        console.log('Repo '+j+' '+repo[i].name);
    }
});