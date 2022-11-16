import UploadCarImageUseCase from '@modules/cars/use-cases/upload-car-image/upload-car-image.use-case';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

interface IFiles {
  filename: string;
}

export class UploadCarImageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const images = req.files as IFiles[];
    const imageNames = images.map(file => file.filename);

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    await uploadCarImageUseCase.execute({ carId: id, imageNames });

    return res.status(200).send();
  }
}

export default UploadCarImageController;
