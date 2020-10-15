import Orphanate from '../models/Orphanates';
import imagesView from './Images_view';

export default {
    render(orphanate: Orphanate) {

        return {
            id: orphanate.id,
            name: orphanate.name,
            latitude: orphanate.latitude,
            longitude: orphanate.longitude,
            about: orphanate.about,
            instructions: orphanate.instructions,
            opening_hours: orphanate.opening_hours,
            open_on_weekends: orphanate.open_on_weekends,
            images: imagesView.renderMany(orphanate.images),
        };
    },

    renderMany(orphanates: Orphanate[]) {
        return orphanates.map(orphanage => this.render(orphanage));
    }
};