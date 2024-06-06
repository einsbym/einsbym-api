import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserActivity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', nullable: true })
    user_id: string;

    @Column({ type: 'varchar', nullable: true })
    activity_type: string;
}
