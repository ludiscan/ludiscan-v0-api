import { MigrationInterface, QueryRunner } from 'typeorm';

export class Setup011727751678909 implements MigrationInterface {
    name = 'Setup011727751678909';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "player_sessions" ("id" SERIAL NOT NULL, "deviceId" character varying, "platform" character varying, "appVersion" character varying, "metaData" jsonb, "startTime" TIMESTAMP NOT NULL DEFAULT now(), "endTime" TIMESTAMP, "projectId" integer NOT NULL, "userId" integer, CONSTRAINT "PK_3ef876b3c1f95a057a08256dfbf" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "screen_view_log" ("id" SERIAL NOT NULL, "screenName" character varying NOT NULL, "additionalData" jsonb, "viewedAt" TIMESTAMP NOT NULL DEFAULT now(), "projectId" integer NOT NULL, "sessionId" integer NOT NULL, CONSTRAINT "PK_190ffde35f3ed60916587f620b0" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "general_event_log" ("id" SERIAL NOT NULL, "eventType" character varying NOT NULL, "eventData" jsonb NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "projectId" integer NOT NULL, "sessionId" integer NOT NULL, CONSTRAINT "PK_9077f965c3f43f16a0bbc8421ef" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "player_position_logs" ("id" SERIAL NOT NULL, "x" double precision NOT NULL DEFAULT '0', "y" double precision NOT NULL DEFAULT '0', "z" double precision, "offsetTimestamp" bigint NOT NULL, "location" character varying NOT NULL, "projectId" integer NOT NULL, "sessionId" integer NOT NULL, CONSTRAINT "PK_ac3beb3df97457e8b7829cb8cde" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "player_sessions" ADD CONSTRAINT "FK_d2d8fd14c8a827591b02e606d4a" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "player_sessions" ADD CONSTRAINT "FK_00c5e2ac6df75c03779ea8ed6fc" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "screen_view_log" ADD CONSTRAINT "FK_988d8b051e09e270e4d81f525d4" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "screen_view_log" ADD CONSTRAINT "FK_b99ab0956be224d9432fdebb280" FOREIGN KEY ("sessionId") REFERENCES "player_sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "general_event_log" ADD CONSTRAINT "FK_86a91930bce521f1021672b6b1b" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "general_event_log" ADD CONSTRAINT "FK_3570e7239f4a2a47cd988599e6c" FOREIGN KEY ("sessionId") REFERENCES "player_sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "player_position_logs" ADD CONSTRAINT "FK_b91936150a33926a8715d5b4127" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "player_position_logs" ADD CONSTRAINT "FK_f761699b7894eb1f1e7986b7870" FOREIGN KEY ("sessionId") REFERENCES "player_sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "player_position_logs" DROP CONSTRAINT "FK_f761699b7894eb1f1e7986b7870"`,
        );
        await queryRunner.query(
            `ALTER TABLE "player_position_logs" DROP CONSTRAINT "FK_b91936150a33926a8715d5b4127"`,
        );
        await queryRunner.query(
            `ALTER TABLE "general_event_log" DROP CONSTRAINT "FK_3570e7239f4a2a47cd988599e6c"`,
        );
        await queryRunner.query(
            `ALTER TABLE "general_event_log" DROP CONSTRAINT "FK_86a91930bce521f1021672b6b1b"`,
        );
        await queryRunner.query(
            `ALTER TABLE "screen_view_log" DROP CONSTRAINT "FK_b99ab0956be224d9432fdebb280"`,
        );
        await queryRunner.query(
            `ALTER TABLE "screen_view_log" DROP CONSTRAINT "FK_988d8b051e09e270e4d81f525d4"`,
        );
        await queryRunner.query(
            `ALTER TABLE "player_sessions" DROP CONSTRAINT "FK_00c5e2ac6df75c03779ea8ed6fc"`,
        );
        await queryRunner.query(
            `ALTER TABLE "player_sessions" DROP CONSTRAINT "FK_d2d8fd14c8a827591b02e606d4a"`,
        );
        await queryRunner.query(`DROP TABLE "player_position_logs"`);
        await queryRunner.query(`DROP TABLE "general_event_log"`);
        await queryRunner.query(`DROP TABLE "screen_view_log"`);
        await queryRunner.query(`DROP TABLE "player_sessions"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
