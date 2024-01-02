import {
    defineStore
} from 'pinia'
interface ObjectList {
    userRole: string[];
}
export const usePermissStore = defineStore('usePermissStore', {
    state: () => {
        const data: ObjectList = {
            userRole: ['1001', '1002', '1003', '1004']
        }
        return data
    },
    actions: {
        setUserRole(val: string[]) {
            this.userRole = val
        }
    },
    persist: {
        storage: localStorage,
        paths: []
    },

})