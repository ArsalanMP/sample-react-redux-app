import { IUserData } from './interface';

// A mock function to mimic making an async request for data
export function login(userData: IUserData) {
  return new Promise<IUserData>((resolve, reject) =>
    setTimeout(() => {
      if (
        userData.username === 'arsalan' &&
        userData.password === 'test123'
      ) {
        resolve(userData);
      } else {
        reject(new Error('Invalid username or password'));
      }
    }, 1000)
  );
}
