import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostComment } from './comment.entity';

@Entity()
export class Response {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    response: string;

    @ManyToOne(() => PostComment, (comment) => comment.responses)
    @JoinColumn({ name: 'comment_id' })
    comment: PostComment;
}
