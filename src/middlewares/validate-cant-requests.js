import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
    windoMs: 15 * 60 *1000,
    mas: 100,
})

export default limiter