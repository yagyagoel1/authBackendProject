const zod = require("zod");
//zod input schema
const nameSchema = zod.string().min(2).max(50);
const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(8);

module.exports = {nameSchema,emailSchema,passwordSchema};