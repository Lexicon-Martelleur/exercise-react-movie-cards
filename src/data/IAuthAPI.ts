import * as Model from "../model";

export interface IAuthAPI {
    login: (
        user: Model.IUserAuth,
        signal?: AbortSignal
    ) => Promise<Model.ITokenContainer>;

    refreshTokens: (
        tokens: Model.ITokenContainer,
        signal?: AbortSignal
    ) => Promise<Model.ITokenContainer>
}
