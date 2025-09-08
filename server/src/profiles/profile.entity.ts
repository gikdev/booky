import { User } from "src/users/user.entity"
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: "varchar",
    length: 256,
    nullable: true,
  })
  bio?: string

  @Column({
    type: "date",
    nullable: true,
  })
  birthdate?: Date

  @Column({
    type: "varchar",
    length: 128,
    nullable: true,
  })
  location?: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  @OneToOne(() => User, user => user.profile)
  user: User
}
