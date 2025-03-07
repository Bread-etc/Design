/* 用户名 - 密码 */
export interface LoginParams {
	username: string;
	password: string;
	token: string; // api_token
}

/* 用户登录返回结果 */
export interface LoginResult {
	accessToken: string; // token
	expiresIn: number; // token 过期时间
	role: string; // 角色
}

/* 用户登录状态 */
export interface UserState {
	accessToken: string | null;
	username: string;
	isAuthenticated: boolean;
	expiresIn: number | null;
	role: string | null;
}
