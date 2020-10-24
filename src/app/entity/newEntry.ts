export class NewEntry{
    login: string;
    sum: number;
    category: string;
    comment: string;

    constructor(login: string, sum: number, category: string, comment: string) {
        this.login = login;
        this.sum = sum;
        this.category = category;
        this.comment = comment;
    }
}