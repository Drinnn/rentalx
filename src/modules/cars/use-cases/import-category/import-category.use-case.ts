import fs from 'fs';
import { parse as parseCsv } from 'csv-parse';
import { inject, injectable } from 'tsyringe';
import ICategoriesRepository from '../../repositories/categories-repository.interface';

interface IImportCategory {
  name: string;
  description: string;
}
@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  private parseCategories(
    file: Express.Multer.File,
  ): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const parsedCategories = [];
      const stream = fs.createReadStream(file.path);
      const parseFile = parseCsv();
      stream.pipe(parseFile);

      parseFile
        .on('data', async line => {
          const [name, description] = line;
          parsedCategories.push({ name, description });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(parsedCategories);
        })
        .on('error', err => {
          fs.promises.unlink(file.path);
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.parseCategories(file);

    categories.map(async category => {
      const { name, description } = category;

      const alreadyExistingCategory =
        await this.categoriesRepository.findByName(name);

      if (!alreadyExistingCategory) {
        await this.categoriesRepository.create({ name, description });
      }
    });
  }
}

export default ImportCategoryUseCase;
