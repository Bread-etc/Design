import { MockMethod } from 'vite-plugin-mock'

const mockAccessToken: MockMethod = {
  url: '/api/v1/accessToken',
  method: 'post',
  response: () => {
    return {
      accessToken: 'mock_access_token', // 返回一个模拟的access_token
      expiresIn: 7200,
    }
  },
}

export default [mockAccessToken]
