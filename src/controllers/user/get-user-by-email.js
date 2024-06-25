import { userNotFoundResponse, ok, serverError } from '../helpers/index.js'
import { authUserSchema } from '../../schemas/user.js'
import bcrypt from 'bcrypt'

export class GetUserByEmailController {
    constructor(getUserByEmailUseCase) {
        this.getUserByEmailUseCase = getUserByEmailUseCase
    }

    async execute(httpRequest) {
        try {
            const body = httpRequest.body

            await authUserSchema.parseAsync(body)

            const user = await this.getUserByEmailUseCase.execute(body.email)
            console.log(user)
            if (!user) {
                return userNotFoundResponse()
            }

            const matchPassword = await bcrypt.compare(
                body.password,
                user.password,
            )

            if (matchPassword) return ok(user)

            return userNotFoundResponse()
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
