import nodemailer from "nodemailer";
import { verifyToken } from "../../lib/csrf";

export default async function order(req, res) {
  const {
    body: { csrf, email },
  } = req;

  if (!verifyToken(csrf)) {
    return res.status(400).json({ error: "CSRF token is missing" });
  }

  const transport = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const orderDetails = {
    email,
  };

  await transport.sendMail({
    from: "office@deluxspa.ru",
    to: "office@deluxspa.ru",
    subject: "Новый заказ на сайте darkside.space",
    text: JSON.stringify(orderDetails),
    html: `<pre>${JSON.stringify(orderDetails, null, 2)}</pre>`,
  });

  res.status(200).json({});
}
