export class ArticlesRegister{
    title:string ="";
    subtitle:string ="";
    article:string="";
    id:string="";

    constructor(id:string, title:string, subtitle:string, article:string){
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.article = article;
    }
}