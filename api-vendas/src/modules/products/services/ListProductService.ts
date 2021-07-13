import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class ListProductService {
    public async execute(): Promise<Product[]> {
        //Carregar o repositório
        const productsRepository = getCustomRepository(ProductRepository);

        //Carregar os produtos que estão no bd através do repositório
        const products = productsRepository.find();

        //Retornar os produtos
        return products;
    }
}

export default ListProductService;
