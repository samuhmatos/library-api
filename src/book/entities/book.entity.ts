import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Publisher } from 'src/publisher/entities/publisher.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { Author } from 'src/author/entities/author.entity';
import { Collection } from '../../collection/entities/collection.entity';

@Entity({ name: 'book' })
export class Book {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  resume: string;

  @Column()
  quantity: number;

  @Column()
  collection_id: number;

  @Column()
  author_id: number;

  @Column()
  publisher_id: number;

  @Column()
  genre_id: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date;

  @ManyToOne(() => Collection, (collection) => collection.books)
  @JoinColumn({ name: 'collection_id', referencedColumnName: 'id' })
  collection?: Collection;

  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: 'collection_id', referencedColumnName: 'id' })
  author?: Author;

  @ManyToOne(() => Publisher, (publisher) => publisher.books)
  @JoinColumn({ name: 'collection_id', referencedColumnName: 'id' })
  publisher?: Publisher;

  @ManyToOne(() => Genre, (genre) => genre.books)
  @JoinColumn({ name: 'collection_id', referencedColumnName: 'id' })
  genre?: Genre;
}
