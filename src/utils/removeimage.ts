import { remove } from 'aws-amplify/storage';


interface images{
    images: any;
}


const removeimages = async ({images}:images) => {
    for(const image of images)
    try {
        await remove({
            path: image
        });
    } catch (error) {
        console.log('Error ', error);
    }

}


export default removeimages;