import { RegisterDto } from '../../common/interface/auth-interface';
import { UserModel } from '../../database/models/user-model';

export class AuthService {
  public async register(registerData: RegisterDto) {
    const { name, email, password, confirmPassword, userAgent } = registerData;

    const existingUser = await UserModel.create({ name, email, password, userAgent });

    // Register logic
  }
}
