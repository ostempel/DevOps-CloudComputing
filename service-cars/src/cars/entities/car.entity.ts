import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'cars', name: 'car' })
export class Car {
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column({ name: 'brand', type: 'varchar', nullable: false })
  brand!: string;

  @ApiProperty()
  @Column({ name: 'model', type: 'varchar', nullable: false })
  model!: string;

  @ApiProperty()
  @Column({ name: 'manufacture_year', type: 'timestamp', nullable: false })
  manufactureYear!: Date;

  @ApiProperty()
  @Column({ name: 'ps', type: 'int', nullable: false })
  ps!: number;

  @ApiProperty()
  @Column({ name: 'top_speed', type: 'int', nullable: false })
  topSpeed!: number;

  @ApiProperty()
  @Column({
    name: 'created_at',
    type: 'timestamp'
  })
  createdAt!: Date;

  @ApiProperty()
  @Column({ name: 'modified_at', type: 'timestamp', nullable: false })
  modifiedAt: Date;
}
