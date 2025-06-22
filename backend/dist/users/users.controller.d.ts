import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    searchUsers(query: string, req: any): Promise<any>;
}
