import {
  IsDate,
  IsIn,
  IsInt,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateInvoiceDto {
  @IsString()
  customerId!: string;

  @IsInt()
  amount!: number;

  @IsString()
  @IsIn(['pending', 'paid'])
  status!: 'pending' | 'paid';

  @IsDate()
  date!: Date;
}