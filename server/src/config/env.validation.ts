import * as j from "joi"

export default j.object({
  NODE_ENV: j
    .string()
    .valid("development", "test", "production", "staging")
    .default("development"),
  DB_PORT: j.number().port().required(),
  DB_PASSWORD: j.string().required(),
  DB_HOST: j.string().required(),
  DB_NAME: j.string().required(),
  DB_USER: j.string().required(),
  DB_SYNC: j.boolean().required(),
  DB_AUTOLOAD: j.boolean().required(),
})
