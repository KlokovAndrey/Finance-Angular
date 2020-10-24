export class Entry{
    login: string;
    sum: number;
    category: string;
    date: Date;
    comment: string;

    constructor(login: string, sum: number, category: string, comment: string) {
        this.login = login;
        this.sum = sum;
        this.category = category;
        this.comment = comment;
    }

    
}