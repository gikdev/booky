import { Book } from "src/books/book.entity"
import { Category } from "src/categories/category.entity"
import { Profile } from "src/profiles/profile.entity"
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: "varchar",
    length: 128,
    nullable: false,
  })
  firstName: string

  @Column({
    type: "varchar",
    length: 128,
    nullable: true,
  })
  lastName?: string

  @Column({
    type: "varchar",
    length: 192,
    nullable: false,
    unique: true,
  })
  email: string

  @Column({
    type: "varchar",
    length: 128,
    nullable: false,
  })
  password: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  @OneToOne(() => Profile, profile => profile.user, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  profile?: Profile

  @OneToMany(() => Book, b => b.owner)
  books?: Book[]

  @OneToMany(() => Category, c => c.owner)
  categories?: Category[]
}
