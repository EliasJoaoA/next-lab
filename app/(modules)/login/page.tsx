import { LoginService } from "./login.service";
export default function LoginPage (){

    const loginService = new LoginService();
    return (
        <h1>{loginService.username}</h1>
    )
}