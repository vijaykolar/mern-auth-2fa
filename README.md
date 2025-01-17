# MERN Authentication Project

## Working on 2FA using Node.js, TypeScript, MongoDB

In this project, we are implementing Two-Factor Authentication (2FA) to enhance security. The stack includes:

- **Node.js**: For server-side logic.
- **TypeScript**: For type safety and better development experience.
- **MongoDB**: For storing user data and 2FA tokens.

### Steps to Implement 2FA

1. **Setup Node.js and TypeScript**: Initialize a Node.js project and configure TypeScript.
2. **Install Dependencies**: Install necessary packages such as `express`, `mongoose`, `jsonwebtoken`, and `speakeasy`.
3. **Database Schema**: Define MongoDB schemas for users and 2FA tokens.
4. **User Registration and Login**: Implement user registration and login endpoints.
5. **2FA Setup**: Generate and store 2FA secrets using `speakeasy`.
6. **2FA Verification**: Verify 2FA tokens during login.
7. **Middleware**: Create middleware to protect routes with 2FA.

### Example Code Snippets

#### Installing Dependencies

```bash
npm install express mongoose jsonwebtoken speakeasy
npm install --save-dev typescript @types/express @types/mongoose @types/jsonwebtoken
```

#### Setting Up 2FA with Speakeasy

```typescript
import speakeasy from "speakeasy";

// Generate a 2FA secret
const secret = speakeasy.generateSecret({ length: 20 });

// Verify a token
const verified = speakeasy.totp.verify({
  secret: user.secret,
  encoding: "base32",
  token: userToken,
});
```

### Conclusion

Implementing 2FA adds an extra layer of security to your application, making it more resilient against unauthorized access.
