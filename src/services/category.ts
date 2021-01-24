import request from './request';

export const getCategory = () => {
  return request({
    url: '/manage/category/list',
    method: 'GET',
  });
};
