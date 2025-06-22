"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiModule = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const ai_service_1 = require("./ai.service");
const ai_controller_1 = require("./ai.controller");
const config_1 = require("@nestjs/config");
const redisStore = require("cache-manager-redis-store");
const prisma_module_1 = require("src/prisma/prisma.module");
let AiModule = class AiModule {
};
exports.AiModule = AiModule;
exports.AiModule = AiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            cache_manager_1.CacheModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    store: redisStore,
                    host: configService.get('REDIS_HOST', 'localhost'),
                    port: configService.get('REDIS_PORT', 6379),
                    ttl: 60 * 60,
                }),
            }),
        ],
        controllers: [ai_controller_1.AiController],
        providers: [ai_service_1.AiService],
    })
], AiModule);
//# sourceMappingURL=ai.module.js.map