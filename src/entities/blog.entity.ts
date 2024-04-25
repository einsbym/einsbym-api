import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Blog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    description: string;

    @Column()
    filename: string;

    @Column({ type: 'json', nullable: false })
    body: string;

    @Column({ default: 0 })
    views: number;

    @Column({ type: 'json' })
    tags: string[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
