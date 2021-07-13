import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {
    public async execute({
        id,
        name,
        price,
        quantity,
    }: IRequest): Promise<Product> {
        //Carregar o repositório
        const productsRepository = getCustomRepository(ProductRepository);

        //Carregar um produto específico que esta no bd através do repositório
        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError('Product not found.');
        }

        //Verifica se já existe um produto com o nome especificado
        const productExists = await productsRepository.findByName(name);

        if (productExists) {
            throw new AppError('There is already one product with this name');
        }

        //Atualizo os valores dos campos.
        product.name = name;
        product.price = price;
        product.quantity = quantity;

        //Salvo as atualizações.
        await productsRepository.save(product);

        //retornar o produto
        return product;
    }
}

export default UpdateProductService;
