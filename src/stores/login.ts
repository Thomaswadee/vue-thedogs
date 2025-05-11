import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        visible: false,
        isLoggedIn: false, // 用户登录状态
    }),
    actions: {
        login() {
            this.isLoggedIn = true;
        },
        logout() {
            this.isLoggedIn = false;
        },
        setVisible(visible: boolean) {
            this.visible = visible;
        },
    },
});
export default useUserStore;