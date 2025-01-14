import { ErrorCode } from '../../common/enums/error-code.enum';
import { VerificationEnum } from '../../common/enums/verification-code-enum';
import { RegisterDto } from '../../common/interface/auth-interface';
import { BadRequestException } from '../../common/utils/catch-errors';
import { fortyFiveMinutesFromNow } from '../../common/utils/date-time';
import { UserModel } from '../../database/models/user-model';
import { VerificationCodeModel } from '../../database/models/verification-model';

export class AuthService {
  public async register(registerData: RegisterDto) {
    const { name, email, password, confirmPassword, userAgent } = registerData;

    const existingUser = await UserModel.exists({ email });

    if (existingUser) {
      throw new BadRequestException('Email is already taken', ErrorCode.AUTH_EMAIL_ALREADY_EXISTS);
    }

    const newUser = await UserModel.create({
      name,
      email,
      password,
    });

    const userId = newUser._id;
    // await this.sendVerificationCode(userId, VerificationEnum.EMAIL, email);
    // await this.sendVerificationCode(userId, VerificationEnum.PHONE, phone);

    const verificationCode = await VerificationCodeModel.create({
      userId,
      type: VerificationEnum.EMAIL_VERIFICATION,
      expiresAt: fortyFiveMinutesFromNow(),
    });

    console.log(verificationCode);

    // Sending email verification link

    return {
      user: newUser,
      // verificationCode,
    };
  }
}
