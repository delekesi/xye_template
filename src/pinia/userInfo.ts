import {
    defineStore
} from 'pinia'
interface ObjectType {
    'loginUserId': number;
    'userName': string;
    'loginHeadImg': string;
    'token': number;
    'menujson': Array<number>;
    'openPath': string;
}
export const userInfo = defineStore('userInfo', {
    state: () => {
        const data: ObjectType = {
            'loginUserId': 1,
            'userName': '',
            'loginHeadImg': '',
            'token': 1,
            'menujson': [],
            'openPath': ''
        }
        return data
    },
    actions: {
        setUserInfo(data: object) {
            let _that = this
            const arr = Object.keys(data)
            for (const item of arr) {
                const key = item as keyof typeof data
                const value: number | string = data[key]
                _that[key] = value
            }
        },
        persist: {
            storage: localStorage,
            paths: []
        },
    }
})