import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserActivity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.userActivities)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'varchar' })
    description: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
