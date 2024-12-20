/* 用户名 - 密码 */
export interface LoginInfo {
	username: string;
	password: string;
}

/* 用户登录状态 */
export interface UserState {
	token: string | null;
	username: string;
	isAuthenticated: boolean; // 用户是否登录
}

/* 用户登录返回结果 */
export interface LoginResult {
	accessToken: string; // token
	expires: number; // token 过期时间
}
