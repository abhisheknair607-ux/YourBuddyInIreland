declare module "nodemailer" {
  export type SendMailOptions = {
    from?: string;
    to?: string;
    replyTo?: string;
    subject?: string;
    text?: string;
    html?: string;
    headers?: Record<string, string>;
  };

  export type Transporter = {
    sendMail(options: SendMailOptions): Promise<unknown>;
  };

  export function createTransport(options: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
    tls?: {
      rejectUnauthorized?: boolean;
    };
  }): Transporter;

  const nodemailer: {
    createTransport: typeof createTransport;
  };

  export default nodemailer;
}
