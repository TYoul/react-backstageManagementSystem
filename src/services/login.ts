import request from './request';

export const getToken = ({ username, password }: any) => {
  return request({
    url: '/login',
    method: 'POST',
    data: { username, password },
  });
};
