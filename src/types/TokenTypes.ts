export default interface TokenTypes {
    grantType: string;
    "accessToken": string;
    refreshToken: string;
    accessTokenExpiresIn: number;
    userId: number;
}