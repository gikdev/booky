import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: "varchar",
    length: 256,
    nullable: false,
  })
  title: string

  @Column({
    type: "varchar",
    length: 512,
    nullable: true,
  })
  description?: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
