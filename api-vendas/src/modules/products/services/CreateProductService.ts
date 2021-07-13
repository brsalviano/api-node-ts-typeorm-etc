import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

//Interface para representar os parâmetros recebidos no método do serviço.
interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

class CreateProductService {
    public async execute({
        name,
        price,
        quantity,
    }: IRequest): Promise<Product> {
        //Carregar o repositório
        const productsRepository = getCustomRepository(ProductRepository);

        //Verificar se o produto ja existe...
        const productExists = await productsRepository.findByName(name);

        if (productExists) {
            throw new AppError('There is already one product with this name');
        }

        //Criar uma entidade do produto
        const product = productsRepository.create({
            name,
            price,
            quantity,
        });

        //salvar o produto
        await productsRepository.save(product);

        //Retornar o produto criado
        return product;
    }
}

export default CreateProductService;
