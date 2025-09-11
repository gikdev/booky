import { Category } from "src/categories/category.entity"
import { User } from "src/users/user.entity"
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity()
export class Book {
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
    length: 256,
    nullable: false,
  })
  author: string

  @Column({
    type: "varchar",
    length: 512,
    nullable: true,
  })
  description?: string

  @Column({
    type: "char",
    length: 2,
    nullable: true,
    default: "fa",
  })
  language?: string

  @Column({
    type: "smallint",
    nullable: true,
  })
  pages?: number

  @Column({
    type: "char",
    length: 6,
    nullable: true,
  })
  color?: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  @ManyToMany(() => Category, c => c.books)
  @JoinTable()
  categories: Category[]

  @ManyToOne(() => User, u => u.books, { onDelete: "CASCADE" })
  owner: User
}
