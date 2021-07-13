import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
    id: string;
}

class DeleteProductService {
    public async execute({ id }: IRequest): Promise<void> {
        //Carregar o repositório
        const productsRepository = getCustomRepository(ProductRepository);

        //Carregar um produto específico que esta no bd através do repositório
        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError('Product not found.');
        }

        //Remove a entidade
        await productsRepository.remove(product);
    }
}

export default DeleteProductService;
