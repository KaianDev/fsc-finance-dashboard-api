export class GetUserByEmailUseCase {
    constructor(getUserByEmailRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository
    }
    async execute(email) {
        const user = await this.getUserByEmailRepository.execute(email)

        return user
    }
}
