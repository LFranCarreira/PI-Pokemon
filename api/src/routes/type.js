const { Router } = require("express");
const router = Router();
const { getTypes } = require("./../controllers/getTypes")

router.get("/types",getTypes)
module.exports = router;