/**
 * 현재 날짜와 시간을 `KST`로 변환 후 가져오는 함수
 * - https://ko.wikipedia.org/wiki/한국_표준시
 */
export const getKST = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const offset = 9 * 60 * 60 * 1000; // UTC와 9시간 차이
  const kst = new Date(utc + offset);

  const year = kst.getFullYear();
  const month = kst.getMonth() + 1;
  const day = kst.getDate();

  const hour = kst.getHours();
  const minute = kst.getMinutes();
  const second = kst.getSeconds();

  return { year, month, day, hour, minute, second };
};
