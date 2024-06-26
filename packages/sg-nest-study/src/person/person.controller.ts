import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  // josn
  @Post()
  json(@Body() createPersonDto: CreatePersonDto) {
    return `response: ${JSON.stringify(createPersonDto)}`;
  }

  // form data
  @Post('file')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
    }),
  )
  body2(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFile() files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return `receicved: ${JSON.stringify(createPersonDto)}`;
  }

  // query
  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number) {
    return `received: name=${name} age=${age}`;
  }

  // url params
  @Get(':id')
  urlParam(@Param('id') id: string) {
    // return this.personService.findOne(+id);
    return `received: id${id}`;
  }

  // form urlencoded
  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    // return this.personService.create(createPersonDto);
    return `received: ${JSON.stringify(createPersonDto)}}`;
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
