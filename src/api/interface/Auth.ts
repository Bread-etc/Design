/* 用户名 - 密码 */
export interface LoginInfo {
	username: string;
	password: string;
}

/* 用户登录状态 */
export interface UserState {
	token: string | null;
	username: string;
	isAuthenticated: boolean;
	expiresAt: number | null;
	role: string | null;
}

/* 用户登录返回结果 */
export interface LoginResult {
	accessToken: string; // token
	expiresIn: number; // token 过期时间
	role: string; // 用户角色
}
