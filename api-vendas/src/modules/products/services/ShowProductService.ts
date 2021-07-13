import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
    id: string;
}

class ShowProductService {
    public async execute({ id }: IRequest): Promise<Product> {
        //Carregar o repositório
        const productsRepository = getCustomRepository(ProductRepository);

        //Carregar um produto específico que esta no bd através do repositório
        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError('Product not found.');
        }
        //retornar o produto
        return product;
    }
}

export default ShowProductService;
