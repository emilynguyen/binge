import { cookies } from 'next/headers';

async function getCookie(name) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name)?.value;
  return cookie;
}

async function setCookie(name, val) {
    const cookieStore = await cookies();
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    cookieStore.set(name, val, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      path: '/',
      expires,
    });
  }


  async function deleteCookie(name) {
    const cookieStore = await cookies();
    cookieStore.delete(name);
  }

  async function clearCookies() {
    const cookieStore = await cookies();

    cookieStore.getAll().forEach((cookie) => {
        cookieStore.delete(cookie.name);
    });
  }

export { getCookie, setCookie, deleteCookie, clearCookies };

