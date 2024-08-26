import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseAddressPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): string {
    const regex = new RegExp('^(0x)?[0-9a-fA-F]{40}$');

    if (!regex.test(value)) {
      throw new BadRequestException('Invalid address');
    }

    return value.toLocaleLowerCase();
  }
}
