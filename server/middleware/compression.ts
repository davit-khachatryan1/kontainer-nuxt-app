import compression from 'compression';

export default defineEventHandler((event) => {
    if (event.node.req.url === '/sitemap.xml' || event.node.req.url === '/api/sitemap') {
        return;
    }
    const req = event.node.req as any;
    const res = event.node.res as any;
    const compressionMiddleware = compression();

    return new Promise((resolve: any, reject: any) => {
        compressionMiddleware(req, res, (err: any) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
});
