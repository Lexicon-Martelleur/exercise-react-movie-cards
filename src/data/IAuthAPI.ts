import * as Model from "../model";

export interface IAuthAPI {
    login: (
        user: Model.IUserAuth,
        signal?: AbortSignal
    ) => Promise<Model.ITokenContainer>;   
}
