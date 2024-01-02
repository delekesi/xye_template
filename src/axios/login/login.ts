import api from "@/axios/index"

interface loginType<T, E> {
    loginname: T;
    password: E;
}
interface Iobj<T, E, D> {
    code: T,
    data: E;
    msg: D
}
interface ObjectType {
    userid: number;
    loginname: string;
    loginHeadImg: string;
    token: number;
    menujson: Array<number>;
    openPath: string;
}
const login = async (parmas: loginType<string, string>): Promise<Iobj<number, ObjectType, string>> => {
    const config = {
        method: 'get',
        url: '/d04/admin/login',
        parmas: JSON.stringify(parmas),
        headers: {
            "Content-type": "application/json"
        }
    }
    const response = await api(config)
    return response.data
}
export default login