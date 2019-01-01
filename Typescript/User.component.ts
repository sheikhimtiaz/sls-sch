export class User{
    login: string;
    fullName: string;
    repoCount: number;
    email: string;
    constructor(response: any){
        this.login = response.login;
        this.fullName = response.name;
        this.repoCount = response.public_repos;
        this.email = response.email;
        
    }
}