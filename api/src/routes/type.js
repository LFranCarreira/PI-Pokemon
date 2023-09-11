const { Router } = require("express");
const router = Router();
const { getAllTypes } = require("../handlers/getTypes")

router.get("/types",getAllTypes)
module.exports = router;