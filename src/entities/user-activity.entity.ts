import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserActivity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', name: 'user_id' })
    userId: string;

    @Column({ type: 'varchar' })
    description: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
