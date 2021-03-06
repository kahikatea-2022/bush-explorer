import request from 'superagent'

const baseUrl = '/api/v1'

export default function consume(
  endpoint,
  method = 'get',
  data = {},
  headers = { Accept: 'application/json' }
) {
  const payLoadMethod = method.toLowerCase() === 'get' ? 'query' : 'send'

  return request[method](baseUrl + endpoint)
    .set(headers)
    [payLoadMethod](data)
    .then((res) => res)
    .catch((err) => {
      const errMessage = err.response?.body?.error?.title
      throw new Error(errMessage || err.message)
    })
}
