import { hash } from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

export class seedAdminUser1667568657341 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const id = uuidV4();
    const password = await hash('admin', 8);

    await await queryRunner.query(
      `INSERT INTO users(id, name, email, password, driver_licence, admin) VALUES ('${id}', 'admin', 'admin@rentalx.com', '${password}', 'ADM-XXX', true)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM users WHERE users.email = 'admin@rentalx.com'`,
    );
  }
}
