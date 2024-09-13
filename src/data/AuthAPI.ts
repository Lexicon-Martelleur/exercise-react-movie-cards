import * as Model from "../model";
import { APIError } from "./APIError";
import { IAuthAPI } from "./IAuthAPI";

export class AuthAPI implements IAuthAPI {
    constructor (private readonly API: string) {}

    private readonly defaultHeader = {
        "Content-Type": "application/json",
    };

    async login (
        user: Model.IUserAuth,
        signal?: AbortSignal
    ): Promise<Model.ITokenContainer> {

        const url = `${this.API}/authenticate/login`;
        console.log('user', user);
        const res = await fetch(url, {
            method: "POST",
            headers: this.defaultHeader,
            signal,
            body: JSON.stringify(user)
        });

        if(!res.ok) { throw new APIError(res.statusText); }
        const resJSON: unknown = await res.json();
        console.log('resJSON', resJSON);
        if (!Model.isTokenContainer(resJSON)) {
            throw new APIError("Invalid response type");
        }
        return resJSON;
    }

    async refreshTokens(
        tokens: Model.ITokenContainer,
        signal?: AbortSignal
    ): Promise<Model.ITokenContainer> {
        const url: string = `${this.API}/token/refresh`;
      
        const res: Response = await fetch(url, {
          method: "POST",
          headers: this.defaultHeader,
          signal,
          body: JSON.stringify(tokens),
        });
      
        if (!res.ok) { throw new APIError(res.statusText); }

        const resJSON: unknown = await res.json();
        if (!Model.isTokenContainer(resJSON)) {
            throw new APIError("Invalid response type");
        }
        return resJSON;
    }
}