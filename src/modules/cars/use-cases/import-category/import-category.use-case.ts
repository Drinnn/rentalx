import fs from 'fs';
import { parse as parseCsv } from 'csv-parse';
import ICategoriesRepository from '../../repositories/categories-repository.interface';

interface IImportCategory {
  name: string;
  description: string;
}
export class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

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
          resolve(parsedCategories);
        })
        .on('error', err => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.parseCategories(file);
    categories.forEach(category => {
      const { name, description } = category;

      const alreadyExistingCategory =
        this.categoriesRepository.findByName(name);
      if (alreadyExistingCategory) {
        throw new Error('Category already exists.');
      }

      this.categoriesRepository.create({ name, description });
    });
  }
}

export default ImportCategoryUseCase;
