import Specification from '@modules/cars/infra/typeorm/entities/specification.entity';

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export default ISpecificationsRepository;
