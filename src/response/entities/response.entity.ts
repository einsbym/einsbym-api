import { Comment } from 'src/comment/entities/comment.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Response {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    response: string;

    @ManyToOne(() => Comment, (comment) => comment.responses)
    @JoinColumn({ name: 'comment_id' })
    comment: Comment;
}
