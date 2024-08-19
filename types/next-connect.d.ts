declare module 'next-connect' {
    import { NextApiRequest, NextApiResponse, NextMiddleware } from 'next';
    import { IncomingMessage, ServerResponse } from 'http';
  
    interface NextConnectOptions<Req, Res> {
      onError?: (err: any, req: Req, res: Res, next: NextMiddleware) => void;
      onNoMatch?: (req: Req, res: Res) => void;
    }
  
    interface NextConnect<Req, Res> {
      use(...middlewares: NextMiddleware[]): this;
      get(handler: (req: Req, res: Res) => any): this;
      post(handler: (req: Req, res: Res) => any): this;
      put(handler: (req: Req, res: Res) => any): this;
      delete(handler: (req: Req, res: Res) => any): this;
      patch(handler: (req: Req, res: Res) => any): this;
      options(handler: (req: Req, res: Res) => any): this;
      head(handler: (req: Req, res: Res) => any): this;
      handler(req: Req, res: Res): void;
    }
  
    function nextConnect<Req = NextApiRequest, Res = NextApiResponse>(
      options?: NextConnectOptions<Req, Res>
    ): NextConnect<Req, Res>;
  
    export default nextConnect;
  }
  