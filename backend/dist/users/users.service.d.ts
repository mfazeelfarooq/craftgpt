import { PrismaService } from 'src/prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    searchUsers(query: string, currentUserId: string): Promise<any>;
}
