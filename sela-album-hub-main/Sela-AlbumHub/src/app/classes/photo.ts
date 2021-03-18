import { v4 as uuid } from 'uuid';
export class Photo {

    public id: any;
    caption: string;
    categories: Array<any> = [];
    latitudeLocation;
    longitudeLocation;
    favorite: boolean;
    privateMode: boolean;
    path: string;

    constructor(caption, categories, latitudeLocation, longitudeLocation,  favorite, privateMode, path) {
        this.caption = caption;
        this.categories = categories;
        this.favorite = favorite;
        this.latitudeLocation = latitudeLocation;
        this.longitudeLocation = longitudeLocation;
        this.privateMode = privateMode;
        this.path = path;
        this.id = uuid();
    }
}
