"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const common_1 = require("@nestjs/common");
const ai_service_1 = require("./ai.service");
const passport_1 = require("@nestjs/passport");
const prisma_service_1 = require("src/prisma/prisma.service");
class GrammarDto {
    text;
}
let AiController = class AiController {
    aiService;
    prisma;
    constructor(aiService, prisma) {
        this.aiService = aiService;
        this.prisma = prisma;
    }
    correctGrammar(grammarDto) {
        return this.aiService.grammarCorrect(grammarDto.text);
    }
    async getQuickReplies(conversationId) {
        const messages = await this.prisma.message.findMany({
            where: { conversationId },
            orderBy: { createdAt: 'desc' },
            take: 10,
        });
        const context = messages.map(m => ({ role: 'user', content: m.content })).reverse();
        return this.aiService.suggestQuickReplies(context);
    }
    async getSummary(conversationId) {
        const messages = await this.prisma.message.findMany({
            where: { conversationId },
            orderBy: { createdAt: 'asc' },
        });
        const content = messages.map(m => ({ content: m.content }));
        return this.aiService.summarizeConversation(content);
    }
};
exports.AiController = AiController;
__decorate([
    (0, common_1.Post)('grammar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GrammarDto]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "correctGrammar", null);
__decorate([
    (0, common_1.Get)('replies/:conversationId'),
    __param(0, (0, common_1.Param)('conversationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "getQuickReplies", null);
__decorate([
    (0, common_1.Get)('summary/:conversationId'),
    __param(0, (0, common_1.Param)('conversationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "getSummary", null);
exports.AiController = AiController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('ai'),
    __metadata("design:paramtypes", [ai_service_1.AiService, typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], AiController);
//# sourceMappingURL=ai.controller.js.map