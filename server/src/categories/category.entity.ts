import { Book } from "src/books/book.entity"
import { User } from "src/users/user.entity"
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
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

  @ManyToMany(() => Book, b => b.categories, { onDelete: "CASCADE" })
  books: Book[]

  @ManyToOne(() => User, u => u.categories, { onDelete: "CASCADE" })
  owner: User
}
