export class HipRequest {
    public _id: string;
    public name: string;
    public state: string;
    public updatedAt: Date;

    constructor(id:string, name:string, state:string, updatedAt:Date) {
        this._id = id;
        this.name = name;
        this.state = state;
        this.updatedAt = updatedAt;
    }
}