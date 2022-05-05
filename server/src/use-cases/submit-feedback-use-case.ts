import { MailAdapter } from "../adapters.ts/mail-adapter";
import { FeedbackRepository } from "../repositories/feedbacks-repositorys";

export interface SubmitFeedbackUseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {

    constructor(
        private feedbacksRepository: FeedbackRepository,
        private mailAdapter: MailAdapter
    ){}

    async execute(request: SubmitFeedbackUseRequest) {
        const { type, comment, screenshot } = request

        if(!type) {
            throw new Error('type is required.')
        }

        if(!comment) {
            throw new Error('type is required.')
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.')
        }
        
        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`
            ].join('\n')
        })
    }
}