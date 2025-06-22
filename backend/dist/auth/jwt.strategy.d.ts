import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    private configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    validate(payload: {
        sub: string;
        email: string;
    }): Promise<any>;
}
export {};
