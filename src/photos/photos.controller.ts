import { Body, Controller, Get } from '@nestjs/common';
import { PhotosService } from './photos.service';
// import { PhotoDTO } from './dto/photo.dto';

@Controller('photos')
export class PhotosController {
  constructor(private photoService: PhotosService) {}

  @Get('/')
  public getAllUser() {
    return 'test';
  }

  // @Post('/update')
  // showData(@Body() photoDTO: PhotoDTO) {
  //   photoDTO.name = `http://${photoDTO.name}`;
  //   return photoDTO;
  // }
}
