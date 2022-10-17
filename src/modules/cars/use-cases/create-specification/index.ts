import SpecificationsRepository from '../../repositories/implementations/specifications.repository';
import CreateSpecificationController from './create-specification.controller';
import CreateSpecificationUseCase from './create-specification.use-case';

export const specificationsRepository = SpecificationsRepository.getInstance();
export const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRepository,
);
export const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase,
);
