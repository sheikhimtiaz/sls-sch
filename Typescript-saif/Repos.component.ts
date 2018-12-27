export class Repos{
    name : string;
    constructor(response: any){
        this.name = response.name;
    }
}