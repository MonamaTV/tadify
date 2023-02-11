import {
  axiosAuthClient,
  axiosRefreshAccessTokenClient,
} from "../../src/utils/axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const code = req.body?.code;

    if (!code) {
      return res.status(401).send({
        message: "Failed to autheticate user",
        success: false,
        code: 401,
      });
    }

    const { data, status } = await getUserAccessData(code);

    if (status !== 200) {
      return res.status(status).send({
        message: "Failed to autheticate user",
        success: false,
        code: status,
      });
    }

    res.status(200).send({
      message: "Access granted",
      success: true,
      code: status,
      data: {
        access: data.access_token,
        type: data.token_type,
      },
    });
  }
}
