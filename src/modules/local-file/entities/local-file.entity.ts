/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class LocalFile {
    @PrimaryGeneratedColumn()
    public id: string;

    @Column()
    filename: string;

    @Column()
    path: string;

    @Column()
    mimetype: string;
}

export default LocalFile;