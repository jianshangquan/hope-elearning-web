export async function exchangeAccessToken(refreshToken?: string) {
  try {
    console.log("exchange access token".toUpperCase());
    if (!refreshToken) {
        return undefined;
    }
    const url = `https://securetoken.googleapis.com/v1/token?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`;
    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });

    const resp = await fetch(url, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const json = await resp.json();

    if (!resp.ok) {
      return undefined;
    }

    return {
      accessToken: json["id_token"] as string,
      refreshToken: json["refresh_token"] as string,
    };
  } catch (error) {}

  return undefined;
}
