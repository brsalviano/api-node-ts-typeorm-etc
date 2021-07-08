import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('products')
class Product {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        //Só geramos o uuid se não estiver preenchido
        //pois se já estiver preenchido é porque provavelmente
        //estamos atualizando.
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export default Product;
