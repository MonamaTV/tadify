import {
  axiosAuthClient,
  axiosAccessTokenClient,
  axiosRefreshAccessTokenClient,
} from "../../src/utils/axios";

import * as cookie from "cookie";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const url = axiosAuthClient().getUri().toString();
    res.redirect(url);
  }

  if (req.method === "POST") {
    const code = req.body?.code;

    if (!code) {
      return res.status(401).send({
        message: "Failed to autheticate user",
        success: false,
        code: 401,
      });
    }

    const { data, status } = await axiosAccessTokenClient().post("/", {
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.REDIRECT_URI,
    });

    if (status !== 200) {
      return res.status(status).send({
        message: "Failed to autheticate user",
        success: false,
        code: status,
      });
    }

    //Set cookies
    const accessCookie = cookie.serialize("access_token", data.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: data.expires_in,
      path: "/",
    });

    const refreshCookie = cookie.serialize(
      "refresh_token",
      data.refresh_token,
      {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      }
    );

    res.setHeader("Set-Cookie", [accessCookie, refreshCookie]);

    res.status(200).send({
      message: "Access granted",
      success: true,
      code: status,
      data: {
        access: data.access_token,
        type: data.token_type,
        refresh: data.refresh_token,
        expires_in: data.expires_in,
      },
    });
  }
}
