export class Character {
    public id: number;
    public name: string;
    public thumbnail: Thumbnail;
    public description: string;
}

export class Thumbnail {
    public path: string;
    public extension: string;
}
