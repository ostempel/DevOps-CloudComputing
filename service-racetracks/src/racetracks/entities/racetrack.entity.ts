import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'racetracks', name: 'racetrack' })
export class Racetrack {
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column({ name: 'name', type: 'varchar', nullable: false })
  name!: string;

  @ApiProperty()
  @Column({ name: 'country', type: 'varchar', nullable: false })
  country!: string;

  @ApiProperty()
  @Column({ name: 'length', type: 'varchar', nullable: false })
  length!: string;

  @ApiProperty()
  @Column({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt!: Date;

  @ApiProperty()
  @Column({ name: 'modified_at', type: 'timestamp', nullable: false })
  modifiedAt!: Date;
}
