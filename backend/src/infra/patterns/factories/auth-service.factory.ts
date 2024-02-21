import AuthService from '../../../domain/services/auth.service'

export const AuthServiceFactory = () => {
	return new AuthService()
}