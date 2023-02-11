export default async function handler(req, res) {
  if (req.method === "GET") {
    res.send({
      message: "I am working",
    });
  }
}
