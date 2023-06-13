import { IsNotEmpty } from 'class-validator';

export class GalleryDto {

    @IsNotEmpty()
    readonly image: string;
}
