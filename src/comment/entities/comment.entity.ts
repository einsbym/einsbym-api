import { Post } from 'src/post/entities/post.entity';
import { Response } from 'src/response/entities/response.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    comment: string;

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: 'post_id' })
    post: Post;

    @OneToMany(() => Response, (response) => response.comment)
    responses: Response[];
}
