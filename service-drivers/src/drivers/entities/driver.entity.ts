import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'drivers', name: 'driver' })
export class Driver {
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column({ name: 'first_name', type: 'varchar', nullable: false })
  firstName!: string;

  @ApiProperty()
  @Column({ name: 'last_name', type: 'varchar', nullable: false })
  lastName!: string;

  @ApiProperty()
  @Column({ name: 'birth_date', type: 'timestamp', nullable: false })
  birthDate!: Date;

  @ApiProperty()
  @Column({ name: 'country', type: 'varchar', nullable: false })
  country!: string;

  @ApiProperty()
  @Column({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt!: Date;

  @ApiProperty()
  @Column({ name: 'modified_at', type: 'timestamp', nullable: false })
  modifiedAt!: Date;
}
